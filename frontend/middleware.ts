import { withAuth } from "next-auth/middleware";
import router from "next/navigation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// middleware is applied to all routes, use conditionals to select

// Receiving this in token
interface Token {
  name: string;
  email: string;
  accessToken: string;
  role: string[];
}

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (req.nextUrl.pathname.startsWith("/") && token === null) {
//         return false;
//       }
//       if (req.nextUrl.pathname.startsWith("/admin")) {
//         if ((token as any).roles.includes("ADMIN")) return true;
//         NextResponse.redirect(new URL('/', req.url))
//         return false;
//       }
//       return true;
//     },
//   },
// });

export { default } from "next-auth/middleware";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("🚀 ~ file: middleware.ts:37 ~ middleware ~ token:", token)

  if (
    request.nextUrl.pathname.startsWith("/") &&
    !token
  ) {
    return NextResponse.redirect(`${baseURL}/api/auth/signin`);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if ((token as any).role.includes("ADMIN")) return NextResponse.next();
    return NextResponse.redirect(`${baseURL}/`);
  }
}


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};