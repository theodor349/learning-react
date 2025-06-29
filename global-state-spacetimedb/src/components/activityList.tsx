import {useActivities} from "@/hooks/useActivities";

function ActivityList() {
  // 1. Get the live array of players.
  // This component will only re-render if the list of players changes.
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