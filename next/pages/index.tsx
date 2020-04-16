import React from 'react'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import LoginForm from 'components/LoginForm'
import nextCookie from 'next-cookies'
import { Icon } from 'antd'

interface Props {
  apiUrl: string;
  token?: string;
}

const PageLogin: NextPage<Props> = ({ apiUrl, token }) => (
  <React.Fragment>
    <Head>
      <title>Sotefin Web Service</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      {/* <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' /> */}
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
      <link rel='icon' type='image/png' href='https://www.sotefinservice.com/static/favicon.png' />
    </Head>
    <div className='app text-center'>
      <h1>&#x1F680;&nbsp;<span className='app-title'>Sotefin&nbsp;Web&nbsp;Service</span></h1>
      <h4 className='text-muted'>The future of automated parking systems servicing.</h4>
    </div>
    <LoginForm
      apiUrl={apiUrl}
      token={token}
    />
    <p className='text-center text-muted'>
      Copyright <Icon type='copyright' /> 2017-present <a href='http://www.sotefin.com'>Sotefin SA</a>
    </p>
    <style jsx global>{`
      html, body {
        height: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff!important;
        background-image: url(/static/sotefin_shuttle.jpg);
        background-repeat: no-repeat;
        background-position: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
      .text-center {
        text-align: center;
      }
      .text-muted {
        color: #6c757d!important;
      }
      .app {
        margin-bottom: 16px;
      }
      .app-title {
        color: #ffa500;
        font-size: 33px;
        font-weight: 400!important;
      }
    `}</style>
  </React.Fragment>  
)

PageLogin.getInitialProps = async (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx)
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/login`
    : `${protocol}://${ctx.req.headers.host}/api/login`
  return { apiUrl, token }
}

export default PageLogin