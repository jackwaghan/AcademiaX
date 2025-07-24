import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

async function verifyUser(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
