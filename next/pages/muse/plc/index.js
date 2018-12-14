import React from 'react'
import Link from 'next/link'
import Layout from 'src/components/Layout'
import { List } from 'antd'
import { APS, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Main control panel digital I/O status',
    image: '/static/im155_5.png',
    // link: '/muse/plc/rack1',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevator 1 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Elevator 1 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Elevator 2 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'Elevator 2 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 6',
    description: 'Elevator 3 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 7',
    description: 'Elevator 3 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 8',
    description: 'Elevator 3 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 9',
    description: 'Elevator 4 main control panel digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 10',
    description: 'Elevator 4 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 11',
    description: 'Elevator 4 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  }
]

const Et200mLink = (props) => (
  <li>
    <Link
      as={`/muse/rack/${props.rackNumber + 1}`}
      href={`/muse/plc/et200m?rackNumber=${props.rackNumber}&title=${props.title}`}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

const Et200sLink = (props) => (
  <li>
    <Link
      as={`/muse/rack/${props.rackNumber + 1}`}
      href={`/muse/plc/et200s?rackNumber=${props.rackNumber}&title=${props.title}`}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '4' })
  }
  render () {
    return (
      <Layout
        aps={APS}
        pageTitle='PLC Digital I/O'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <List
          // bordered
          // grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          itemLayout='horizontal'
          size='small'
          dataSource={data}
          renderItem={(item, key) => (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.image} alt='rack' width='85%' height='85%' />}
                title={item.type === 'm' ? <Et200mLink rackNumber={key} title={item.title} /> : <Et200sLink rackNumber={key} title={item.title} />}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Layout>
    )
  }
}

export default withAuth(AppUi, SERVICE)
