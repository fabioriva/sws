import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import withReduxStore from 'lib/with-redux-store'
import { Provider } from 'react-redux'
import * as gtag from 'src/lib/gtag'

const dev = process.env.NODE_ENV !== 'production'

if (!dev) Router.events.on('routeChangeComplete', url => gtag.pageview(url))

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
