import React, { Component } from 'react'
import { Row, Col, Card, Button, Icon, Modal, Table } from 'antd'
import intl from 'react-intl-universal'

const confirm = Modal.confirm

export default class Queue extends Component {
  handleDelete = (card, index) => {
    console.log(card, index)
    confirm({
      title: `${intl.get('DELETE_ITEM')}`,
      content: `${intl.get('DELETE_INFO', {card: card})}`,
      onOk () {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel () {}
    })
  }
  render () {
    const {
      queueList,
      exitButton,
    } = this.props.exitQueue
    const button =
      <Button
        style={{ width: '100%' }}
        type='default'
        disabled={!exitButton.merker.status}
        icon='logout'
        onClick={() => this.props.showModal(0)}
      >
      {intl.get('EXIT_CAR')}
      </Button>
    return (
      <div>
        <Card
          title={intl.get('EXIT_QUEUE')}
          actions={[button]}
          style={{ width: '100%' }}
        >
          <Table
            columns={[
              {
                dataIndex: 'card',
                className:'col-text-align-center'
              },
              {
                dataIndex:'stall',
                className:'col-text-align-center'
              },
              {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record, index) => <Button shape='circle' icon='delete' size='small' onClick={() => this.handleDelete(record.card, index)} disabled={record.card == 0} />,
              }
            ]}
            dataSource={queueList}
            rowKey='id'
            pagination={false}
            showHeader={false}
            size='small'
          />
        </Card>
        <style jsx global>{`
          .col-text-align-center {
            font-size: 16px;
            font-weight: bold;
            color: #364d79;
            text-align: center;
          }
          .queue-footer {
            border: 1px solid #e9e9e9;
            padding: 8px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}
