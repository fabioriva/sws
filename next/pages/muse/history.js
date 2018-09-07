import React from 'react'
import classnames from 'classnames'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'
import Layout from 'src/components/Layout'
import Query from 'src/components/QueryModal'
import { Button, Popover, Table } from 'antd'
import { APS, APS_ID, BACKEND_URL, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import openNotification from 'src/lib/openNotification'
import withAuth from 'src/lib/withAuth'

const { Column, ColumnGroup } = Table
const ITEMS_PER_PAGE = 22

const initialState = {
  isFetching: true,
  comm: {
    isOnline: false
  },
  diag: {
    alarmCount: 0
  },
  queryModal: {
    range: {
      value: []
    },
    filter: {
      value: 'a'
    },
    visible: false
  }
}

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({type: 'UI_SIDEBAR_SET_MENU', item: '6'})
    const res = await fetch(`${BACKEND_URL}/aps/history/query?system=${APS_ID}`)
    const json = await res.json()
    return json
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
      count: props.count,
      dateFrom: props.dateFrom,
      dateTo: props.dateTo,
      query: props.query,
      queryModal: {
        range: {
          value: []
        },
        filter: {
          value: 'a'
        },
        visible: false
      }
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(`${WEBSOCK_URL}/ws/muse`)
    this.ws.onerror = e => console.log(e)
    this.ws.onmessage = e => {
      const data = JSON.parse(e.data)
      const eventName = Object.keys(data)[0]
      if (eventName === 'comm') {
        this.setState({ comm: data.comm })
      }
      if (eventName === 'diag') {
        this.setState({ diag: data.diag })
      }
      if (eventName === 'mesg') {
        const { mesg } = data
        openNotification(mesg)
      }
    }
  }
  componentWillUnmount () {
    this.ws.close()
  }
  rowClassname = (row) => {
    return classnames({
      'col-danger' : row.operation.id === 1,
      'col-success': row.operation.id === 2,
      'col-warning': row.operation.id === 3,
      'col-info'   : row.operation.id === 4
    })
  }
  showModal = () => {
    this.setState({
      queryModal: {
        range: {
          value: [moment().add(-1, 'days'), moment()]
        },
        filter: {
          value: 'a'
        },
        visible: true
      }
    })
  }
  handleCancel = (state = initialState, e) => {
    this.setState(initialState)
    console.log('>>>>>', this.state)
  }
  handleChange = (fields) => {
    this.setState({
      queryModal: {
        ...this.state.queryModal, ...fields
      }
    })
  }
  handleConfirm = (dateFrom, dateTo, filter) => {
    // console.log(typeof dateFrom, dateFrom, typeof dateTo, dateTo)
    // dateFrom = moment(dateFrom).format('YYYY-MM-DD')
    // dateTo = moment(dateTo).format('YYYY-MM-DD')
    let uri = `${BACKEND_URL}/aps/history/query?system=${APS_ID}&dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}&filter=${filter}`
    fetch(uri)
    .then(res => res.json())
    .then(res => {
      this.setState({
        count: res.count,
        dateFrom: res.dateFrom,
        dateTo: res.dateTo,
        query: res.query,
        queryModal: {
          range: {
            value: []
          },
          filter: {
            value: 'a'
          },
          visible: false
        }
      })
    })
    // this.setState({
    //   queryModal: {
    //     visible: false
    //   }
    // })
    // this.historyQuery({ itemsPerPage: ITEMS_PER_PAGE, currentPage: 1, dateFrom: dateFrom.toDate(), dateTo: dateTo.toDate(), filter: filter })
  }
  render () {
    const { count, dateFrom, dateTo, query, queryModal } = this.state
    return (
      <Layout
        aps={APS}
        pageTitle='Operations History'
        sidebarMenu={SIDEBAR_MENU}
        comm={this.state.comm}
        diag={this.state.diag}
      >
        <div className='history-intro'>
          <div>History from <strong>{dateFrom}</strong> to <strong>{dateTo}</strong>. Total items <strong>{count}</strong>.</div>
          <div>
          <Button
            type='primary'
            icon='search'
            onClick={() => this.showModal()}
          >
            Query
          </Button>
          </div>
        </div>
        <Query
          data={queryModal}
          onCancel={this.handleCancel}
          onChange={this.handleChange}
          onConfirm={this.handleConfirm}
        />
        <Table
          dataSource={query}
          bordered={false}
          size='small'
          pagination={{ defaultPageSize: ITEMS_PER_PAGE, pageSize: ITEMS_PER_PAGE }}
          rowKey='_id'
          rowClassName={(record, index) => this.rowClassname(record)}
        >
          <Column
            title='Date'
            dataIndex='date'
            key='date'
            render={(text) => (moment.utc(text).format('YYYY-MM-DD HH:mm:ss'))}
          />
          <Column
            title='Device'
            dataIndex='device.name'
            key='device'
          />
          <Column
            title='Mode'
            dataIndex='mode.info'
            key='mode'
          />
          <Column
            title='Operation'
            dataIndex='operation.info'
            key='operation'
            render={(text, record, index) => (
              record.alarm.id !== 0
              ?
              <Popover content={`${record.alarm.info}`} title={`Alarm ID ${record.alarm.id}`} trigger='hover'><span>{text} ID {record.alarm.id}</span></Popover>
              :
              text
            )}
          />
          <Column
            title='Card'
            dataIndex='card'
            key='card'
            className='col-text-align-center'
            render={(text, record) => (text === 999 ? <span>Locked</span> : text)}
          />
          <Column
            title='Stall'
            dataIndex='stall'
            key='stall'
            className='col-text-align-center'
          />
          <Column
            title='Size'
            dataIndex='size'
            key='size'
            className='col-text-align-center'
          />
        </Table>
        <style jsx global>{`
          .ant-table {
            background: #fff!important;
          }
          .ant-table-tbody>tr, .ant-table-tbody>tr>td, .ant-table-thead>tr {
            padding-bottom: 2px!important;
            padding-top: 2px!important;
          }
          .col-hidden {
            display: none
          }
          .col-success {
            background: #dff0d8;
            color: #3c763d;
          }
          .col-info {
            background: #d9edf7;
            // color: #31708f;
          }
          .col-warning {
            background: #fcf8e3;
            // color: #8a6d3b;
          }
          .col-danger {
            background: #f2dede;
            // color: #a94442;
          }
          .col-text-align-center {
            // text-align: center;
          }
          .history-intro {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
          }
        `}</style>
      </Layout>
    )
  }
}

// export default compose(withAuth(withRedux(initStore, null)(AppUi)))
export default withAuth(AppUi)
