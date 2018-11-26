import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from 'src/components/Layout'
import { Alert, Badge, Button, Tabs } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
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
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '5' })
    const res = await fetch(`${BACKEND_URL}/aps/bassano/alarms`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
      alarms: json
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      alarms: props.alarms
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(WEBSOCK_URL)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
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
  render () {
    const { alarms } = this.state
    const tabA = <Badge count={alarms.groups[0].count}><span style={{ padding: 12 }}>Elevatore A</span></Badge>
    const alarmsA = alarms.groups[0].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabB = <Badge count={alarms.groups[1].count}><span style={{ padding: 12 }}>Elevatore B</span></Badge>
    const alarmsB = alarms.groups[1].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    const tabT = <Badge count={alarms.groups[2].count}><span style={{ padding: 12 }}>Torre</span></Badge>
    const alarmsT = alarms.groups[2].active.map((a, i) => {
      return <Alarm a={a} key={i} />
    })
    return (
      <Layout
        aps={APS}
        pageTitle='Allarmi del sistema'
        sidebarMenu={SIDEBAR_MENU}
        socket={WEBSOCK_URL}
      >
        <Tabs type='card'>
          <Tabs.TabPane tab={tabA} key='1'>{alarmsA.length > 0 ? alarmsA : <Ready label='Elevatore A' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabB} key='2'>{alarmsB.length > 0 ? alarmsB : <Ready label='Elevatore B' />}</Tabs.TabPane>
          <Tabs.TabPane tab={tabT} key='3'>{alarmsT.length > 0 ? alarmsT : <Ready label='Torre' />}</Tabs.TabPane>
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

export default withAuth(AppUi, SERVICE)
