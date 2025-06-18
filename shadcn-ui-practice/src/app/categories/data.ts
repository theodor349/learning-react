export interface Category {
  id: string;
  name: string;
  sortOrder: number;
  color: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Work",
    sortOrder: 1,
    color: "#FF5733"
  },
  {
    id: "2",
    name: "Personal",
    sortOrder: 2,
    color: "#33FF57"
  },
  {
    id: "3",
    name: "Study",
    sortOrder: 3,
    color: "#3357FF"
  },
  {
    id: "4",
    name: "Health",
    sortOrder: 4,
    color: "#F3FF33"
  },
  {
    id: "5",
    name: "Finance",
    sortOrder: 5,
    color: "#FF33F6"
  },
  {
    id: "6",
    name: "Social",
    sortOrder: 6,
    color: "#33FFF1"
  },
  {
    id: "7",
    name: "Errands",
    sortOrder: 7,
    color: "#FF9933"
  }
];
