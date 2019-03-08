import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Operations from 'src/components/ChartOperations'
import Query from 'src/components/QueryModal'
import { APS, APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/trumpeldor'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'

class Statistics extends React.Component {
  static async getInitialProps (ctx) {
    // Last month
    const from = moment().subtract(1, 'months').startOf('month').hours(0).minutes(0).seconds(0) // transform to Date object for mongoose aggregate
    const to = moment().subtract(1, 'months').endOf('month').hours(23).minutes(59).seconds(59) // transform to Date object for mongoose aggregate
    // fetch data
    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
      : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
    const res = await fetch(apiUrl)
    const json = await res.json()
    return {
      activeItem: '7',
      pageRole: SERVICE,
      data: json
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      data: props.data,
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
  handleConfirm = async (from, to, filter) => {
    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
      : `${protocol}://${ctx.req.headers.host}/aps/${APS}/statistics?dateFrom=${from}&dateTo=${to}`
    const res = await fetch(apiUrl)
    const json = await res.json()
    this.setState({
      data: json,
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
  render () {
    // const { data } = this.props
    const { data, queryModal } = this.state
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='Statistics'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <Operations
          data={data}
          label='System Operations'
          showModal={this.showModal}
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

export default withAuth(Statistics)
