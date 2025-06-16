interface Identity {
  id: string;
}

interface Activity {
  id: number;
  name: string;
  normalisedName: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  normalisedName: string;
  hexColor: string;
  sortOrder: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "",
    normalisedName: "",
    hexColor: "#FFFFFF",
    sortOrder: 0
  },
  {
    id: 2,
    name: "Wellness",
    normalisedName: "wellness",
    hexColor: "#33FF57",
    sortOrder: 2
  },
  {
    id: 3,
    name: "Sports",
    normalisedName: "sports",
    hexColor: "#3357FF",
    sortOrder: 3
  }
];

const activities: Activity[] = [
  {
    id: 1,
    name: "Morning Jog",
    normalisedName: "morning-jog",
    category: categories[0] // Fitness
  },
  {
    id: 2,
    name: "Yoga Session",
    normalisedName: "yoga-session",
    category: categories[1] // Wellness
  },
  {
    id: 3,
    name: "Swimming",
    normalisedName: "swimming",
    category: categories[0] // Fitness
  },
  {
    id: 4,
    name: "Meditation",
    normalisedName: "meditation",
    category: categories[1] // Wellness
  },
  {
    id: 5,
    name: "Weight Training",
    normalisedName: "weight-training",
    category: categories[0] // Fitness
  },
  {
    id: 6,
    name: "Basketball",
    normalisedName: "basketball",
    category: categories[2] // Sports
  },
  {
    id: 7,
    name: "Mindfulness",
    normalisedName: "mindfulness",
    category: categories[1] // Wellness
  },
  {
    id: 8,
    name: "Tennis",
    normalisedName: "tennis",
    category: categories[2] // Sports
  },
  {
    id: 9,
    name: "HIIT Workout",
    normalisedName: "hiit-workout",
    category: categories[0] // Fitness
  },
  {
    id: 10,
    name: "Soccer",
    normalisedName: "soccer",
    category: categories[2] // Sports
  }
]

export default function Home() {
  return (
    <div className={"flex flex-col flex-grow"}>
    </div>
  );
}
