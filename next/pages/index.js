import React from 'react'
import Head from 'next/head'
import LoginForm from 'src/components/LoginForm'
import cookie from 'cookie'

export default class PageLogin extends React.Component {
  componentDidMount () {
    if (process.browser) {
      document.cookie = cookie.serialize('token', '', { maxAge: -1 })
    }
  }
  render () {
    return (
      <div>
        <Head>
          <title>Sotefin Web Service</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
          <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />
          <link rel='icon' type='image/png' href='https://www.sotefinservice.com/static/favicon.png' />
        </Head>
        <div className='text-center'>
          <div className='app'>
            <h1>&#x1F680;&nbsp;<span className='app-title'>Sotefin Web Service</span></h1>
            <h4 className='text-muted'>The future of automated parking systems servicing</h4>
          </div>
          <LoginForm />
          <p className='text-center text-muted'><i className='anticon anticon-copyright' /> 2017-present <a href='http://www.sotefin.com'>Sotefin SA</a></p>
        </div>
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
            font-family: 'Roboto', sans-serif;
            font-size: 33px;
            font-weight: 400!important;
          }
        `}</style>
      </div>
    )
  }
}
