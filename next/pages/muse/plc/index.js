import React from 'react'
import Layout from 'src/components/Layout'
import { List, Card } from 'antd'
import { APS, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/muse'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Main control panel digital I/O status',
    image: '/static/im155_5.png',
    link: '/muse/plc/rack1'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevator 1 main control panel digital I/O status',
    image: '/static/im155_5.png',
    link: '/muse/plc/rack2'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Elevator 1 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack3'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Elevator 2 main control panel digital I/O status',
    image: '/static/im155_5.png',
    link: '/muse/plc/rack4'
  },
  {
    title: 'PLC I/O Rack 5',
    description: 'Elevator 2 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack5'
  },
  {
    title: 'PLC I/O Rack 6',
    description: 'Elevator 3 main control panel digital I/O status',
    image: '/static/im155_5.png',
    link: '/muse/plc/rack6'
  },
  {
    title: 'PLC I/O Rack 7',
    description: 'Elevator 3 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack7'
  },
  {
    title: 'PLC I/O Rack 8',
    description: 'Elevator 3 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack8'
  },
  {
    title: 'PLC I/O Rack 9',
    description: 'Elevator 4 main control panel digital I/O status',
    image: '/static/im155_5.png',
    link: '/muse/plc/rack9'
  },
  {
    title: 'PLC I/O Rack 10',
    description: 'Elevator 4 on board control panel (KKP) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack10'
  },
  {
    title: 'PLC I/O Rack 11',
    description: 'Elevator 4 on board control panel (KKS) digital I/O status',
    image: '/static/im155_6.png',
    link: '/muse/plc/rack11'
  }
]

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    // store.sidebarSetMenu(5)
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '4' })
  }
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      racks: props.racks
    }
  }
  componentDidMount () {
    this.ws = new WebSocket(WEBSOCK_URL)
    this.ws.onerror = e => console.log(e)
  }
  componentWillUnmount () {
    this.ws.close()
  }
  render () {
    return (
      <Layout
        aps={APS}
        pageTitle='PLC Digital I/O'
        sidebarMenu={SIDEBAR_MENU}
        socket={WEBSOCK_URL}
      >
        {/* <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.image} alt='rack' />}
                title={<a href={item.link}>{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        /> */}
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
              >
                <Card.Meta
                  avatar={<img src={item.image} alt='rack' />}
                  title={<a href={item.link}>{item.title}</a>}
                  description={<div>{item.description}</div>}
                />
              </Card>
            </List.Item>
          )}
        />
      </Layout>
    )
  }
}

export default withAuth(AppUi, SERVICE)
