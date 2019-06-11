import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import nextCookie from 'next-cookies'
import { Row, Col } from 'antd'
import Layout from 'src/components/Layout'
import Alarms from 'src/components/charts/Alarms'
import Operations from 'src/components/charts/Operations'
import Query from 'src/components/ModalStatistics'

export default (def, role) => {
  const { APS, APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = def
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return class extends React.Component {
    static async getInitialProps (ctx) {
      // Last month
      // Note inside getInitialProps convert moment to string with format to mach server date with client date
      const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm')
      const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm')
      //console.log(typeof from, from, typeof to, to)
      // fetch data
      const apiUrl = process.browser
        ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
        : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
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
          dateFrom: from,
          dateTo: to
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
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': JSON.stringify({ token }) // 'Authorization': token
    //     },
    //     // body: JSON.stringify({ query })
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
    render () {
      const { statistics, queryModal } = this.state
      const { data, dateFrom, dateTo } = statistics
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Statistics'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <p>Period from <strong>{moment(dateFrom).format('YYYY-MM-DD HH:mm')}</strong> to <strong>{moment(dateTo).format('YYYY-MM-DD HH:mm')}</strong></p>
          {
            data !== undefined && 
            <Row gutter={64}>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Operations
                  data={data[1]}
                  label='System Operations'
                  showModal={this.showModal}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Alarms
                  data={data[0]}
                  label='System Alarms'
                  showModal={this.showModal}
                />
              </Col>
            </Row>
          }
          <Query
            data={queryModal}
            onCancel={this.handleCancel}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          />
        </Layout>
      )
    }
  }
}