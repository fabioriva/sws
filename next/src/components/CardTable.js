import { Table } from 'antd'

const { Column } = Table
const ITEMS_PER_PAGE = 20

const CardList = (props) => (
  <Table
    dataSource={props.cards}
    bordered
    size='small'
    pagination={{ defaultPageSize: ITEMS_PER_PAGE, pageSize: ITEMS_PER_PAGE }}
    rowKey='nr'
    onRow={(record) => {
      return {
        onClick: () => { if (record.code !== undefined) props.showModal(record.nr, record.code, record.from, record.to) }
      }
    }}
  >
    <Column
      title={'Number'}
      dataIndex='nr'
      key='nr'
    />
    <Column
      title={'PIN Code'}
      dataIndex='code'
      key='code'
      // render={(text) => text !== undefined ? text : '---'}
    />
    <Column
      title={'Valid from'}
      dataIndex='from'
      key='from'
      render={(text, record) => text !== undefined ? text : '---'} // moment(text).format('HH:mm:ss')}
    />
    <Column
      title={'Valid to'}
      dataIndex='to'
      key='to'
      render={(text, record) => text !== undefined ? text : '---'} // moment(text).format('HH:mm:ss')}
    />
  </Table>
)

export default CardList
