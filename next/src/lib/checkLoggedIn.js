import fetch from 'isomorphic-unfetch'
import parseCookies from './parseCookies'

const dev = process.env.NODE_ENV !== 'production'
const ROOT_URL = dev ? process.env.BACKEND_URL : 'https://www.sotefinservice.com'

function getUrl (context = {}) {
  return (context.req && context.req.url) || context.pathname
}

export default async (context) => {
  const { token } = parseCookies(context)
  const res = await fetch(`${ROOT_URL}/authorization`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ pathname: getUrl(context) })
    })
  const json = await res.json()
  return {
    statusCode: res.status,
    message: json
  }
}
