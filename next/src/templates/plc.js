import React from 'react'
import { List } from 'antd'
import Layout from 'src/components/Layout'
import Et200mLink from 'src/components/Et200mLink'
import Et200sLink from 'src/components/Et200sLink'

export default (def, role, data) => {
  const { APS, APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = def
  return class extends React.Component {
    static async getInitialProps () {
      return {
        activeItem: '4',
        pageRole: role
      }
    }
    renderLink = (item, key) => {
      return (
        item.type === 'm'
        ?
        <Et200mLink aps={APS} rackNumber={key} title={item.title} />
        :
        <Et200sLink aps={APS} rackNumber={key} title={item.title} />
      )
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
                  title={this.renderLink(item, key)}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Layout>
      )
    }
  }
}
