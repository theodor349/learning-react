import FlipCard from "@/components/flipCard/flipCard";
import React from 'react'
import PocketBase from 'pocketbase';

type Props = {}

export default async function page({}: Props) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const date = new Date();
  const filter = `nextPractice<'${date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "T00:00:00.000Z"}'`;
  console.log("Filter: " + filter);
  const card = await pb.collection('cards').getFirstListItem<AnkiCard>(filter);
  console.log(card);
  return (
    <>
      <FlipCard { ... card} />
    </>
  )
}

type AnkiCard = {
  id: string
  question: string
  answer: string
}