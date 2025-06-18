'use client'

import { DataTable } from "./components/dataTable";
import { columns } from "./activityColumns";
import { activities } from "@/app/activities/data";

export default function ActivityPage() {
  return (
    <div className="container mx-auto md:py-6">
      <DataTable
        data={activities} 
        columns={columns} 
        pageSize={10}
      />
    </div>
  );
}
