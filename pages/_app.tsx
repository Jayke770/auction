// @ts-nocheck
import '../styles/globals.css'
import 'animate.css'
import type { AppProps } from 'next/app'
import { App } from 'konsta/react'
import Web3 from 'web3'
import { SessionProvider } from 'next-auth/react'
import { Web3ReactProvider } from '@web3-react/core'
export default function Auction({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3(provider)}>
      <SessionProvider session={pageProps.session}>
        <App theme='material' safeAreas dark>
          <Component {...pageProps} />
        </App>
      </SessionProvider>
    </Web3ReactProvider>
  )
}
