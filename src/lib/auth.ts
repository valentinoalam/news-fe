import { NextAuthOptions } from "next-auth";
// import Providers from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';

type Credential = {
  email: string;
  password: string;
  isRegister: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password, isRegister } = credentials as Credential;

        if (isRegister) {
          // Custom logic for new user registration
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const user = await response.json();
            return user;
          } else {
            return null;
          }
        } else {
          // Existing logic for login
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          if (response.ok) {
            const user = await response.json();
            return user;
          } else {
            return null;
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
      signIn: '/signin',
      // error: '/signin',  // Error redirects to login page
      signOut: '/',     // Optional: customize the sign-out redirect
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // Example: 30 days
      updateAge: 24 * 60 * 60,
  },
  jwt: {
      secret: process.env.NEXTAUTH_SECRET as string,
      maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: false,
  callbacks: {
    async signIn({ account, profile }) {
      console.log("signIn callback triggered")
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)
      if (account?.provider === "google" || account?.provider === "github") {
        console.log("Starting Google sign-in with profile:", profile)
        try {
          // Check if user exists in your database
          const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${profile?.sub}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
          })
          if(!user) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: profile?.email,
                name: profile?.name,
                picture: profile?.image,
                googleId: profile?.sub,
              }),
            })
            console.log("Response status for Google sign-in:", response.status)
            if (!response.ok)  return false
          }
          return true
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        // After successful sign in, make a call to your backend to get any additional user data
        try {
          const session = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            userId: user.id,
            sessionToken: token,
            }),
          });
          console.log("Session data created:", session)
        } catch (error) {
          console.error("Error on create session:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          email: token.email,
          name: token.name,
          role: token.role as string,
          accessToken: token.accessToken as string,
        },
      }
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log(account, profile)
      // You can log sign-ins or perform additional actions here
      console.log("User signed in:", user.email)
    },
    async signOut({ session, token }) {
      console.log(session, token)
      // Clean up any necessary session data
      console.log("User signed out")
    },
  },
};