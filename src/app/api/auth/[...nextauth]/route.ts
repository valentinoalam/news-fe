import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHub from 'next-auth/providers/github';

export const {
  // handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHub({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // JWT is used here, but you can also use "database" for session-based auth
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      if (session?.user) {
        user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});
