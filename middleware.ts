import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCanonicalHostRedirectUrl } from "@/lib/seo/canonical-host";

export function middleware(request: NextRequest) {
  const canonicalRedirect = getCanonicalHostRedirectUrl(request);
  if (canonicalRedirect) {
    return NextResponse.redirect(canonicalRedirect, 308);
  }

  const hostname = request.headers.get("host") || "";
  const response = NextResponse.next();
  response.headers.set("x-domain", hostname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
