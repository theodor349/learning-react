const categories: Category[] = [
  {
    id: 1,
    name: "Fitness",
    normalisedName: "fitness",
    hexColor: "#FF5733",
    sortOrder: 1
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
  },
  {
    id: 4,
    name: "Outdoor",
    normalisedName: "outdoor",
    hexColor: "#FFA500",
    sortOrder: 4
  },
  {
    id: 5,
    name: "Arts",
    normalisedName: "arts",
    hexColor: "#800080",
    sortOrder: 5
  },
  {
    id: 6,
    name: "Learning",
    normalisedName: "learning",
    hexColor: "#008080",
    sortOrder: 6
  },
  {
    id: 7,
    name: "Social",
    normalisedName: "social",
    hexColor: "#FF1493",
    sortOrder: 7
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
  },
  {
    id: 11,
    name: "Hiking",
    normalisedName: "hiking",
    category: categories[3] // Outdoor
  },
  {
    id: 12,
    name: "Painting",
    normalisedName: "painting",
    category: categories[4] // Arts
  },
  {
    id: 13,
    name: "Online Course",
    normalisedName: "online-course",
    category: categories[5] // Learning
  },
  {
    id: 14,
    name: "Book Club",
    normalisedName: "book-club",
    category: categories[6] // Social
  },
  {
    id: 15,
    name: "Mountain Biking",
    normalisedName: "mountain-biking",
    category: categories[3] // Outdoor
  },
  {
    id: 16,
    name: "Photography",
    normalisedName: "photography",
    category: categories[4] // Arts
  },
  {
    id: 17,
    name: "Language Learning",
    normalisedName: "language-learning",
    category: categories[5] // Learning
  },
  {
    id: 18,
    name: "Dinner Party",
    normalisedName: "dinner-party",
    category: categories[6] // Social
  },
  {
    id: 19,
    name: "Pilates",
    normalisedName: "pilates",
    category: categories[0] // Fitness
  },
  {
    id: 20,
    name: "Aromatherapy",
    normalisedName: "aromatherapy",
    category: categories[1] // Wellness
  },
  {
    id: 21,
    name: "Volleyball",
    normalisedName: "volleyball",
    category: categories[2] // Sports
  },
  {
    id: 22,
    name: "Camping",
    normalisedName: "camping",
    category: categories[3] // Outdoor
  },
  {
    id: 23,
    name: "Pottery",
    normalisedName: "pottery",
    category: categories[4] // Arts
  },
  {
    id: 24,
    name: "Coding Workshop",
    normalisedName: "coding-workshop",
    category: categories[5] // Learning
  },
  {
    id: 25,
    name: "Game Night",
    normalisedName: "game-night",
    category: categories[6] // Social
  },
  {
    id: 26,
    name: "CrossFit",
    normalisedName: "crossfit",
    category: categories[0] // Fitness
  },
  {
    id: 27,
    name: "Sound Bath",
    normalisedName: "sound-bath",
    category: categories[1] // Wellness
  },
  {
    id: 28,
    name: "Rock Climbing",
    normalisedName: "rock-climbing",
    category: categories[3] // Outdoor
  },
  {
    id: 29,
    name: "Creative Writing",
    normalisedName: "creative-writing",
    category: categories[4] // Arts
  },
  {
    id: 30,
    name: "Volunteer Work",
    normalisedName: "volunteer-work",
    category: categories[6] // Social
  }
]

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Activity = {
  id: number;
  name: string;
  normalisedName: string;
  category: Category;
}

type Category = {
  id: number;
  name: string;
  normalisedName: string;
  hexColor: string;
  sortOrder: number;
}

export {activities, categories};
export type { Activity, Category };
