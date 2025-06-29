'use client'

import {useActivities} from "@/hooks/useActivities";

export  default function ActivityList() {
  console.log('Rendering ActivityList');
  const allActivities = useActivities();

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