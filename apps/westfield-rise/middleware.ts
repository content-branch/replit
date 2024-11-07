import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // console.log(
  //   `cooke present: ${request.cookies.get('__prerender_bypass')?.value}`,
  // );
  // console.log(
  //   `cooke present: ${
  //     request.cookies.get('__prerender_bypass')?.value == undefined
  //   }`,
  // );

  if (
    request.nextUrl.pathname.startsWith('/_next') == false &&
      request.nextUrl.pathname.startsWith('/js') == false &&
      request.nextUrl.pathname.startsWith('/fonts') == false &&
      request.nextUrl.pathname.startsWith('/img') == false && 
      request.nextUrl.pathname.startsWith('/api/preview') == false &&
      request.nextUrl.pathname.startsWith('/favicon') == false &&

    request.headers.get('X-Preview-Mode') === 'true' &&
    request.cookies.get('__prerender_bypass')?.value == undefined
  ) {
    return NextResponse.redirect(`${request.nextUrl.href}api/preview?path=${request.url}`);
  }

  return response;
}
