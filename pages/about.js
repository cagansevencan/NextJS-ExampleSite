import Layout from '../components/layout'
import Head from "next/head";
import { useSession } from 'next-auth/client'

function HomePage() {

  const [session, loading] = useSession();

  if (loading) return <div>loading...</div>;
  if (!session) return <div>no session</div>;

  return (
    <Layout>
          {session && (
            <>
            <img src={session.user.image} className={"avatar"}  alt={"Image"}/>
            <h1>{session.user.name}</h1>
            </>
          )}
      <h1>Hi!</h1>

      <style jsx>{`
        .avatar {
          border-radius: 10px;
        }
      `}</style>

    </Layout>
  )
}

export default HomePage
