import React from 'react'
import { List } from 'antd'
import Layout from 'src/components/Layout'
import PlcLink from 'src/components/PlcLink'

export const withRacks = Page => {
  const WithRacks = props => {
    const { APS_TITLE, SIDEBAR_MENU, WEBSOCK_URL } = props.def
    return (
      <Layout
        aps={APS_TITLE}
        pageTitle='PLC Digital I/O'
        sidebarMenu={SIDEBAR_MENU}
        socket={`${WEBSOCK_URL}?channel=ch2`}
      >
        <List
          bordered
          dataSource={props.data}
          renderItem={(item, key) => (
            <List.Item>
              <List.Item.Meta
                avatar={<img src={item.image} alt='rack' />}
                title={
                  <PlcLink
                    aps={props.currentUser.aps}
                    rack={item}
                    rackNumber={key}
                  />
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Layout>
    )
  }

  WithRacks.getInitialProps = async context => {
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps(context) : {})
    }
  }

  return WithRacks
}