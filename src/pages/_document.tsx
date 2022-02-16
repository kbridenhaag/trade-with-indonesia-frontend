import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="kbridh-template">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="kbridh-template_body js-enabled">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
