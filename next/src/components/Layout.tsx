import * as React from 'react'
import Head from 'next/head'
//import Link from 'next/link'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Layout, Icon } from 'antd'

const { Content, Footer } = Layout

type Props = {
  pageTitle: string,
  aps: string,
  sidebarMenu: Array<object>,
  socket: string
}

const PageLayout: React.FunctionComponent<Props> = ({
  children,
  pageTitle,
  aps,
  sidebarMenu,
  socket
}) => (
  <>
    <Head>
      <title>Sotefin Web Service</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
      <link rel='icon' type='image/png' href='/static/favicon.png' />
    </Head>
    <Layout className='app-layout'>
      <Sidebar sidebarMenu={sidebarMenu} />
      <Layout>
        <Navbar socket={socket} />
        <Content className='app-container'>
          <div className='app-title'>
            <h3>{pageTitle} <span className='app-subtitle' dangerouslySetInnerHTML={{ __html: aps }} /></h3>
            <hr />
          </div>
          { children }
        </Content>
        <Footer className='app-footer'>
          Copyright <Icon type='copyright' /> 2017-present <a href='http://www.sotefin.com'>Sotefin SA</a>
        </Footer>
      </Layout>
    </Layout>
    <style jsx global>{`
      html, body {
        height: 100%;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
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
        padding: 12px 0;
        text-align: center;
        font-size: 90%;
      }
      .app-title {
        margin: 0 0 32px 0;
        padding-right: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 16px;
        line-height: 1.4;
      }
      .app-subtitle {
        padding-right: 12px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.8;
      }
    `}</style>
  </>
)

export default PageLayout