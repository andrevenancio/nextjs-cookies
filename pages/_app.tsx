import type { AppProps } from "next/app"
import Head from "next/head"

import { SecureRoutes } from "../components"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <SecureRoutes {...pageProps}>
        <Component {...pageProps} />
      </SecureRoutes>
    </>
  )
}
