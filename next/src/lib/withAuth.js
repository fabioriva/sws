import React from 'react'
import Error from 'next/error'
import checkLoggedIn from 'src/lib/checkLoggedIn'

/*
 * Higher order component that passes `getInitialProps` through
 * to the child component
 */

const WithAuth = (Child, pageRole) => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      // check if logged
      const { statusCode, currentUser } = await checkLoggedIn(ctx)
      if (statusCode === 401) return { statusCode: statusCode }
      // check user role against page role
      if (currentUser.role === undefined || currentUser.role > pageRole) return { statusCode: 401 }
      ctx.store.dispatch({ type: 'UI_NAVBAR_SET_USER', user: { ...currentUser, pathname: ctx.pathname } })
      return {
        ...(Child.getInitialProps ? await Child.getInitialProps(ctx) : {}),
        currentUser
      }
    }
    render () {
      if (this.props.statusCode > 200) {
        return <Error statusCode={this.props.statusCode} />
      }
      return <Child {...this.props} />
    }
  }
}

export default WithAuth
