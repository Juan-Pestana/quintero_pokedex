import '../styles/globals.css'
import React from 'react'
import Layout from '../components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
