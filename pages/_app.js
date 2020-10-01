import '../styles/app.css'
import '../styles/navigation.css'
import { Provider } from 'next-auth/client'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const { session } = pageProps;
    return (
      <Provider options={{ site: process.env.SITE }} session={session}>
    <Component {...pageProps} />
      </Provider>
    )
}
