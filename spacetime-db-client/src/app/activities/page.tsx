'use client'

import React, { useEffect, useState } from 'react';
import { DbConnection, type ErrorContext, type EventContext, Activity } from '@/module_bindings';
import {Identity, Timestamp} from "@clockworklabs/spacetimedb-sdk";
import {useUser} from "@auth0/nextjs-auth0";
import {redirect} from "next/navigation";

function useActivities(conn: DbConnection | null): Activity[] {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!conn) return;
    const onInsert = (_ctx: EventContext, activity: Activity) => {
      setActivities(prev => [...prev, activity]);
    };
    conn.db.activity.onInsert(onInsert);

    const onDelete = (_ctx: EventContext, activity: Activity) => {
      setActivities(prev =>
        prev.filter(m => m.id !== activity.id)
      );
    };
    conn.db.activity.onDelete(onDelete);

    return () => {
      conn.db.activity.removeOnInsert(onInsert);
      conn.db.activity.removeOnDelete(onDelete);
    };
  }, [conn]);

  return activities;
}

export default function Activities() {
  const { user, isLoading} = useUser();

  const [newMessage, setNewMessage] = useState('');

  const [connected, setConnected] = useState<boolean>(false);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [conn, setConn] = useState<DbConnection | null>(null);

  useEffect(() => {
    console.log("Connecting to SpacetimeDB...");
    if (!user) return;
    console.log("User found:", user);

      const subscribeToQueries = (conn: DbConnection, queries: string[]) => {
        conn
        ?.subscriptionBuilder()
        .onApplied(() => {
          console.log('SDK client cache initialized.');
        })
        .subscribe(queries);
      };

      const onConnect = (
        conn: DbConnection,
        identity: Identity,
        token: string
      ) => {
        setIdentity(identity);
        setConnected(true);
        localStorage.setItem('auth_token', token);
        console.log(
          'Connected to SpacetimeDB with identity:',
          identity.toHexString()
        );

        subscribeToQueries(conn, ['SELECT * FROM Activity']);
      };

      const onDisconnect = () => {
        console.log('Disconnected from SpacetimeDB');
        setConnected(false);
      };

      const onConnectError = (_ctx: ErrorContext, err: Error) => {
        console.log('Error connecting to SpacetimeDB:', err);
      };

      console.log("Connecting with sub: ", user.sub);
      setConn(
        DbConnection.builder()
        .withUri('ws://localhost:3000')
        .withModuleName('weekly-review-ui')
        .withToken()
        .onConnect(onConnect)
        .onDisconnect(onDisconnect)
        .onConnectError(onConnectError)
        .build()
      );
  }, [isLoading]);


  const activities = useActivities(conn);

  if (isLoading) {
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user)
    redirect("/")

  if (!conn || !connected || !identity) {
    return (
      <div className="App">
        <h1>Connecting...</h1>
      </div>
    );
  }

  const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewMessage("");
    const date = Timestamp.now()
    conn.reducers.logEntry(date, date, [newMessage]);
  };

  return (
    <>
      <h1>Activities</h1>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            {activity.name}
          </li>
        ))}
      </ul>
      <div className="new-message">
        <form
          onSubmit={onMessageSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '0 auto',
          }}
        >
          <h3>New Message</h3>
          <textarea
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
