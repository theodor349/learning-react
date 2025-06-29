import { DbConnection, type ErrorContext, type EventContext } from '@/module_bindings';
import { Identity } from '@clockworklabs/spacetimedb-sdk';

// This variable will hold our single connection object once created.
// It lives in the module scope, so it persists across the app.
let singletonConnection: DbConnection | null = null;

// You can also export a reactive state object if your UI needs
// to know the connection status globally.
export const connectionStatus = {
  isConnected: false,
  error: null as Error | null,
};

// --- This is the main function your app will use ---
export const getDbConnection = (): DbConnection => {
  // 1. Guard against running on the Server (SSR)
  // The builder uses `localStorage`, which only exists in the browser.
  if (typeof window === 'undefined') {
    throw new Error('Cannot use SpacetimeDB on the Server (SSR).');
  }

  // 2. If the connection already exists, return it immediately.
  // This is the core of the singleton pattern.
  if (singletonConnection) {
    return singletonConnection;
  }

  // 3. If it doesn't exist, define the handlers for the builder.
  const onConnect = () => {
    console.log('[SpacetimeDB] Connection established.');
    connectionStatus.isConnected = true;
    connectionStatus.error = null;
  };

  const onDisconnect = () => {
    console.warn('[SpacetimeDB] Disconnected.');
    connectionStatus.isConnected = false;
  };

  const onConnectError = (ctx: ErrorContext, error: Error) => {
    console.error('[SpacetimeDB] Connection Error:', error);
    connectionStatus.isConnected = false;
    connectionStatus.error = error;
  };

  // 4. Use the builder pattern to create and save the new instance.
  // This code will only run ONCE in the application's lifecycle.
  console.log('[SpacetimeDB] Building connection...');
  singletonConnection = DbConnection.builder()
    .withUri('ws://localhost:3000')
    .withModuleName('weekly-review-ui')
    .withToken(localStorage.getItem('auth_token') || "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlBZOVd1SEJPcHdxcEJXejRPRF9xZyJ9.eyJnaXZlbl9uYW1lIjoiVGhlb2RvciIsImZhbWlseV9uYW1lIjoiUmlzYWdlciIsIm5pY2tuYW1lIjoidGhlb2RvcjM0OSIsIm5hbWUiOiJUaGVvZG9yIFJpc2FnZXIgKHRoZW9kb3IzNDkpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pwTVVZR0hqaUxJNXRvWWNNZmIyUEJjQUN0X2pBR0hrMFlNQ1ZuZDBvRlpQaE9Tc09WQ0E9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNi0yOVQxMDozMjozMy4wMzlaIiwiZW1haWwiOiJ0aGVvZG9yMzQ5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1qN3RmdnEzNW9oaXhtNHlzLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJxdWhYMExjZEV3VGx1dlQzek1EYzFaNWN3SDU1QjZ5cSIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE4MDQzODk4NTY3OTA5NDI2NDY1IiwiaWF0IjoxNzUxMTkzMTUzLCJleHAiOjE3NTEyMjkxNTMsInNpZCI6IlpFYlV4Sm5QMDFrd24tcnFvWVIwcUdESzlsOVJQcGhQIiwibm9uY2UiOiI5cW5RYVVtc3dJeXl0bTlzZTdmV3gzcU1lTHd6S3QtYjJBdVdYQ2RNblM4In0.L_a__UT7tlhAa5rne8PjENP9qnVntDVDUOXWrwnRvPmngfsAfsdHp2OgOAlKE_uNxc4uF2Qj8DKgEUCs818aEkaGzEsU4irHSdfOQWGDgkm25x8XUwMi_4iCSJ8ztOquAGVEZ89i6EG9eals_uS4NQHpAUOH1kHNvExq_C3E46tGDwDlgjbJwTpwM-YddSTnaHDzvs7OrGWHZQdz_sfIPj0q-cmyfmR4kHwgwjQe8gRslLswCde1fjE9GXY1wpHRrWyASdRqP32_tdzM9Dg67-p17Jcjo4nD6mgHH4jpRYxDIvzuoFpsQq4xyxgtAOHhA2H8H0lA1_teZ4b2yPCfeA")
    .onConnect(onConnect)
    .onDisconnect(onDisconnect)
    .onConnectError(onConnectError)
    .build();

  return singletonConnection;
};