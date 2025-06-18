'use client'

import { DataTable } from "./components/dataTable";
import { columns } from "./categoryColumns";
import { categories } from "@/app/categories/data";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto md:py-6">
      <DataTable
        data={categories} 
        columns={columns} 
        pageSize={10}
      />
    </div>
  );
}