import Layout from '../components/layout'
import Head from "next/head";
import { useSession } from 'next-auth/client'

function HomePage() {

  const [session, loading] = useSession();

  if (loading) return <div>loading...</div>;
  if (!session) return <div>no session</div>;

  return (
    <Layout>
        <Head>
          {session && (
            <>
            <img src={session.user.image} className={"avatar"} />
            <h1>{session.user.name}</h1>
            </>
          )}
        </Head>
      <h1>Hi!</h1>
    </Layout>
  )
}

export default HomePage
