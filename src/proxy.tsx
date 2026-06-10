import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const { pathname } = request.nextUrl;
    const isAdmin = session.user.admin === true;
    const isLocalBin = session.user.localBin === true;

    if (pathname.startsWith("/admin")) {
        if (isAdmin) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname.startsWith("/local")) {
        if (isAdmin || isLocalBin) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/local/:path*"],
};