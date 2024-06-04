import Practice from "@/app/practice/page";

export default function Home() {
  return (
    <Practice/>
  );
}

type AnkiCard = {
  deckTitle: string
  question: string
  answer: string
}