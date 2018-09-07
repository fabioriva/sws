import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from 'src/components/Layout'
import List from 'src/components/PlcList'
import Rack from 'src/components/PlcRack'
import { Mobile, Default } from 'src/constants/mediaQueries'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'
import styles from 'src/styles/muse/rack4'

class AppUi extends React.Component {
  static async getInitialProps () {
    const res = await fetch(`${BACKEND_URL}/aps/muse/racks`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
      racks: json
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      comm: { isOnline: false },
      diag: { alarmCount: 0 },
      racks: props.racks
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(`${WEBSOCK_URL}/ws/muse`)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      const eventName = Object.keys(data)[0]
      if (eventName === 'comm') {
        this.setState({ comm: data.comm })
      }
      if (eventName === 'diag') {
        this.setState({ diag: data.diag })
      }
      if (eventName === 'mesg') {
        openNotification(data.mesg)
      }
      if (eventName === 'racks') {
        this.setState({
          isFetching: false,
          racks: data.racks
        })
      }
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  render () {
    const rack = this.state.racks[3]
    return (
      <Layout
        aps={APS}
        pageTitle={`PLC Digital I/O - ${rack.title}`}
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <Mobile>
          <List rack={rack} />
        </Mobile>
        <Default>
          <Rack rack={rack} />
        </Default>
        <style jsx global>
          {styles}
        </style>
      </Layout>
    )
  }
}

export default withAuth(AppUi)
