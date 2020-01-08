import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Edit from 'src/components/CardEdit'
import List from 'src/components/CardList'
import { confirm } from 'src/lib/modalConfirm'
import { auth } from 'src/lib/auth'

const withCards = Page => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      const props = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}
      const { BACKEND_URL } = props.def
      const url = `${BACKEND_URL}/cards`

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
        cards: json
      }
    }

    state = {
      cards: this.props.cards,
      editModal: {
        card: {
          value: 0
        },
        code: {
          value: ''
        },
        timeFrom: {
          value: moment('00:00:00', 'HH:mm:ss')
        },
        timeTo: {
          value: moment('23:59:59', 'HH:mm:ss')
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
          if (!diagnostic && key === 'cards') {
            this.setState({
              cards: data[key]
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
      const { cards, editModal } = this.state
      return (
        <Layout
          aps={APS_TITLE}
          pageTitle='Users'
          sidebarMenu={SIDEBAR_MENU}
          socket={`${WEBSOCK_URL}?channel=ch2`}
        >
          <List
            cards={cards}
            showModal={this.openModal}
          />
          <Edit
            cards={this.props.def.CARDS}
            data={editModal}
            onCancel={this.closeModal}
            onChange={this.handleChange}
            onConfirm={this.handleConfirm}
          />
          <style jsx global>{`
            .ant-table {
              background: #fff!important;
            }
            .ant-table-tbody>tr, .ant-table-tbody>tr>td, .ant-table-thead>tr {
              padding-bottom: 2px!important;
              padding-top: 2px!important;
            }
          `}</style>
        </Layout>
      )
    }

    openModal = (card, code, timeFrom, timeTo) => {
      this.setState({
        editModal: {
          card: {
            value: card
          },
          code: {
            value: code
          },
          timeFrom: {
            value: moment(timeFrom, 'HH:mm:ss')
          },
          timeTo: {
            value: moment(timeTo, 'HH:mm:ss')
          },
          visible: true
        }
      })
    }

    closeModal = () => {
      this.setState({
        editModal: {
          card: {
            value: 0
          },
          code: {
            value: ''
          },
          timeFrom: {
            value: moment('00:00:00', 'HH:mm:ss')
          },
          timeTo: {
            value: moment('23:59:59', 'HH:mm:ss')
          },
          visible: false
        }
      })
    }

    handleChange = (fields) => {
      this.setState({
        editModal: {
          ...this.state.editModal,
          ...fields
        }
      })
    }

    handleConfirm = (card, code, timeFrom, timeTo) => {
      this.setState({
        editModal: {
          card: {
            value: 0
          },
          code: {
            value: ''
          },
          timeFrom: {
            value: moment('00:00:00', 'HH:mm:ss')
          },
          timeTo: {
            value: moment('23:59:59', 'HH:mm:ss')
          },
          visible: false
        }
      })
      let data = {
        card: card,
        code: code,
        timeFrom: timeFrom,
        timeTo: timeTo
      }
      confirm('Edit card', `Confirm changes for card ${card} ?`, this.send, 'edit-card', data)
    }
  }
}

export default withCards