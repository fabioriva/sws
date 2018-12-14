import React from 'react'
import Link from 'next/link'
import Layout from 'src/components/Layout'
import { List } from 'antd'
import { APS, APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/nyu'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Main digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'System A1 digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'System A1 (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'System B2 digital I/O status',
    image: '/static/im155_5.png',
    type: 'm'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'System B2 (KKP) digital I/O status',
    image: '/static/im155_6.png',
    type: 's'
  }
]

const Et200mLink = (props) => (
  <li>
    <Link
      as={`/${APS}/rack/${props.rackNumber + 1}`}
      href={`/${APS}/plc/et200m?rackNumber=${props.rackNumber}&title=${props.title}`}
    >
      <a>{props.title}</a>
    </Link>
  </li>
)

const Et200sLink = (props) => (
  <li>
    <Link
      as={`/${APS}/rack/${props.rackNumber + 1}`}
      href={`/${APS}/plc/et200s?rackNumber=${props.rackNumber}&title=${props.title}`}
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
        aps={APS_TITLE}
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
