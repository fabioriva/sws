import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import nextCookie from 'next-cookies'
import { Row, Col, List, Card, DatePicker } from 'antd'
import Layout from 'src/components/Layout'
// import Alarms from 'src/components/charts/Alarms'
import Operations from 'src/components/charts/Operations'
// import Query from 'src/components/ModalStatistics'

export default (def, role) => {
  const { APS, APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = def
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return class extends React.Component {
    static async getInitialProps (ctx) {
      // Last month
      // Note inside getInitialProps convert moment to string with format to mach server date with client date
      // const from = moment().subtract(7, 'months').startOf('month').hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm')
      // const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm')
      // console.log(typeof from, from, typeof to, to)
      // fetch data
      // const apiUrl = process.browser
      //   ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
      //   : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`

      const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
      const apiUrl = process.browser
        ? `${protocol}://${window.location.host}/aps/${APS}/statistics?date=${yesterday}`
        : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?date=${yesterday}`

      // Get token
      const { token } = nextCookie(ctx)
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.stringify({ token }) // 'Authorization': token
        }
      })
      const json = await res.json()
      return {
        activeItem: '7',
        pageRole: role,
        statistics: {
          data: json,
          dateFrom: yesterday, //moment().subtract(1, 'days'), //from,
          dateTo: yesterday //to
        }
      }
    }
    constructor (props) {
      super(props)
      this.state = {
        statistics: props.statistics,
        queryModal: {
          range: {
            value: [moment(props.statistics.dateFrom), moment(props.statistics.dateTo)]
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      }
    }
    // async componentDidMount () {
    //   // Last month
    //   const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0)
    //   const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59)
    //   // GET request
    //   const apiUrl = process.browser
    //     ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
    //     : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
      
    //   // POST request
    //   // const apiUrl = process.browser
    //   //   ? `${protocol}://${window.location.host}/aps/${APS}/statistics`
    //   //   : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics`
    //   // const query = {
    //   //   dateFrom: from,
    //   //   dateTo: to
    //   // }
    //   const { token } = nextCookie()
  
    //   const res = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': JSON.stringify({ token }) // 'Authorization': token
    //     },
    //     body: JSON.stringify({ query })
    //   })
    //   const json = await res.json()
    //   this.setState({
    //     data: json,
    //     queryModal: {
    //       range: {
    //         value: [from, to]
    //       },
    //       filter: {
    //         value: 'a'
    //       },
    //       visible: false
    //     }
    //   })
    // }
    handleCancel = (e) => {
      this.setState({ queryModal: { ...this.state.queryModal, visible: false }})
    }
    handleChange = (fields) => {
      this.setState({ queryModal: { ...this.state.queryModal, ...fields }})
    }
    handleConfirm = async (from, to, filter) => {
      const apiUrl = process.browser
        ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
        : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
      const res = await fetch(apiUrl)
      const json = await res.json()
      this.setState({
        statistics: {
          data: json,
          dateFrom: from,
          dateTo: to
        },
        queryModal: {
          range: {
            value: [from, to]
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      })
    }
    showModal = () => this.setState({ queryModal: { ...this.state.queryModal, visible: true }})
    onChange = async (date, dateString) => {
      const apiUrl = process.browser
        ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${dateString}&dateTo=${dateString}`
        : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${dateString}&dateTo=${dateString}`
      const res = await fetch(apiUrl)
      const json = await res.json()
      this.setState({
        statistics: {
          data: json,
          dateFrom: dateString,
          dateTo: dateString
        },
        // queryModal: {
        //   range: {
        //     value: [from, to]
        //   },
        //   filter: {
        //     value: 'a'
        //   },
        //   visible: false
        // }
      })
    }
    render () {
      const { statistics, queryModal } = this.state
      const { data, dateFrom, dateTo } = statistics
      console.log(typeof dateFrom, dateFrom)
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Statistics'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          {/* <DatePicker defaultValue={moment(dateFrom)} onChange={this.onChange} /> */}
          {/* <p>Period from <strong>{moment(dateFrom).format('YYYY-MM-DD HH:mm')}</strong> to <strong>{moment(dateTo).format('YYYY-MM-DD HH:mm')}</strong></p> */}
          {
            data !== undefined &&
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 2,
                xxl: 2,
              }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card
                    title={item.title}
                    extra={<DatePicker defaultValue={moment(dateFrom)} onChange={this.onChange} />}
                    style={{ width: '100%', height: 400 }}
                  >
                    <Operations
                      data={item.data}
                      label={item.label}
                      showModal={this.showModal}
                    />
                  </Card>
                </List.Item>
              )}
            />
          }
          {/* <Query
            data={queryModal}
            onCancel={this.handleCancel}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          /> */}
        </Layout>
      )
    }
  }
}