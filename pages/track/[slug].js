import Layout from '../../components/layout'
import Head from "next/head";
import Link from 'next/link'
import unfetch from "isomorphic-unfetch";

import APIController from '../../server/spotify-server'
import slug from "slug";


function TrackDetail({}) {
  return (
    <Layout>
      <Head>
        <title>Main Page</title>
      </Head>

      <div> {}</div>

    </Layout>
  )
}


export async function getStaticPaths() {

  const token = await APIController.getToken();
  const playlists = await APIController.getPlaylistByUser(token);

  return {
    paths: playlists.items.map(async playlist => {
      const id = playlist.id
      const trackEndPoint = 'https://api.spotify.com/v1/playlists/' + id
      console.log("End p: " + trackEndPoint);
      const tracks = await APIController.getTracks(token, trackEndPoint);
      console.log("TRACKS: " + tracks[0]);
      tracks.map(item => {
        return { params: { slug: `${slug(item.track.href)}` } }
      })
    }),
    fallback: false // See the "fallback" section below
    }
}

export async function getStaticProps({ params }) {
  console.log("Params is : " + params);
  return {
    props: {
      params
    },
  }
}

export default TrackDetail
