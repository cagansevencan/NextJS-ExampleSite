import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { redirect } from "next/dist/next-server/server/api-utils";

const options = {
  site: 'http://localhost:3000' || process.env.NEXTAUTH_URL,

  // Configure one or more authentication providers
  providers: [
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
  ],

  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
   /* redirect: async (url, baseUrl) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
    }*/
  },

  pages: {
    newUser: null   // If set, new users will be directed here on first sign in
  },


  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
}


export default (req, res) => NextAuth(req, res, options);
