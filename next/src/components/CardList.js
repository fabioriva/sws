import { Row, Col, Avatar, Icon, List } from 'antd'

const CardList = props => (
  <Row>
    <Col span={24} offset={0}>
      <List
        dataSource={props.cards}
        pagination={{
          pageSize: 10,
          size: 'small'
        }}
        size='small'
        style={{ background: '#fff', padding: 16 }}
        renderItem={item => (
          <List.Item
            actions={[
              <Icon
                onClick={() => item.code !== undefined && props.showModal(item.nr, item.code, item.from, item.to)}
                type='edit'
                key='edit'
              />
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: '#ccc' }} icon='user' />
              }
              title={<span style={{ color: '#1890ff' }} >User {item.nr}</span>}
              description={<span>Card number <strong>{item.nr}</strong> has code <strong>{item.code}</strong></span>}
            >
              content
            </List.Item.Meta>
          </List.Item>
        )}
      />
    </Col>
  </Row>
)

export default CardList