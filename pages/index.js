import Layout from '../components/layout'
import Head from "next/head";
import unfetch from "isomorphic-unfetch";

function HomePage() {
  return (
    <Layout>
        <Head>
            <title>Main Page</title>
        </Head>
      <h1>Welcome to my first website!</h1>




        <style jsx>{`
      `}
        </style>


    </Layout>
  )
}

const APIController = (function()  {
  const clientId = ' ';
  const clientSecret = ' ';

  //private methods
  const _getToken = async () => {
    const result = await fetch(' https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' +btoa(clientId + ':' + clientSecret)  //base64 encoded representation
        },
        body: 'grant_type=client_credentials'
      });
    const data =  await result.json();
    return data.access_token;  //Bearer token returned
  }

const _getPlaylistsByUser = async (token) => {
  const result = await fetch('https://api.spotify.com/v1/users/1299726247/playlists?offset=0&limit=20' , {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  const data = await result.json();
  return data.playlists.items;
}

const _getTracks = async (token, tracksEndPoint) => {
  const limit = 20;
  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  const data = await result.json();
  return data.items;
}

const _getTrack = async (token, trackEndPoint) => {
  const result = await fetch(`${trackEndPoint}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  const data = await result.json();
  return data;
}

  return {
    getToken() {
      return _getToken();
    },
    getPlaylistByUser(token) {
      return _getPlaylistsByUser(token);
    },
    getTracks(token, tracksEndPoint) {
      return _getTracks(token, tracksEndPoint);
    },
    getTrack(token, trackEndPoint) {
      return _getTrack(token, trackEndPoint);
    }
  }
}) ();  //Fire the function immediately



export async function getStaticProps() {
  // data fetch
  return {
    props: {

    },
  }
}


export default HomePage
