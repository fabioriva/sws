import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import History from 'src/components/History'
import Query from 'src/components/QueryModal'
import { APS, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import { ADMIN, SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '6'})
    let dateFrom = moment().hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss')
    let dateTo = moment().hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss')
    // const res = await fetch(`${BACKEND_URL}/aps/history/query?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    const res = await fetch(`${BACKEND_URL}/aps/muse/history?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    const json = await res.json()
    return json
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
          value: [moment().add(-1, 'days'), moment()]
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
    // let uri = `${BACKEND_URL}/aps/history/query?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}&filter=${filter}`
    let uri = `${BACKEND_URL}/aps/muse/history?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}&filter=${filter}`
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
  enableDiag = async (alarm) => {
    this.props.navbarSetDiag(alarm._id)
    const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 // 1 day
    const options = { maxAge: COOKIE_MAX_AGE }
    document.cookie = cookie.serialize('diagnostic', alarm._id, options)
  }
  render () {
    const { count, dateFrom, dateTo, query, queryModal } = this.state
    const diag = {
      enabled: this.props.currentUser.role <= ADMIN,
      enableDiag: this.enableDiag
    }
    return (
      <Layout
        aps={APS}
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
          diagnostic={diag}
          
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

// export default compose(withAuth(withRedux(initStore, null)(AppUi)))
export default withAuth(AppUi, SERVICE)
