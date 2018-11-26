import React from 'react'
import Layout from 'src/components/Layout'
import Device from 'src/components/Device'
import Queue from 'src/components/ExitQueue'
import Operation from 'src/components/OperationModal'
import { Row, Col } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } from 'src/constants/bassano'
import { VALET } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '1'})
    const res = await fetch(`${BACKEND_URL}/aps/bassano/overview`)
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
    this.ws = new WebSocket(WEBSOCK_URL)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      Object.keys(data).forEach((key) => {
        if (key === 'overview') {
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
  render () {
    const { devices, exitQueue } = this.state.overview
    return (
      <Layout
        aps={APS}
        pageTitle='Operazioni'
        sidebarMenu={SIDEBAR_MENU}
        socket={WEBSOCK_URL}
      >
        <Row gutter={16}>
          <Col  xs={24} sm={24} md={14} lg={18} xl={18}>
            <Row type='flex' justify='center' align='top' gutter={16}>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                <Device
                  device={devices[0]}
                  action={this.showOperationModal}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                <Device 
                  device={devices[1]}
                  action={this.showOperationModal}
                />
              </Col>
            </Row>
            <Row type='flex' justify='center' align='middle' gutter={16}>
              <Col xs={24} sm={24} md={24} lg={10} xl={8}>
                <Device
                  device={devices[2]}
                />
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
