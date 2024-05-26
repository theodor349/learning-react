import FlipCard from "@/components/flipCard/flipCard";
import React from 'react'

type Props = {}

export default function page({}: Props) {
  const activeCard: AnkiCard = {
    deckTitle: "Architectural Smells",
    question: "What is a 'Golden hammer'?", 
    answer: "This smell occurs when familiar technologies are used as solutions to every problem."
  };


  return (
    <>
      <FlipCard { ... activeCard } />
    </>
  )
}


type AnkiCard = {
  deckTitle: string
  question: string
  answer: string
}