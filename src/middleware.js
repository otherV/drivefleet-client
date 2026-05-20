import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";

const protectedRoutes = ["/add-car", "/my-bookings", "/my-cars"];
const authRoutes = ["/login", "/register"];

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtected && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/add-car", "/my-bookings", "/my-cars", "/login", "/register"],
};