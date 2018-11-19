import React from 'react'
import Error from 'next/error'
import checkLoggedIn from 'src/lib/checkLoggedIn'
import checkRole from 'src/lib/checkRole'

/*
 * Higher order component that passes `getInitialProps` through
 * to the child component
 */

const WithAuth = (Child, pageRole) => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      let { statusCode, currentUser } = await checkLoggedIn(ctx)
      let { locale, role } = currentUser
      // console.log('withAuth', pageRole, statusCode, currentUser)
      if (statusCode === 401) return { statusCode: statusCode }
      if (!checkRole(role, pageRole)) return { statusCode: 401 }
      ctx.store.dispatch({ type: 'UI_NAVBAR_SET_LOCALE', locale: locale })
      ctx.store.dispatch({ type: 'UI_NAVBAR_SET_USER', user: currentUser })
      return {
        ...(Child.getInitialProps ? await Child.getInitialProps(ctx) : {}), currentUser
      }
      // if (Child.getInitialProps) {
      //   return Child.getInitialProps(ctx)
      // }
      // return {}
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

// const withAuth = Child => {
//   var WithAuth = props => <Child {...props} />
//   WithAuth.getInitialProps = async ctx => {
//     let { statusCode, message } = await checkLoggedIn(ctx)
//     return {
//       ...(Child.getInitialProps ? await Child.getInitialProps(ctx) : {}),
//       message
//     }
//   }
//   return WithAuth
// }

// export default withAuth
