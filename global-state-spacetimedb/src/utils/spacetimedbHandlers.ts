import {
  DbConnection,
  type ErrorContext,
  RemoteReducers,
  RemoteTables,
  SetReducerFlags
} from '@/module_bindings';
import { ErrorContextInterface, Identity } from '@clockworklabs/spacetimedb-sdk';

export interface ConnectionStatus {
  isConnected: boolean;
  isSubscribed: boolean;
  error: Error | null;
  identity: Identity | null;
}

export const createConnectionHandlers = (
  connectionStatus: ConnectionStatus,
  notifyConnectionEstablished: () => void,
  notifySubscriptionApplied: () => void
) => {

  const subscribeToQueries = (conn: DbConnection, queries: string[]) => {
    conn
    ?.subscriptionBuilder()
    .onApplied(() => {
      console.log('[SpacetimeDB] Subscribed to queries.');
      connectionStatus.isSubscribed = true;
      notifySubscriptionApplied();
    })
    .onError((ctx: ErrorContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>) => {
      console.error('[SpacetimeDB] Error subscribing to SpacetimeDB ' + ctx.event)
      connectionStatus.isSubscribed = false;
    })
    .subscribe(queries);
  };

  const onConnect = (
    conn: DbConnection,
    identity: Identity,
    token: string) => {
    console.log('[SpacetimeDB] Connection established.');
    connectionStatus.isConnected = true;
    connectionStatus.error = null;
    connectionStatus.identity = identity;
    localStorage.setItem('auth_token', token);

    notifyConnectionEstablished();

    subscribeToQueries(conn, ['SELECT * FROM Activity'])
  };

  const onDisconnect = () => {
    console.warn('[SpacetimeDB] Disconnected.');
    connectionStatus.isConnected = false;
    connectionStatus.isSubscribed = false;
  };

  const onConnectError = (ctx: ErrorContext, error: Error) => {
    console.error('[SpacetimeDB] Connection Error:', error);
    connectionStatus.isConnected = false;
    connectionStatus.isSubscribed = false;
    connectionStatus.error = error;
  };

  return { onConnect, onDisconnect, onConnectError, subscribeToQueries };
};