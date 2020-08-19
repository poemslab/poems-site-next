import App from 'next/app'
import '../styles/style.scss'
import { wrapper } from '../store'
import NextNprogress from 'nextjs-progressbar'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height="3"
        />
        <Component {...pageProps} />
      </>
    )
  }
}

export default wrapper.withRedux(MyApp)