'use client'

import {DbConnection} from '@/module_bindings';
import {onConnect, onConnectError, onDisconnect} from "@/utils/spacetimedb/connectionHandlers";

let singletonConnection: DbConnection | null = null;

export const getDbConnection = (): DbConnection => {
  const isSSR = typeof window === 'undefined';
  if (isSSR) {
    throw new Error('Cannot use SpacetimeDB on the server.');
  }

  if (singletonConnection) {
    return singletonConnection;
  }

  singletonConnection = buildDbConnection()
  return singletonConnection;
};

const buildDbConnection = () => {
  console.log('[SpacetimeDB] Building connection...');
  return DbConnection.builder()
  .withUri('ws://localhost:3000')
  .withModuleName('weekly-review-ui')
  .withToken(getAuthToken())
  .onConnect(onConnect)
  .onDisconnect(onDisconnect)
  .onConnectError(onConnectError)
  .build();
}

const getAuthToken = () => {
  const token = localStorage.getItem('auth_token');
  if(token)
    return token;
   return "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBZOVd1SEJPcHdxcEJXejRPRF9xZyJ9.eyJnaXZlbl9uYW1lIjoiVGhlb2RvciIsImZhbWlseV9uYW1lIjoiUmlzYWdlciIsIm5pY2tuYW1lIjoidGhlb2RvcjM0OSIsIm5hbWUiOiJUaGVvZG9yIFJpc2FnZXIgKHRoZW9kb3IzNDkpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pwTVVZR0hqaUxJNXRvWWNNZmIyUEJjQUN0X2pBR0hrMFlNQ1ZuZDBvRlpQaE9Tc09WQ0E9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNi0yOVQxMDozMjozMy4wMzlaIiwiZW1haWwiOiJ0aGVvZG9yMzQ5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1qN3RmdnEzNW9oaXhtNHlzLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJxdWhYMExjZEV3VGx1dlQzek1EYzFaNWN3SDU1QjZ5cSIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE4MDQzODk4NTY3OTA5NDI2NDY1IiwiaWF0IjoxNzUxMTkzMTUzLCJleHAiOjE3NTEyMjkxNTMsInNpZCI6IlpFYlV4Sm5QMDFrd24tcnFvWVIwcUdESzlsOVJQcGhQIiwibm9uY2UiOiI5cW5RYVVtc3dJeXl0bTlzZTdmV3gzcU1lTHd6S3QtYjJBdVdYQ2RNblM4In0.L_a__UT7tlhAa5rne8PjENP9qnVntDVDUOXWrwnRvPmngfsAfsdHp2OgOAlKE_uNxc4uF2Qj8DKgEUCs818aEkaGzEsU4irHSdfOQWGDgkm25x8XUwMi_4iCSJ8ztOquAGVEZ89i6EG9eals_uS4NQHnUvExq_C3E46tGDwDlgjbJwTpwM-YddSTnaHDzvs7OrGWHZQdz_sfIPj0q-cmyfmR4kHwgwjQe8gRslLswCde1fjE9GXY1wpHRrWyASdRqP32_tdzM9Dg67-p17Jcjo4nD6mgHH4jpRYxDIvzuoFpsQq4xyxgtAOHhA2H8H0lA1_teZ4b2yPCfeA";
}