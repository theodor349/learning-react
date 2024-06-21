"use server";

import { revalidatePath } from "next/cache";
// import PocketBase from "pocketbase"

type AnkiCard = {
  id: string
  question: string
  answer: string
}

export async function handleCorrect(card: AnkiCard) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  // const pb = new PocketBase('http://127.0.0.1:8090');
  // await pb.collection('cards').update(card.id, { nextPractice: date });

  revalidatePath(`/practice`);
}

export async function handleWrong(card: AnkiCard) {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  // const pb = new PocketBase('http://127.0.0.1:8090');
  // await pb.collection('cards').update(card.id, { nextPractice: date });

  revalidatePath(`/practice`);
}