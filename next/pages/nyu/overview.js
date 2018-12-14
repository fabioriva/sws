import React from 'react'
import Layout from 'src/components/Layout'
import Device from 'src/components/Device'
import Queue from 'src/components/ExitQueue'
import Operation from 'src/components/OperationModal'
import { Row, Col } from 'antd'
import { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } from 'src/constants/nyu'
import { VALET } from 'src/constants/roles'
import parseCookies from 'src/lib/parseCookies'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps (ctx) {
    ctx.store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '1'})
    // check if diagnostic is active
    const { diagnostic } = parseCookies(ctx)
    ctx.store.dispatch({ type: 'UI_NAVBAR_SET_DIAG', status: diagnostic })
    if (diagnostic) {
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
      const json = await res.json()
      return {
        diagnostic: diagnostic,
        overview: json.overview
      }
    }
    // if diagnostic is not active fetch data
    const res = await fetch(`${BACKEND_URL}/aps/${APS}/overview`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
      overview: json  // json.data.overview
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      overview: props.overview,
      operationModal: {
        card: {
          min: 1,
          max: CARDS,
          value: 0
        },
        operationId: {
          value: 0
        },
        visible: false
      }
    }
  }
  componentDidMount () {
    const { diagnostic } = this.props
    this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
        if (!diagnostic && key === 'overview') {
          this.setState({
            isFetching: false,
            overview: data[key]
          })
        }
      })
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  showOperationModal = (operationId) => {
    console.log(operationId)
    this.setState({
      operationModal: {
        card: {
          value: 0
        },
        operationId: {
          value: operationId, // 0=Exit, 1=Entry 1, 2=Entry 2
        },
        visible: true
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      operationModal: {
        card: {
          value: 0
        },
        operationId: {
          value: 0
        },
        visible: false
      }
    })
  }
  handleChange = (fields) => {
    console.log('handleChange', fields)
    this.setState({
      operationModal: {
        ...this.state.operationModal, ...fields
      }
    })
  }
  handleConfirm = (card, operationId) => {
    console.log('handleConfirm', card, operationId)
    this.setState({
      operationModal: {
        card: {
          value: 0
        },
        operationId: {
          value: 0
        },
        visible: false
      }
    })
    this.ws.send(
      JSON.stringify({
        event: 'overview-operation',
        data: {
          operation: operationId,
          value: card
        }
      })
    )
  }
  handleRollback = (system) => {
    confirm(system, this.ws)
  }
  render () {
    const { devices, exitQueue } = this.state.overview
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='Operations'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <Row gutter={16}>
          <Col  xs={24} sm={24} md={14} lg={18} xl={18}>
            <Row type='flex' justify='center' align='top' gutter={16}>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                <Device device={devices[0]} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                <Device device={devices[1]} />
              </Col>
            </Row>
            <Row type='flex' justify='center' align='middle' gutter={16}>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
              </Col>
            </Row>
          </Col>
          <Col  xs={24} sm={24} md={10} lg={6} xl={6}>
            <Queue
              exitQueue={exitQueue}
              showModal={this.showOperationModal}
            />
          </Col>
        </Row>
        <Operation
          data={this.state.operationModal}
          onCancel={this.handleCancel}
          onChange={this.handleChange}
          onConfirm={this.handleConfirm}
        />
      </Layout>
    )
  }
}

export default withAuth(AppUi, VALET)
