import React from 'react'
import Layout from 'src/components/Layout'
import ChangePassword from 'src/components/ChangePasswordForm'
import { withAuthSync } from 'src/lib/auth'
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
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     isFetching: true,
  //     comm: {
  //       isOnline: false
  //     },
  //     diag: {
  //       alarmCount: 0
  //     }
  //   }
  // }
  // componentDidMount () {
  //   this.ws = new WebSocket(WEBSOCK_URL)
  //   this.ws.onerror = e => console.log(e)
  // }
  // componentWillUnmount () {
  //   this.ws.close()
  // }
  render () {
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='Amministrazione utente'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <ChangePassword />
      </Layout>
    )
  }
}

export default withAuthSync(AppUi, VALET)
