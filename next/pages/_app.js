import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from 'src/store'
// import {compose} from 'redux'
// import withAuth from 'src/lib/withAuth'

const dev = process.env.NODE_ENV !== 'production'
const backendUrl = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'
const websocketUrl = dev ? process.env.WEBSOCKET_URL : 'wss://www.sotefinservice.com'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    // we can dispatch from here too
    // ctx.store.dispatch({type: 'UI_SIDEBAR_TOGGLE', status: false})
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }
  }
  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

// export default compose(withAuth(withRedux(initStore)(MyApp)))
export default withRedux(initStore)(MyApp)
