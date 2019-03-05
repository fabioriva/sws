// import React from 'react'
import App, { Container } from 'next/app'

import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from 'src/store'
// import { compose } from 'redux'
// import withAuth from 'src/lib/withAuth'
// import withError from 'src/lib/withError'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
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

export default withRedux(initStore)(MyApp)
// export default compose(withAuth(withRedux(initStore)(MyApp)))
