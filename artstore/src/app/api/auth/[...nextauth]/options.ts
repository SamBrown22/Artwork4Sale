// NextAuth configuration
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {getUser} from "@/services/userService"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided")
          return null // Return null for undefined credentials
        }

        const { email, password } = credentials
        try {
          // Ensure both email and password are provided
          if (typeof email === "string" && typeof password === "string") {
            const res = await getUser({ email, password })
            if (res) {
              return {
                id: res.id,
                name: res.username,
                email: res.email,
                image: res.image,
              }
            } else {
              console.log("User not found")
              return null
            }
          } else {
            console.error("Invalid credentials")
            return null
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message)
          } else {
            console.error("Unknown error")
            return null
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/signup-login?page=login",
    signOut: "/signup-login?page=login",
    newUser: "/signup-login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user, session, trigger}){
      if (trigger === "update" && session?.image){
        token.image = session.image;
      }

      // pass in user id and image to token
      if (user) {
        return {
          ...token,
          id: user.id,
          image: user.image,
        }
      }
      return token;
    },
    async session({session, token}){ 
      // pass in user id and image to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.image as string | null | undefined,
        },
      };
      return session;
    } 
  },
}
