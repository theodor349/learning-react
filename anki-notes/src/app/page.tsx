import Practice from "@/app/practice/page";

export default function Home() {
  return (
    <h1>Welcome to the Teaching Flipper app</h1>
  );
}

type AnkiCard = {
  deckTitle: string
  question: string
  answer: string
}