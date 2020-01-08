import React from 'react'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from 'src/components/Layout'
import Device from 'src/components/Device'
import Queue from 'src/components/Queue'
import Operation from 'src/components/OperationModal'
import { confirm } from 'src/lib/modalConfirm'
import { auth } from 'src/lib/auth'

const withOverview = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const { diagnostic } = nextCookie(ctx)
      const url = diagnostic ? `${BACKEND_URL}/diagnostic?id=${diagnostic}` : `${BACKEND_URL}/overview`

      const token = auth(ctx)
      const res = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
        }
      })

      // const res = await fetch(url)
      const json = await res.json()
      const data = diagnostic ? json.overview : json
      return {
        ...props,
        diagnostic: diagnostic,
        overview: data
      }
    }

    state = {
      overview: this.props.overview,
      operationModal: {
        card: {
          min: 1,
          max: this.props.def.CARDS,
          value: 0
        },
        operationId: {
          value: 0
        },
        visible: false
      }
    }

    send = (event, data) => {
      this.ws.send(JSON.stringify({
        event: event,
        data: data
      }))
    }

    subscribe = () => {
      const { diagnostic } = this.props
      const { WEBSOCK_URL } = this.props.def
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (!diagnostic && key === 'overview') {
            this.setState({
              overview: data[key]
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
      const { devices, exitQueue } = this.state.overview
      const devices_ = devices.map(device =>
        <Device
          device={device}
          actions={[this.openModal, this.handleRollback]}
        />
      )
      const queue =
      <Queue
        exitQueue={exitQueue}
        showModal={this.openModal}
        handleDelete={this.handleDelete}
      />
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Operations'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <Page {...this.props} devices={devices_} exitQueue={queue} />
          <Operation
            data={this.state.operationModal}
            onCancel={this.closeModal}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          />
        </Layout>
      )
    }

    openModal = id => {
      this.setState({
        operationModal: {
          ...this.state.operationModal,
          operationId: {
            value: id
          },
          visible: true
        }
      })
    }

    closeModal = () => {
      this.setState({
        operationModal: {
          ...this.state.operationModal,
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
          ...this.state.operationModal,
          ...fields
        }
      })
    }

    handleConfirm = (card, id) => {
      this.setState({
        operationModal: {
          ...this.state.operationModal,
          operationId: {
            value: 0
          },
          visible: false
        }
      })
      let data = {
        operation: id,
        value: card
      }
      confirm('Operation request', `Confirm operation for card ${card} ?`, this.send, 'overview-operation', data)
    }

    handleDelete = (card, id) => {
      let data = {
        card: card,
        index: id
      }
      confirm('Delete exit queue', `Delete card ${card} ?`, this.send, 'queue-delete', data)
    }

    handleRollback = (system) => {
      let data = {
        id: system
      }
      confirm(`Elevator ${system} over-width detection at G0`, `Confirm vehicle reject ?`, this.send, 'overview-rollback', data)
    }
  }
}

export default withOverview