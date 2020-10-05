import Layout from '../components/layout'
import Head from "next/head";
import unfetch from "isomorphic-unfetch";

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
          <li key={playlist.id}>
            <img src={playlist.images[0].url} className={"playlist-avatar"}  alt={"Image"} />
            {playlist.name}
          </li>
        ))}
      </ul>
      <style jsx>{`
      
        h1{
        margin-left: 10px;
        }
        
        h2{
        margin-left: 20px;
        }
      
        ul{
        display: grid;
        gap: 20px;
        }
      
        li{
        display: grid;
        grid-template-columns: 0fr 4fr;
        align-items: center;
        gap: 20px;
        }
      
        .playlist-avatar {
          border-radius: 0.4rem;
          height: 8rem;
          width: 8rem;
          border: 0.5px solid #ddd;
        }
      `}</style>

    </Layout>
  )
}

export async function getStaticProps() {

  const token = await APIController.getToken();
  console.log("HERE");
  console.log(token)
  const playlists = await APIController.getPlaylistByUser(token);
  //console.log(playlists);
  // data fetch
  return {
    props: {
      playlists
    },
  }
}

export default HomePage
