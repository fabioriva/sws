import React from 'react'
import fetch from 'isomorphic-unfetch'
import { Alert, Badge, Button, Tabs } from 'antd'
import Layout from 'src/components/Layout'

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

export default (def, role) => {
  const { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } = def
  return class extends React.Component {
    static async getInitialProps () {
      const props = {
        activeItem: '5',
        pageRole: role
      }
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/alarms`)
      const json = await res.json()
      return {
        ...props,
        alarms: json  //.alarms
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
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
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
    handleData = (data) => {
      this.setState({
        isFetching: false,
        alarms: data.alarms
      })
    }
    renderList = (alarms) => {
      return alarms.map((a, i) => <Alarm a={a} key={i} />)
    }
    render () {
      const { alarms } = this.state
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='System Alarms'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <Tabs type='card'>
            {
              alarms.groups.map((g, key) => (
                <Tabs.TabPane
                  tab={<Badge count={g.count}><span style={{ padding: 12 }}>{g.title}</span></Badge>}
                  key={key}
                >
                  {g.active.length > 0 ? this.renderList(g.active) : <Ready label={g.title} />}
                </Tabs.TabPane>
              ))
            }
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
}
