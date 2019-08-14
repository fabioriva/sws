import { Avatar, Card, Button, List, Empty } from 'antd'
import intl from 'react-intl-universal'

const ExitQueue = props => {
  const {
      queueList,
      exitButton
    } = props.exitQueue
  const button =
    <Button
      type='primary'
      disabled={!exitButton.merker.status}
      onClick={() => props.showModal(0)}
    >
      {intl.get('EXIT_CAR')}
    </Button>
  return (
    <Card
      title={intl.get('EXIT_QUEUE')}
      actions={[button]}
      headStyle={{ backgroundColor: '#40a9ff' }}
      style={{ width: '100%' }}
    >
      <List
        itemLayout='horizontal'
        locale={{ emptyText: <Empty description='No operations' /> }}
        dataSource={queueList.filter(value => value.card !== 0)}
        style={{ margin: '0 20px' }}
        renderItem={(item, key) =>
          <List.Item
            actions={[
              <Button
                shape='circle'
                icon='delete'
                size='small'
                onClick={() => props.handleDelete(item.card, key)}
                disabled={item.card === 0}
              />
            ]}
          >
            <List.Item.Meta
              avatar={item.id === 1 ? <Avatar icon='arrow-up' style={{ backgroundColor: '#3f8600 ' }} /> : <Avatar style={{ backgroundColor: '#ccc' }}>{item.id}</Avatar>}
              title={`${item.id}° exit call`}
              description={item.card !== 0 ? <span>Card <strong className='value'>{item.card}</strong> from stall <strong>{item.stall}</strong></span> : <span>Empty</span>}
            />
          </List.Item>
        }
      />
      <style jsx>{`
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
    </Card>
  )
}

export default ExitQueue