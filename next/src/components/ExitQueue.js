import React, { Component } from 'react'
import { Avatar, Card, Button, List } from 'antd' //, Icon, Modal, Table, Typography } from 'antd'
import intl from 'react-intl-universal'

// const confirm = Modal.confirm
// const { Text } = Typography

const data = [
  { position: '1°', card: '111', color: '#3f8600' },
  { position: '2°', card: '222', color: '#ccc' },
  { position: '3°', card: '333', color: '#ccc' },
  { position: '4°', card: '444', color: '#ccc' },
  { position: '5°', card: '555', color: '#ccc' }
]

export default class Queue extends Component {
  render () {
    const {
      queueList,
      exitButton
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
          <List
            itemLayout='horizontal'
            dataSource={queueList}
            style={{ margin: '0 20px' }}
            renderItem={(item, key) => (
              <List.Item
                actions={[
                  <Button shape='circle' icon='delete' size='small'
                    // type='delete'
                    onClick={() => this.props.handleDelete(item.card, key)}
                    disabled={item.card >= 0}
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={item.id === 1 ? <Avatar icon='arrow-up' style={{ backgroundColor: data[key].color }} /> : <Avatar style={{ backgroundColor: data[key].color }}>{item.id}</Avatar>}
                  title={`${item.id}° exit call`}
                  description={item.card !== 0 ? <span>Card <strong className='value'>{item.card}</strong> from stall <strong>{item.stall}</strong></span> : <span>Empty</span>}
                />
              </List.Item>
            )}
          />

          {/* <Table
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
          /> */}

        </Card>
        <style jsx global>{`
          .value {
            font-size: 16px;
            font-weight: bold;
            color: #364d79;
          }
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
