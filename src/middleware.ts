import { NextResponse, type NextRequest } from "next/server";

const locales = ["en-us", "zh-tw", "zh-cn"];
const defaultLocale = "zh-tw";

function getLocaleCookie(request: NextRequest): string {
  const cookie = request.headers.get("cookie");

  if (cookie) {
    const langCookie = cookie
      .split(";")
      .find((c) => c.trim().startsWith("lang="));

    if (langCookie) {
      return langCookie.split("=")[1];
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPathname = pathname.toLowerCase();

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) =>
      lowerPathname.startsWith(`/${locale}/`) || lowerPathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get locale from cookie
  const locale = getLocaleCookie(request);

  // Redirect if there is no locale in the pathname
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|images).*)",
  ],
};
