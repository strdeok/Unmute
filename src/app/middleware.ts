import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // if(request.nextUrl.pathname === "/home")
  // return NextResponse.redirect(new URL("/home", request.url));
  // 동영상 비구매시 구매 페이지로 리디렉션  
}