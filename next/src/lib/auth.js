import { Component } from 'react'
import Error from 'next/error'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'

function login ({ token, aps }) {
  cookie.set('token', token, { expires: 1 })
  Router.push(`/${aps}/overview`)
}

function logout () {
  cookie.remove('token')
  cookie.remove('diagnostic')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/')
}

function withAuthSync (WrappedComponent) {
  return class extends Component {
    static async getInitialProps (ctx) {
      const props =
        (WrappedComponent.getInitialProps
          ? await WrappedComponent.getInitialProps(ctx)
          : null) || {}

      const { activeItem, pageRole } = props

      const { currentUser, statusCode } = await profile(ctx, pageRole)

      if (statusCode === 401) return { statusCode: statusCode }

      ctx.reduxStore.dispatch({ type: 'UI_NAVBAR_SET_USER', user: { ...currentUser, url: ctx.asPath } })
      ctx.reduxStore.dispatch({ type: 'UI_SIDEBAR_SET_MENU', item: activeItem })

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
      return <WrappedComponent {...this.props} />
    }
  }
}

async function profile (ctx, role) {
  const token = auth(ctx)
  const pathname = getUrl(ctx)
  const [apsPath] = pathname.substring(1).split('/')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const url = process.browser
    ? `${protocol}://${window.location.host}/api/profile`
    : `${protocol}://${ctx.req.headers.host}/api/profile`
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token })
      }
    })

    if (response.ok) {
      const user = await response.json()
      return {
        currentUser: user,
        statusCode: user.aps === apsPath && user.role <= role ? response.status : 401
      }
    } else {
      return {
        currentUser: {},
        statusCode: response.status
      }
    }
  } catch (error) {
    // Implementation or Network error
    return {
      currentUser: {},
      statusCode: 401
    }
  }
}

function auth (ctx) {
  const { token } = nextCookie(ctx)

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/')
  }

  return token
}

function getUrl (context = {}) {
  return (context.req && context.req.url) || context.pathname
}

export { login, logout, withAuthSync, profile, auth }
