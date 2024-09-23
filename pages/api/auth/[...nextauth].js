// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import { creatUser } from "@/controller/userController";
// import log from "logging-service"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000 // Increase timeout to 10 seconds
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000 // Increase timeout to 10 seconds for GitHub
      }
    })

  ],
  // debug: true,
  // session: {
  //   jwt: true, // Ensure JWT is used for sessions
  // },
  callbacks: {
    async signIn({user, account, profile}){
      console.log(user)
      const result = await creatUser(user, account.provider);
      console.log(result)
      return true;
    }
    
  },
  debug: true, 


};

export default NextAuth(authOptions);
