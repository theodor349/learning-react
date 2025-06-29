'use client'

import {useActivities} from "@/hooks/useActivities";

export  default function ActivityList() {
  const allActivities = useActivities();

  return (
    <div>
      {allActivities.map(activity => (
        <div key={activity.id}>
          {activity.name}
        </div>
      ))}
    </div>
  );
}