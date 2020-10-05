import Layout from '../components/layout'
import Head from "next/head";
import { useSession } from 'next-auth/client'
import Skeleton from 'react-loading-skeleton'

function HomePage() {

  const [session, loading] = useSession();

  if (loading) return <div> <Skeleton/>
  </div>;
  if (!session) return <div>
  No Session
  </div>;

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
