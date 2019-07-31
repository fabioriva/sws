import React from 'react'
import fetch from 'isomorphic-unfetch'
import intl from 'react-intl-universal'
import nextCookie from 'next-cookies'
import { Modal } from 'antd'
import Layout from 'src/components/Layout'
import Device from 'src/components/Device'
import Queue from 'src/components/ExitQueue'
import Operation from 'src/components/OperationModal'

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

function deleteModal (card, index, ws) {
  Modal.confirm({
    title: `${intl.get('DELETE_ITEM')}`,
    content: `${intl.get('DELETE_INFO', {card: card})}`,
    onOk () {
      ws.send(
        JSON.stringify({
          event: 'queue-delete',
          data: {
            card: card,
            index: index
          }
        })
      )
    },
    onCancel () {}
  })
}

export default function (def, role, MainView) {
  const { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } = def
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = {
        activeItem: '1',
        pageRole: role
      }
      // check if diagnostic is active
      const { diagnostic } = nextCookie(ctx)
      if (diagnostic) {
        const res = await fetch(`${BACKEND_URL}/aps/${APS}/diagnostic?id=${diagnostic}`)
        if (res.ok) {
          const json = await res.json()
          return {
            ...props,
            diagnostic: diagnostic,
            overview: json.overview
          }
        }
      }
      // if diagnostic is not active fetch data
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/overview`)
      const json = await res.json()
      return {
        ...props,
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
      console.log('action 1', operationId)
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
    handleDelete = (card, index) => {
      console.log('action queue-delete', card, index)
      deleteModal(card, index, this.ws)
    }
    handleRollback = (system) => {
      console.log('action 2', system)
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
          <MainView
            devices={devices.map(device => <Device device={device} actions={[this.showOperationModal, this.handleRollback]} />)}
            exitQueue={<Queue exitQueue={exitQueue} handleDelete={this.handleDelete} showModal={this.showOperationModal} />}
          />
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
}