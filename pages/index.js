import Layout from '../components/layout'
import Head from "next/head";
import unfetch from "isomorphic-unfetch";
import { Buffer } from "buffer";
import APIController from '../server/spotify-server'

function HomePage({playlists}) {
  return (
    <Layout>
        <Head>
            <title>Main Page</title>
        </Head>
      <h1>Welcome to my first website!</h1>

      <h2>Here are my Spotify playlists</h2>

      <ul>
      {playlists.items.map(playlist =>
        (
          <li key={playlist.id}>{playlist.name}</li>

        ))}
      </ul>
    </Layout>
  )
}




export async function getStaticProps() {

    const token = await APIController.getToken();
  console.log("HERE");
    console.log(token)
    const playlists = await APIController.getPlaylistByUser(token);
  console.log(playlists);
  // data fetch
  return {
    props: {
      playlists
    },
  }
}


export default HomePage
