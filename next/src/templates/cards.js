import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Edit from 'src/components/CardEdit'
import List from 'src/components/CardList'

export default (def, role) => {
  const { APS, APS_TITLE, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } = def
  return class extends React.Component {
    static async getInitialProps () {
      const props = {
        activeItem: '3',
        pageRole: role
      }
      const res = await fetch(`${BACKEND_URL}/aps/${APS}/cards`)
      const json = await res.json()
      return {
        ...props,
        cards: json // .cards
      }
    }
    constructor (props) {
      super(props)
      this.state = {
        isFetching: true,
        cards: props.cards,
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
    }
    componentDidMount () {
      this.ws = new WebSocket(`${WEBSOCK_URL}?channel=ch1`)
      this.ws.onerror = e => console.log(e)
      this.ws.onmessage = e => {
        const data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
          if (key === 'cards') {
            this.setState({
              isFetching: false,
              cards: data[key]
            })
          }
        })
      }
    }
    componentWillUnmount () {
      this.ws.close()
    }
    showModal = (card, code, timeFrom, timeTo) => {
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
    handleCancel = (e) => {
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
          ...this.state.editModal, ...fields
        }
      })
    }
    handleConfirm = (card, code, timeFrom, timeTo) => {
      console.log(card, code, timeFrom, timeTo)
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
    render () {
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
            showModal={this.showModal}
          />
          <Edit
            cards={CARDS}
            data={editModal}
            onCancel={this.handleCancel}
            onChange={this.handleChange}
            onOk={this.handleConfirm}
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
  }  
}
