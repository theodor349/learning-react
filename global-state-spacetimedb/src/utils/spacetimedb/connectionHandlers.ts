import {
  DbConnection,
  type ErrorContext,
  RemoteReducers,
  RemoteTables,
  SetReducerFlags
} from '@/module_bindings';
import { ErrorContextInterface, Identity } from '@clockworklabs/spacetimedb-sdk';
import {
  connectionStatus,
  notifyConnectionDisconnected, notifyConnectionError,
  notifyConnectionEstablished
} from "@/utils/spacetimedb/connectionEvents";
import {subscriptions} from "@/utils/spacetimedb/subscriptions";
import {
  notifySubscriptionApplied,
  notifySubscriptionError
} from "@/utils/spacetimedb/subscriptionEvents";


export const subscribeToQueries = (conn: DbConnection, queries: string[]) => {
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
    notifySubscriptionError();
  })
  .subscribe(queries);
};

export const onConnect = (
  conn: DbConnection,
  identity: Identity,
  token: string) => {
  console.log('[SpacetimeDB] Connection established.');
  connectionStatus.isConnected = true;
  connectionStatus.error = null;
  connectionStatus.identity = identity;
  localStorage.setItem('auth_token', token);

  notifyConnectionEstablished();
  subscribeToQueries(conn, subscriptions)
};

export const onDisconnect = () => {
  console.warn('[SpacetimeDB] Disconnected.');
  connectionStatus.isConnected = false;
  connectionStatus.isSubscribed = false;
  notifyConnectionDisconnected();
};

export const onConnectError = (ctx: ErrorContext, error: Error) => {
  console.error('[SpacetimeDB] Connection Error:', error);
  connectionStatus.isConnected = false;
  connectionStatus.isSubscribed = false;
  connectionStatus.error = error;
  notifyConnectionError();
};