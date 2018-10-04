import React from 'react'
import classnames from 'classnames'
// import moment from 'moment'
import { Button, Popover, Table } from 'antd'

const { Column } = Table
const ITEMS_PER_PAGE = 25

export default class History extends React.Component {
  rowClassname = (row) => {
    return classnames({
      'col-danger' : row.operation.id === 1,
      'col-success': row.operation.id === 2,
      'col-warning': row.operation.id === 3,
      'col-info'   : row.operation.id === 4
    })
  }
  render () {
    const { count, dateFrom, dateTo, query, queryModal } = this.props
    return (
      <div>
        <div className='history-intro'>
          {/* <div>History from <strong>{moment(dateFrom).format('YYYY-MM-DD HH:mm:ss')}</strong> to <strong>{moment(dateTo).format('YYYY-MM-DD HH:mm:ss')}</strong>. Total items <strong>{count}</strong>.</div> */}
          <div>History from <strong>{dateFrom}</strong> to <strong>{dateTo}</strong>. Total items <strong>{count}</strong>.</div>
          <Button
            type='primary'
            icon='search'
            onClick={() => queryModal()}
          >
            Query
          </Button>
        </div>
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
            dataIndex='logged'
            key='logged'
            // render={(text) => (moment.utc(text).format('YYYY-MM-DD HH:mm:ss'))}
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
      </div>
    )
  }
}
