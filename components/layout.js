import Navigation from './navigation'
import Head from "next/head";


function Layout({ children }) {
  return (
    <div>
        <Head>
            <title>Cagan's Site</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

      <Navigation />
      <main>{children}</main>
      <footer>Design by Cagan</footer>

      <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>

    </div>

  )
}

export default Layout
