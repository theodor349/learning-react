import { NextResponse } from 'next/server';
import {auth0} from "@/lib/auth/auth";

export const GET = async function token() {
  const session = await auth0.getSession();

  if (!session?.user) {
    // The user is not authenticated
    return new Response(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const accessToken = session?.tokenSet.idToken;
    if (!accessToken) {
      return new Response(JSON.stringify({ error: 'Access Token not found' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return NextResponse.json({ accessToken });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.status || 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};