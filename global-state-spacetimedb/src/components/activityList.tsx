'use client'

import {useActivities} from "@/hooks/useActivities";
import {useConnection} from "@/hooks/useConnection";

export  default function ActivityList() {
  const connection = useConnection();
  const allActivities = useActivities();

  if(connection.error)
    return <div>Error: {connection.error.message}</div>;

  if(!connection.isConnected)
    return <div>Not connected</div>;

  return (
    <div>
      <h1 className={"text-xl font-bold"}>Activities</h1>
      {allActivities.map(activity => (
        <div key={activity.id}>
          {activity.name}
        </div>
      ))}
    </div>
  );
}