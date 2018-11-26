import React from 'react'
import Layout from 'src/components/Layout'
import { List, Card } from 'antd'
import { APS, SIDEBAR_MENU, WEBSOCK_URL } from 'src/constants/bassano'
import { SERVICE } from 'src/constants/roles'
import withAuth from 'src/lib/withAuth'

const data = [
  {
    title: 'PLC I/O Rack 1',
    description: 'Elevatore A stato I/O digitali',
    image: '/static/im155_5.png',
    link: '/bassano/plc/rack1'
  },
  {
    title: 'PLC I/O Rack 2',
    description: 'Elevatore B stato I/O digitali',
    image: '/static/im155_5.png',
    link: '/bassano/plc/rack2'
  },
  {
    title: 'PLC I/O Rack 3',
    description: 'Torre stato I/O digitali',
    image: '/static/im155_5.png',
    link: '/bassano/plc/rack3'
  },
  {
    title: 'PLC I/O Rack 4',
    description: 'Torre (KKP) stato I/O digitali',
    image: '/static/im155_6.png',
    link: '/bassano/plc/rack4'
  }
]

class AppUi extends React.Component {
  static async getInitialProps ({ store }) {
    // store.sidebarSetMenu(5)
    store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: '4' })
  }
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     isFetching: true,
  //     comm: { isOnline: false },
  //     diag: { alarmCount: 0 },
  //     racks: props.racks
  //   }
  // }
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
          grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
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
