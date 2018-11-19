import React from 'react'
import Layout from 'src/components/Layout'
import ChangePassword from 'src/components/ChangePasswordForm'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'
import { VALET } from 'src/constants/roles'
import {
  APS,
  SIDEBAR_MENU,
  WEBSOCK_URL
} from 'src/constants/bassano'

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '7' })
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
  render () {
    return (
      <Layout
        aps={APS}
        pageTitle='Amministrazione utente'
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <ChangePassword />
      </Layout>
    )
  }
}

export default withAuth(AppUi, VALET)
