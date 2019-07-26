import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'

function getUrl (context = {}) {
  return (context.req && context.req.url) || context.pathname
}

export default async (ctx, pageRole) => {
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
