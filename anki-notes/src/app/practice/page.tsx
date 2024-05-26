import FlipCard from "@/components/flipCard/flipCard";
import React from 'react'

type Props = {}

var b: boolean = false;

export default async function page({}: Props) {
  const activeCard: AnkiCard = await GetNextCard();

  return (
    <>
      <FlipCard { ... activeCard } />
    </>
  )
}

function GetNextCard(): AnkiCard {
    b = !b;
    if(b){
    return {
      deckTitle: "Architectural Smells",
      question: "What is a 'Golden hammer'?", 
      answer: "This smell occurs when familiar technologies are used as solutions to every problem."
    };
  }
  else {
    return {
      deckTitle: "Architectural Smells",
      question: "What is a 'Bottleneck service'?", 
      answer: "This smell occurs when a service is highly used (high incoming and outgoing coupling) by other services."
    };
  }
}


type AnkiCard = {
  deckTitle: string
  question: string
  answer: string
}