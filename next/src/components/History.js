import React from 'react'
import classnames from 'classnames'
import cookie from 'js-cookie'
// import moment from 'moment'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { navbarSetDiag } from 'src/store'
import { LocaleProvider, Button, Modal, Popover, Table } from 'antd'
import en_US from 'antd/lib/locale-provider/en_US'
import it_IT from 'antd/lib/locale-provider/it_IT'
import intl from 'react-intl-universal'

const { Column } = Table
const ITEMS_PER_PAGE = 25

// const setDiagnostic = (record, props) => {
//   console.log(record, props)
//   const { dispatch } = props
//   dispatch(navbarSetDiag(record._id))
//   cookie.set('diagnostic', record._id, { expires: 1 })
// }

const AlarmModal = props => {
  const { data } = props
  return (
    <Modal
      title={data !== undefined && data.device.name}
      visible={props.visible}
      footer={[
        <Button onClick={props.onCancel}>Cancel</Button>,
        <Button type='danger' onClick={() => props.onOk(data !== undefined && data._id)} disabled={props.disabled}>
          {intl.get('HISTORY_DIAG')}
        </Button>,
      ]}
    >
    {
      data !== undefined &&
      <span>
        <p>Date: <strong>{data.logged}</strong></p>
        <p>Info: Id <strong>{data.alarm.id}</strong> {data.alarm.info}</p>
        <p>Diagnostic Id: <strong>{data._id}</strong></p>
      </span>
    }
    </Modal>
  )
}

class History extends React.Component {
  state = {
    visible: false
  }
  getCurrentLocale = () => {
    const { currentLocale } = intl.getInitOptions()
    switch (currentLocale) {
      case 'it-IT':
        return it_IT
      default:
        return en_US
    }
  }
  rowClassname = (row) => {
    return classnames({
      'col-danger' : row.operation.id === 1,
      'col-success': row.operation.id === 2,
      'col-warning': row.operation.id === 3,
      'col-info'   : row.operation.id === 4
    })
  }
  // popoverDiag = (record) => {
  //   return (
  //     <span>
  //       <p>{record.alarm.info}</p>
  //       <Button
  //         type='danger'
  //         onClick={() => cookie.set('diagnostic', record._id, { expires: 1 })} // setDiagnostic(record, this.props)} // this.enableDiag(record)}
  //         disabled={!this.props.diagnostic || cookie.get('diagnostic') !== undefined} // {!this.props.diagnostic.enabled}
  //       >
  //         Activate Diagnostic
  //       </Button>
  //     </span>
  //   )
  // }
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  handleOk = (id) => {
    this.setState({
      visible: false
    })
    cookie.set('diagnostic', id, { expires: 1 })
  }
  showModal = (record) => {
    this.setState({
      diagnostic: record,
      visible: true
    })
  }
  // enableDiag = (record) => {
  //   this.setState({ visible: false })
  //   message.success(`Diagnostic activated. ${record._id}`)
  //   this.props.diagnostic.enableDiag !== undefined && this.props.diagnostic.enableDiag(record)
  // }
  // handleVisibleChange = (visible) => {
  //   this.setState({ visible })
  // }

  render () {
    const { count, dateFrom, dateTo, query, queryModal } = this.props
    const title = 
    <div className='history-intro'>
      <span>{intl.getHTML('HISTORY_QUERY', {dateFrom: dateFrom, dateTo: dateTo})}. {intl.getHTML('HISTORY_ITEMS', {count: count})}.</span>
      <Button
        type='primary'
        icon='search'
        onClick={() => queryModal()}
      >
        {intl.get('QUERY')}
      </Button>
    </div>
    return (
      <LocaleProvider locale={this.getCurrentLocale()}>
        <div>
          <AlarmModal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
            data={this.state.diagnostic}
            disabled={!this.props.diagnostic || cookie.get('diagnostic') !== undefined}
          />
          <Table
            title={() => title}
            dataSource={query}
            bordered={false}
            size='small'
            pagination={{ defaultPageSize: ITEMS_PER_PAGE, pageSize: ITEMS_PER_PAGE }}
            rowKey='_id'
            rowClassName={(record, index) => this.rowClassname(record)}
            // onRow={(record) => {
            //   return {
            //     onClick: () => {
            //       this.props.onAlarm !== undefined && this.props.onAlarm(record)
            //     }
            //   }
            // }}
          >
            <Column
              title={intl.get('DATE')}
              dataIndex='logged'
              key='logged'
              // render={(text) => (moment.utc(text).format('YYYY-MM-DD HH:mm:ss'))}
            />
            <Column
              title={intl.get('DEVICE')}
              dataIndex='device.name'
              key='device'
              // render={(text, record, index) => text !== 0 ? 'device x' : intl.get(`DEVICE_ID_${text}`)}
            />
            <Column
              title={intl.get('MODE')}
              dataIndex='mode.info'
              key='mode'
              // render={(text, record, index) => intl.get(`MODE_ID_${text}`)}
            />
            <Column
              title={intl.get('OPERATION')}
              dataIndex='operation.info'
              key='operation'
              render={(text, record, index) => (
                record.alarm.id !== 0
                ?
                <a onClick={() => this.showModal(record)} >{text} ID {record.alarm.id}</a>
                // <Popover
                //   content={this.popoverDiag(record)}
                //   title={`Alarm ID ${record.alarm.id}`}
                //   trigger='hover'
                // >
                //   {/* <span>{intl.get(`OPERATION_ID_${text}`)} ID {record.alarm}</span> */}
                //   <span>{text} ID {record.alarm.id}</span>
                // </Popover>
                :
                // intl.get(`OPERATION_ID_${text}`)
                <span>{text}</span>
              )}
            />
            <Column
              title={intl.get('CARD')}
              dataIndex='card'
              key='card'
              className='col-text-align-center'
              render={(text, record) => (text === 999 ? <span>{intl.get('LOCK')}</span> : text)}
            />
            <Column
              title={intl.get('STALL')}
              dataIndex='stall'
              key='stall'
              className='col-text-align-center'
            />
            <Column
              title={intl.get('SIZE')}
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
      </LocaleProvider>
    )
  }
}

// export default connect()(History)
export default History
