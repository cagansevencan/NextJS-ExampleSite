import Layout from '../../components/layout'
import Head from "next/head";
import Link from 'next/link'
import unfetch from "isomorphic-unfetch";

import APIController from '../../server/spotify-server'

function PostDetail({}) {
  return (
    <Layout>
      <Head>
        <title>Main Page</title>
      </Head>

      <div>Hello</div>

    </Layout>
  )
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: false // See the "fallback" section below
  };
}




export async function getStaticProps() {

  //const token = await APIController.getToken();
  //console.log("HERE");
  //console.log(token)
  //const playlists = await APIController.getPlaylistByUser(token);
  //console.log(playlists);
  // data fetch
  return {
    props: {
      //playlists
    },
  }
}

export default PostDetail
