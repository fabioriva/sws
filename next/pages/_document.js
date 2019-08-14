import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from 'src/lib/gtag'

const dev = process.env.NODE_ENV !== 'production'
const tag = !dev &&
<>
{/* Global Site Tag (gtag.js) - Google Analytics */}
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${GA_TRACKING_ID}');
    `
  }}
/>
</>

export default class extends Document {
  render () {
    return (
      <html>
        <Head>{tag}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}