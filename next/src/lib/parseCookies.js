import cookie from 'cookie'

// function parseCookies (context = {}, options = {}) {
//   return cookie.parse(
//     context.req && context.req.headers.cookie
//       ? context.req.headers.cookie
//       : process.browser ? document.cookie : '',
//     options
//   )
// }

function parseCookies (context = {}, options = {}) {
  return cookie.parse(
    context.req ? context.req.headers.cookie || '' : document.cookie,
    // context.req ? context.req.headers.cookie : process.browser ? document.cookie : '',
    options
  )
}

export default parseCookies
