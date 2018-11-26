import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Layout, Icon } from 'antd'

const { Content, Footer } = Layout

export default class PageLayout extends React.Component {
  render () {
    return (
      <div>
        <Head>
          <title>Sotefin Web Service</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
          <link rel='icon' type='image/png' href='https://www.sotefinservice.com/static/favicon.png' />
        </Head>
        <div>
          <Layout className='app-layout'>
            <Sidebar
              // menuKey={this.props.menuKey}
              // sidebar={this.props.sidebar}
              sidebarMenu={this.props.sidebarMenu}
            />
            <Layout>
              <Navbar
                socket={this.props.socket}
              />
              <Content className='app-container'>
                <div className='app-title'>
                  <h2>{this.props.pageTitle} <span className='app-subtitle' dangerouslySetInnerHTML={{ __html: this.props.aps }} /></h2>
                  <hr />
                </div>
                { this.props.children }
              </Content>
              <Footer className='app-footer'>
                Copyright <Icon type='copyright' /> 2017-present <Link href='http://www.sotefin.com'><a>Sotefin SA</a></Link>
              </Footer>
            </Layout>
          </Layout>
        </div>
        <style jsx global>{`
          html, body {
            height: 100%;
            margin: 0;
          }
          html {
            font-family: 'Roboto', sans-serif;
          }
          hr {
            margin-bottom: 1rem;
            border: 0;
            border-top: 1px solid rgba(0,0,0,.1);
          }
          .app-layout {
            position: relative;
            min-height: 100vh;
          }
          .app-container {
            margin: 12px 36px;
            height: 100%;
          }
          .app-footer {
            background-color: #f0f0f0;
            padding: 12px 0;
            text-align: center;
            font-size: 90%;
          }
          .app-title {
            margin-top: 0;
            margin-bottom: .5rem;
            font-weight: 300;
          }
          .app-subtitle {
            color: #636c72!important;
            font-size: 60%;
            font-weight: 400;
          }
        `}</style>
      </div>
    )
  }
}
