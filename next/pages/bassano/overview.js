import React from 'react'
import Layout from 'src/components/Layout'
import Device from 'src/components/Device'
import Queue from 'src/components/ExitQueue'
import Operation from 'src/components/OperationModal'
import { Row, Col, Modal } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/bassano'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'

function confirm (system, ws) {
  Modal.confirm({
    title: `Elevator ${system} over-width detection at G0`,
    content: 'Confirm to reject the vehicle to exit ?',
    onOk() {
      ws.send(
        JSON.stringify({
          event: 'overview-rollback',
          data: {
            id: system
          }
        })
      )
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      })
    },
    onCancel() {},
  })
}

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
      comm: {
        isOnline: false
      },
      diag: {
        alarmCount: 0
      },
      overview: props.overview,
      operationModal: {
        card: {
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
        if (key === 'comm') this.setState({ comm: data[key] })
        if (key === 'diag') this.setState({ diag: data[key] })
        if (key === 'mesg') openNotification(data[key])
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
    console.log(operationId)
    this.setState({
      // operationModal: {
      //   card: 0,
      //   operationId: operationId, // 0=Exit, 1=Entry 1, 2=Entry 2
      //   visible: true
      // }
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
      // operationModal: {
      //   card: 0,
      //   operationId: 0,
      //   visible: false
      // }
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
      // operationModal: {
      //   card: 0,
      //   operationId: 0,
      //   visible: false
      // }
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
        aps={APS}
        pageTitle='Operazioni'
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
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
                <Device
                  device={devices[2]}
                  action={this.handleRollback}
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

export default withAuth(AppUi)
