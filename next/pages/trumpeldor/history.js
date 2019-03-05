import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { navbarSetDiag } from 'src/store'
// import cookie from 'cookie'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import History from 'src/components/History'
import Query from 'src/components/QueryModal'
import { APS, APS_TITLE, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/trumpeldor'
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
    const { history } = props
    this.state = {
      isFetching: true,
      count: history.count,
      dateFrom: history.dateFrom,
      dateTo: history.dateTo,
      query: history.query,
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
  // enableDiag = async (alarm) => {
  //   this.props.navbarSetDiag(alarm._id)
  //   const COOKIE_MAX_AGE = 1 * 24 * 60 * 60 // 1 day
  //   const options = { maxAge: COOKIE_MAX_AGE }
  //   document.cookie = cookie.serialize('diagnostic', alarm._id, options)
  // }
  render () {
    const { currentUser } = this.props
    const { count, dateFrom, dateTo, query, queryModal } = this.state
    // const diag = {
    //   enabled: currentUser.role <= ADMIN, // this.props.navbar.user.role <= ADMIN,
    //   enableDiag: this.enableDiag
    // }
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

// const  mapStateToProps = (state) => {
//   const { navbar } = state
//   return { navbar }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     navbarSetDiag: bindActionCreators(navbarSetDiag, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withAuth(AppUi, SERVICE))

export default withAuth(AppUi)

