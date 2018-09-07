import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from 'src/components/Layout'
import { Alert, Badge, Button, Tabs } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
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
    const res = await fetch(`${BACKEND_URL}/aps/muse/alarms`)
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
        const { mesg } = data
        openNotification(mesg)
      }
      if (eventName === 'alarms') {
        // console.log(e, e.data)
        this.handleData(data)
      }
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
    const tabEL1 = <Badge count={this.state.alarms.groups[0].count}><span style={{ padding: 12 }}>Elevator 1</span></Badge>
    const alarmsEL1 = this.state.alarms.groups[0].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabEL2 = <Badge count={alarms.groups[1].count}><span style={{ padding: 12 }}>Elevator 2</span></Badge>
    const alarmsEL2 = alarms.groups[1].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabEL3 = <Badge count={alarms.groups[2].count}><span style={{ padding: 12 }}>Elevator 3</span></Badge>
    const alarmsEL3 = alarms.groups[2].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabEL4 = <Badge count={alarms.groups[3].count}><span style={{ padding: 12 }}>Elevator 4</span></Badge>
    const alarmsEL4 = alarms.groups[3].active.map((a, i) => {
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
          <Tabs.TabPane tab={tabEL1} key='1'>{alarmsEL1.length > 0 ? alarmsEL1 : <Ready label='Elevator 1' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabEL2} key='2'>{alarmsEL2.length > 0 ? alarmsEL2 : <Ready label='Elevator 2' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabEL3} key='3'>{alarmsEL3.length > 0 ? alarmsEL3 : <Ready label='Elevator 3' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabEL4} key='4'>{alarmsEL4.length > 0 ? alarmsEL4 : <Ready label='Elevator 4' />}</Tabs.TabPane>
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
