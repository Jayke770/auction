import '../styles/globals.css'
import 'animate.css'
import type { AppProps } from 'next/app'
import { App } from 'konsta/react'
export default function Auction({ Component, pageProps }: AppProps) {
  return (
    <App theme='material' safeAreas dark>
      <Component {...pageProps} />
    </App>
  )
}
