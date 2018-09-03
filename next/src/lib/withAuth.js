import React from 'react'
import Error from 'next/error'
import checkLoggedIn from '../lib/checkLoggedIn'
/*
 * Higher order component that passes `getInitialProps` through
 * to the child component
 */

const WithAuth = (Child) => {
  return class extends React.Component {
    static async getInitialProps (ctx) {
      let { statusCode, message } = await checkLoggedIn(ctx)
      if (statusCode === 401) return { statusCode: statusCode }
      // if (Child.getInitialProps) {
      //   return Child.getInitialProps(ctx)
      // }
      // return {}
      return {
        ...(Child.getInitialProps ? await Child.getInitialProps(ctx) : {}),
        message
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
