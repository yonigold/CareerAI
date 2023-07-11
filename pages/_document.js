import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
        defer
        type="text/javascript"
        src="https://api.pirsch.io/pirsch-extended.js"
        id="pirschextendedjs"
        data-code="0t6O6iOnfZ5zntf4E42vwVNmbYwx1J3m"
      />
 </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
