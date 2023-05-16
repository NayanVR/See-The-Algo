import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>See The Algo</title>
        <meta name="description" content="Sorting Algorithm Visualizer" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
