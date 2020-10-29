import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { redirect } from "next/dist/next-server/server/api-utils";
import APIController from "../../../server/spotify-server";
import unfetch from "isomorphic-unfetch";


const providers =  [
  Providers.Spotify({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  }),
  Providers.Twitter({
    clientId: process.env.TWITTER_ID,
    clientSecret: process.env.TWITTER_SECRET,
  }),
  Providers.GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),
  Providers.Email({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM
  }),
  // ...add more providers here
]


 const callbacks = {
  pages: {
    newUser: null  // If set, new users will be directed here on first sign in
  }
 }

 callbacks.signIn = async function signIn(user, account, metadata){
      user.accessToken  = await APIController.getToken();
      const res = await unfetch('https://api.twitter.com/oauth/request_token', {
        headers: {
          'Authorization' : `token ${account.accessToken}`
        }
      })

   const twitterUser = {
        id: metadata.id,
     login: metadata.login,
     name: metadata.name
   }

   const data = await res.json()
   console.log("DATA IS HERE:" + data);
      user.data = data
   return true;
 }


const options = {
  providers,
  session: {
    jwt: true
  },
  callbacks,
  site: 'http://localhost:3000' || process.env.NEXTAUTH_URL,
}
// Conf



export default (req, res) => NextAuth(req, res, options);
