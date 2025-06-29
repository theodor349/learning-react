'use client'

import {useCategories} from "@/hooks/useCategories";

export  default function CategoryList() {
  const allCategories = useCategories();

  return (
    <div>
      <h1 className={"text-xl font-bold"}>Categories</h1>
      {allCategories.map(categories => (
        <div key={categories.id}>
          {categories.name}
        </div>
      ))}
    </div>
  );
}