import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import { Row, Col, Alert, Badge, Button, Tabs } from 'antd'
import Layout from 'src/components/Layout'
import Alarms from 'src/components/charts/Alarms'
import { auth } from 'src/lib/auth'

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

const withAlarms = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
      const url = `${BACKEND_URL}/alarms?dateString=${yesterday}`

      const token = auth(ctx)
      const res = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
        }
      })

      // const res = await fetch(url)
      const json = await res.json()
      return {
        ...props,
        alarms: json.diag,
        statistics: json.stat
      }
    }

    state = {
      alarms: this.props.alarms
    }

    subscribe = () => {
      const { diagnostic } = this.props
      const { WEBSOCK_URL } = this.props.def
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'alarms') {
            this.setState({
              alarms: data[key]
            })
          }
        })
      }
    }

    componentDidMount () {
      this.subscribe()
    }

    componentWillUnmount () {
      this.ws.close()
    }

    render () {
      const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = this.props.def
      const { alarms } = this.state
      console.log(this.props.statistics)
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
                  <Row gutter={32}>
                    <Col span={14}>
                      {g.active.length > 0 ? this.renderList(g.active) : <Ready label={g.title} />}
                    </Col>
                    <Col span={10}>
                      <Alarms data={this.props.statistics[key]} />
                    </Col>
                  </Row>
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

    renderList = (alarms) => {
      return alarms.map((a, i) => <Alarm a={a} key={i} />)
    }
  }
}

export default withAlarms