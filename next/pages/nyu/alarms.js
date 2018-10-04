import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from 'src/components/Layout'
import { Alert, Badge, Button, Tabs } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/nyu'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'

const Alarm = (props) => {
  const { a } = props
  const clearBtn = a.cancel !== 0 && <Button type='danger' ghost className='alarm-clear-btn' icon='delete' onClick={this.alarmClear}>Clear</Button>
  return (
    <Alert
      className='alarm-alert'
      type='error'
      message={<span>{a.class}&nbsp;{a.label}</span>}
      description={<span>{a.date}&nbsp;{a.info}{clearBtn}</span>}
      showIcon
    />
  )
}

const Ready = (props) => {
  return (
    <Alert
      type='success'
      message={props.label}
      description='System Ready'
      showIcon
    />
  )
}

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '5'})
    const res = await fetch(`${BACKEND_URL}/aps/nyu/alarms`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
      alarms: json  //.alarms
    }
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
      alarms: props.alarms
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
        if (key === 'alarms') {
          this.setState({
            isFetching: false,
            alarms: data[key]
          })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  handleData = (data) => {
    this.setState({
      isFetching: false,
      alarms: data.alarms
    })
  }
  render () {
    const { alarms } = this.state
    const tabEL1 = <Badge count={alarms.groups[0].count}><span style={{ padding: 12 }}>System 1</span></Badge>
    const alarmsEL1 = alarms.groups[0].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabEL2 = <Badge count={alarms.groups[1].count}><span style={{ padding: 12 }}>System 2</span></Badge>
    const alarmsEL2 = alarms.groups[1].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    return (
      <Layout
        aps={APS}
        pageTitle='System Alarms'
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <Tabs type='card'>
          <Tabs.TabPane tab={tabEL1} key='1'>{alarmsEL1.length > 0 ? alarmsEL1 : <Ready label='System 1' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabEL2} key='2'>{alarmsEL2.length > 0 ? alarmsEL2 : <Ready label='System 2' />}</Tabs.TabPane>
        </Tabs>
        <style jsx global>{`
          .alarm-alert {
            margin-bottom: 8px;
          }
        `}</style>
      </Layout>
    )
  }
}

// export default compose(withAuth(withRedux(initStore, null)(AppUi)))
export default withAuth(AppUi)
