import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import History from 'src/components/History'
import Query from 'src/components/QueryModal'
import { APS, APS_TITLE, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/nyu'
import { ADMIN, SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps () {
    let dateFrom = moment().hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss')
    let dateTo = moment().hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss')
    const res = await fetch(`${BACKEND_URL}/aps/${APS}/history?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    const json = await res.json()
    return {
      activeItem: '6',
      pageRole: SERVICE,
      history: json
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      count: props.count,
      dateFrom: props.dateFrom,
      dateTo: props.dateTo,
      query: props.query,
      queryModal: {
        range: {
          value: []
        },
        filter: {
          value: 'a'
        },
        visible: false
      }
    }
  }
  showModal = () => {
    this.setState({
      queryModal: {
        range: {
          value: [moment().startOf('day'), moment().endOf('day')]
        },
        filter: {
          value: 'a'
        },
        visible: true
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      queryModal: {
        range: {
          value: []
        },
        filter: {
          value: 'a'
        },
        visible: false
      }
    })
    console.log('>>>>>', this.state)
  }
  handleChange = (fields) => {
    this.setState({
      queryModal: {
        ...this.state.queryModal, ...fields
      }
    })
  }
  handleConfirm = (dateFrom, dateTo, filter) => {
    dateFrom = moment(dateFrom).format('YYYY-MM-DD HH:mm:ss')
    dateTo = moment(dateTo).format('YYYY-MM-DD HH:mm:ss')
    let uri = `${BACKEND_URL}/aps/${APS}/history?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}&filter=${filter}`
    fetch(uri)
    .then(res => res.json())
    .then(res => {
      this.setState({
        count: res.count,
        dateFrom: res.dateFrom,
        dateTo: res.dateTo,
        query: res.query,
        queryModal: {
          range: {
            value: []
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      })
    })
  }
  render () {
    const { currentUser } = this.props
    const { count, dateFrom, dateTo, query, queryModal } = this.state
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='System Logs'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <History
          count={count}
          dateFrom={dateFrom}
          dateTo={dateTo}
          query={query}
          queryModal={this.showModal}
          diagnostic={currentUser.role <= ADMIN}
        />
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

export default withAuth(AppUi)

