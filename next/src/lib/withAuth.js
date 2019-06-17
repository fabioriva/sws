import React from 'react'
import Error from 'next/error'
import Router from 'next/router'
import { auth } from 'src/lib/auth'

/*
 * Higher order component that passes `getInitialProps` through
 * to the child component
 */

export default (Component) => {
  return class WithAuth extends React.Component {
    static async getInitialProps (ctx) {
      const props =
        (Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : null) || {}

      const { activeItem, pageRole } = props

      const { currentUser, statusCode } = await auth(ctx, pageRole)

      console.log(activeItem, pageRole, currentUser, statusCode)

      if (statusCode === 401) return { statusCode: statusCode }

      ctx.store.dispatch({ type: 'UI_NAVBAR_SET_USER', user: { ...currentUser, url: ctx.asPath } })
      ctx.store.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: activeItem })

      return { ...props, currentUser }
    }

    constructor (props) {
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/')
      }
    }

    render () {
      if (this.props.statusCode > 200) {
        return <Error statusCode={this.props.statusCode} />
      }
      return <Component {...this.props} />
    }
  }
}
