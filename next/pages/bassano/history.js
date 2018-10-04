import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import History from 'src/components/History'
import Query from 'src/components/QueryModal'
import { APS, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/bassano'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'

const initialState = {
  isFetching: true,
  comm: {
    isOnline: false
  },
  diag: {
    alarmCount: 0
  },
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

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '6' })
    const res = await fetch(`${BACKEND_URL}/aps/history/query?system=${APS_ID}`)
    const json = await res.json()
    return json
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      comm: {
        isOnline: false
      },
      diag: {
        alarmCount: 0
      },
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
  componentDidMount () {
    this.ws = new WebSocket(WEBSOCK_URL)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
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
  handleCancel = (state = initialState, e) => {
    this.setState(initialState)
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
    console.log('(confirm)', dateFrom.utc(), dateTo.utc())
    // dateFrom = moment(dateFrom).format('YYYY-MM-DD')
    // dateTo = moment(dateTo).format('YYYY-MM-DD')
    let uri = `${BACKEND_URL}/aps/history/query?system=${APS_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}&filter=${filter}`
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
    // this.setState({
    //   queryModal: {
    //     visible: false
    //   }
    // })
    // this.historyQuery({ itemsPerPage: ITEMS_PER_PAGE, currentPage: 1, dateFrom: dateFrom.toDate(), dateTo: dateTo.toDate(), filter: filter })
  }
  render () {
    const { count, dateFrom, dateTo, query, queryModal } = this.state
    return (
      <Layout
        aps={APS}
        pageTitle='Storico'
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <History
          count={count}
          dateFrom={dateFrom}
          dateTo={dateTo}
          query={query}
          queryModal={this.showModal}
          
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
