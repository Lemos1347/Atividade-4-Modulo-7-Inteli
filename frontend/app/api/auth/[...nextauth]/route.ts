import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        console.log(
          "🚀 ~ file: route.ts:22 ~ authorize ~ credentials:",
          credentials
        );

        console.log(
          "🚀 ~ file: route.ts:27 ~ authorize ~ API_URL:",
          process.env.API_URL
        );
        const { email, password } = credentials as Credentials;
        try {
          const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.status === 200) {
            const jsonResponse = await response.json();
            console.log(
              "🚀 ~ file: route.ts:34 ~ authorize ~ jsonResponse:",
              jsonResponse
            );

            const user_response = await fetch(`${process.env.API_URL}/user/`, {
              method: "GET",
              cache: "no-cache",
              headers: {
                Authorization: `Bearer ${jsonResponse.access_token}`,
              },
            });
            console.log(
              "🚀 ~ file: route.ts:43 ~ authorize ~ user_response:",
              user_response
            );

            if (user_response.status === 200) {
              const { user } = await user_response.json();
              console.log("🚀 ~ file: route.ts:47 ~ authorize ~ user:", user);

              return {
                ...jsonResponse,
                name: user.name,
                email: user.email,
                // TODO:
                role: user.role,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (e) {
          console.log(
            "🚀 ~ file: route.ts:60 ~ authorize ~ e:",
            (e as any).message
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // user is what comes from the authorize function
    // token is what we utilyze in react to authenticate
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.accessToken = user.access_token;
        token = { ...token, role: (user as any).role };
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (token != null) {
        session.accessToken = token.accessToken;
      }
      return session;
      // // @ts-ignore
      // let updatedSession;
      // await fetch("http://localhost:3001/user/", {
      //   method: "GET",
      //   cache: "no-cache",
      //   // @ts-ignore
      //   headers: {
      //     Authorization: `Bearer ${token.accessToken}`,
      //   },
      // })
      //   .then((res) => {
      //     console.log("RES: ", res.status);
      //     if (res.status === 200) {
      //       updatedSession = {
      //         ...session,
      //         accessToken: token.accessToken,
      //       };
      //       // session.accessToken = token.accessToken;
      //     } else {
      //       updatedSession = {};
      //     }
      //   })
      //   .catch((e) => {
      //     updatedSession = {};
      //   });
      // return updatedSession;
    },
  },
  session: {
    maxAge: 60 * 60 * 2, // A sessão expirará após 2 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
