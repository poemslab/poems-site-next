import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>
          <meta name="theme-color" content="#F8763F" />
          <meta name="keywords" content="poemslab, poems-lab, poems lab лаборатория стихов, лаборатория стихов, поемс лаб, poems-lab лаборатория стихов, poems-lab.ru, стихи, текста песен, моргенштерн текст, ганвест текст"/>
          <script data-ad-client="ca-pub-4341898293988266" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument