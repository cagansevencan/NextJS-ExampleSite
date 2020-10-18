import Layout from '../../components/layout'
import Head from "next/head";
import Link from 'next/link'
import unfetch from "isomorphic-unfetch";
import { useRouter } from 'next/router'
import APIController from '../../server/spotify-server'
import slug from 'slug'

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
      return {params: {slug: `${slug(playlist.name)}-${playlist.id}`}}
    }),
    fallback: false // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const id = params.slug.split("-").slice(-1)[0]

  const token = await APIController.getToken();
  const trackEndPoint =  'https://api.spotify.com/v1/playlists/' + id
  //console.log("Track End : " + trackEndPoint);
  const tracks = await APIController.getTracks(token, trackEndPoint);

  // data fetch
  return {
    props: {
      tracks
    },
  }
}

export default PostDetail
