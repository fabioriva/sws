import React from 'react'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Edit from 'src/components/CardEdit'
import { Table } from 'antd'
import { APS, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL, CARDS } from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const columns = [
  {
    title: 'Number',
    dataIndex: 'nr',
    key: 'nr'
  }, {
    title: 'PIN Code',
    dataIndex: 'code',
    key: 'code'
  }, {
    title: 'Valid From',
    dataIndex: 'from',
    key: 'from'
  }, {
    title: 'Valid To',
    dataIndex: 'to',
    key: 'to'
  }
]

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '3'})
    const res = await fetch(`${BACKEND_URL}/aps/muse/cards`)
    const statusCode = res.statusCode > 200 ? res.statusCode : false
    const json = await res.json()
    return {
      statusCode,
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
    this.ws = new WebSocket(WEBSOCK_URL)
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
  handleData = (data) => {
    this.setState({
      isFetching: false,
      cards: data.cards
    })
  }
  showModal = (card, code, timeFrom, timeTo) => {
    console.log(typeof timeFrom, timeFrom, typeof timeTo, timeTo)
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
    // console.log(fields)
    // this.setState({
    //   editModal: {
    //     card: {
    //       value: card
    //     },
    //     code: {
    //       value: code
    //     },
    //     timeFrom: {
    //       value: timeFrom
    //     },
    //     timeTo: {
    //       value: timeTo
    //     },
    //     visible: true
    //   }
    // })
    this.setState({
      editModal: {
        ...this.state.editModal, ...fields
      }
    })
    console.log(this.state.editModal)
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
    // console.log('cards:', this.state.cards)
    // console.log('edit:', this.state.editModal)
    const { cards, editModal } = this.state
    return (
      <Layout
        aps={APS}
        pageTitle='Users'
        sidebarMenu={SIDEBAR_MENU}
        socket={WEBSOCK_URL}
      >
        <span />
        <Table
          dataSource={cards}
          columns={columns}
          bordered
          size='small'
          pagination={{ defaultPageSize: 20 }}
          rowKey='nr'
          onRow={(record) => {
            return {
                onClick: () => this.showModal(record.nr, record.code, record.from, record.to)
              }
            }
          }
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

export default withAuth(AppUi, SERVICE)
