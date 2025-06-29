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
export const getDbConnection = (): DbConnection | null => {
  // 1. Guard against running on the Server (SSR)
  // The builder uses `localStorage`, which only exists in the browser.
  if (typeof window === 'undefined') {
    return null;
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
    .withToken(localStorage.getItem('auth_token') || undefined)
    .onConnect(onConnect)
    .onDisconnect(onDisconnect)
    .onConnectError(onConnectError)
    .build();

  return singletonConnection;
};