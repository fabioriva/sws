import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'

export const login = async ({ token, aps }) => {
  cookie.set('token', token, { expires: 1 })
  Router.push(`/${aps}/overview`)
}

export const logout = () => {
  cookie.remove('token')
  cookie.remove('diagnostic')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/')
}

function getUrl (context = {}) {
  return (context.req && context.req.url) || context.pathname
}

export const auth = async (ctx, pageRole) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const apiUrl = process.browser
    ? `${protocol}://${window.location.host}/api/profile.js`
    : `${protocol}://${ctx.req.headers.host}/api/profile.js`

  const { token } = nextCookie(ctx)
  const pathname = getUrl(ctx)

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify({ token }) // 'Authorization': token
      },
      body: JSON.stringify({ pathname }) // body: JSON.stringify({ pathname: getUrl(ctx) })
    })
    if (res.ok) {
      const user = await res.json()
      return {
        currentUser: user,
        statusCode: user.role <= pageRole ? res.status : 401
      }
    } else {
      return {
        currentUser: {},
        statusCode: res.status
      }
    }
  } catch (error) {
    return {
      currentUser: {},
      statusCode: 401
    }
  }
}
