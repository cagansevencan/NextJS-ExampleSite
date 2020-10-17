import Layout from '../../components/layout'
import Head from "next/head";
import Link from 'next/link'
import unfetch from "isomorphic-unfetch";

import APIController from '../../server/spotify-server'

function PostDetail({tracks}) {
  return (
    <Layout>
      <Head>
        <title>Main Page</title>
      </Head>

      <ul>
        {tracks.map(item =>
          (
            <li key={item.id}>
               {item.track.name}
            </li>
          ))}
      </ul>

    </Layout>
  )
}

export async function getStaticPaths() {
  const token = await APIController.getToken();
  const playlists = await APIController.getPlaylistByUser(token);
  return {
    paths: playlists.items.map(playlist => {
      return {params: {id: `${playlist.id}`}}
    }),
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const token = await APIController.getToken();
  const trackEndPoint =  'https://api.spotify.com/v1/playlists/' + params.id
  console.log("Params : " + params.id);
  console.log("Track End : " + trackEndPoint);
  const tracks = await APIController.getTracks(token, trackEndPoint);
  console.log("TRACKS: " + tracks);
  // data fetch
  return {
    props: {
      tracks
    },
  }
}

export default PostDetail
