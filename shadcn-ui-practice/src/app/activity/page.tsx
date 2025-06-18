'use client'

import {ActivityDataTable} from "./activityDataTable";
import {columns} from "./activityColumns";
import {activities} from "@/app/activity/data";

export default function Home() {
  return (
    <div className={"flex-grow md:pt-2"}>
      <ActivityDataTable data={activities} key={"activity-data-table"} columns={columns} />
    </div>
  );
}
