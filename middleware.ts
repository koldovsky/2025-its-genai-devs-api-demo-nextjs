import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  
  // Handle forwarded host from Codespaces/proxies
  const forwardedHost = requestHeaders.get('x-forwarded-host');
  const forwardedProto = requestHeaders.get('x-forwarded-proto');
  
  if (forwardedHost) {
    requestHeaders.set('host', forwardedHost);
    
    // Set origin to match the forwarded host for Server Actions
    const origin = requestHeaders.get('origin');
    if (origin && origin.includes('localhost')) {
      const protocol = forwardedProto || 'https';
      requestHeaders.set('origin', `${protocol}://${forwardedHost}`);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
