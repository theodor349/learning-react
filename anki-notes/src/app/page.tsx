import FlipCard from "@/components/flipCard/flipCard";
import { cn } from "@/lib/utils"

export default function Home() {
  const cards: AnkiCard[] = [ 
    {
      deckTitle: "Architectural Smells 1",
      question: "What is a 'Golden hammer'? 1", 
      answer: "This smell occurs when familiar technologies are used as solutions to every problem. 1"
    },
  ]

  return (
    <FlipCard { ... cards[0] } />
  );
}

type AnkiCard = {
  deckTitle: string
  question: string
  answer: string
}