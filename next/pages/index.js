import React from 'react'
import Head from 'next/head'
import LoginForm from 'src/components/LoginForm'

export default class PageLogin extends React.Component {
  static getInitialProps ({ req }) {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}/api/login.js`
      : `${protocol}://${req.headers.host}/api/login.js`
    return { apiUrl }
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
            <h1>&#x1F680;&nbsp;<span className='app-title'><span className='color-1'>S</span>otefin&nbsp;<span className='color-2'>W</span>eb&nbsp;<span className='color-3'>S</span>ervice</span></h1>
            <h4 className='text-muted'>The future of automated parking systems servicing</h4>
          </div>
          <LoginForm apiUrl={this.props.apiUrl} />
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
          .color-1 {
            color: #ffa500;
          }
          .color-2 {
            color: #ffa500;
          }
          .color-3 {
            color: #ffa500;
          }
        `}</style>
      </div>
    )
  }
}
