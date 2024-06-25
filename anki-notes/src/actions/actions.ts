"use server";

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from "next/cache";
import { Deck, Card, Practice } from '@prisma/client'
import { PrismaClient } from "@prisma/client"

async function updatePractice(prisma: PrismaClient, card: Card, practice: Practice, successLevel: number) {
  const date = new Date();

  await prisma.practice.update({
    where: { id: practice.id },
    data: { 
      practiced: true,
      practicedAt: date,
      streak: practice.streak + 1,
      successLevel: successLevel
     }
  });
}

async function createNewPractice(prisma: PrismaClient, practice: Practice, streak: number) {
  const daysToAdd = Math.pow(streak, 1.42);
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd)

  console.log("Days to add: " + daysToAdd)
  console.log("New date: " + date)

  await prisma.practice.create({data: {
    userId: practice.userId,
    cardId: practice.cardId,
    nextPractice: date,
    streak: streak,
  }})
}

export async function handleCorrect(card: Card, practice: Practice) {
  const prisma = new PrismaClient();
  await updatePractice(prisma, card, practice, 1);
  await createNewPractice(prisma, practice, practice.streak + 1);
  revalidatePath(`/practice`);
}

export async function handleWrong(card: Card, practice: Practice) {
  const prisma = new PrismaClient();
  await updatePractice(prisma, card, practice, 0);
  await createNewPractice(prisma, practice, 0);
  revalidatePath(`/practice`);
}

export async function createDeck(formData: FormData) {
  if(!formData.get("name") || !formData.get("description")) 
    return console.error("Missing name or description");
  if(formData.get("name") === "" || formData.get("description") === "")
    return console.error("Name or description cannot be empty");


  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});

  await prisma.deck.create({data: {
      userId: userId,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }
  });
  revalidatePath(`/deck`);
}

export async function updateDeck(formData: FormData, deck: Deck) {
  if(!formData.get("name") || !formData.get("description")) 
    return console.error("Missing name or description");
  if(formData.get("name") === "" || formData.get("description") === "")
    return console.error("Name or description cannot be empty");


  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const serverDeck = await prisma.deck.findUnique({where: {id: deck.id}}).then((res) => {return res});
  if(!serverDeck) return console.error("Deck not found");
  if(serverDeck?.userId !== userId) return console.error("Unauthorized");

  await prisma.deck.update({where: {id: deck.id}, data: {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
  }});
  revalidatePath(`/deck`);
}

export async function editCard(formData: FormData, card: Card) {
  if(!formData.get("front") || !formData.get("back")) 
    return console.error("Missing front or back");
  if(formData.get("front") === "" || formData.get("back") === "")
    return console.error("Front or back cannot be empty");

  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const serverCard = await prisma.card.findUnique({where: {id: card.id}}).then((res) => {return res});
  if(serverCard?.userId !== userId) return console.error("Unauthorized");

  await prisma.card.update({where: {id: card.id}, data: {
    front: formData.get("front") as string,
    back: formData.get("back") as string,
  }});

  revalidatePath(`/card/${card.id}`);
}

export async function createCard(formData: FormData, deck: Deck) {
  if(!formData.get("front") || !formData.get("back")) 
    return console.error("Missing front or back");
  if(formData.get("front") === "" || formData.get("back") === "")
    return console.error("Front or back cannot be empty");


  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const serverDeck = await prisma.deck.findUnique({where: {id: deck.id}}).then((res) => {return res});
  if(serverDeck?.userId !== userId) return console.error("Unauthorized");

  const card = await prisma.card.create({ data: {
    deckId: serverDeck.id,
    userId: userId,
    front: formData.get("front") as string,
    back: formData.get("back") as string,
  }})

  await prisma.practice.create({ data: {
    userId: userId,
    cardId: card.id,
    nextPractice: new Date(),
    streak: 0,
  }})
  revalidatePath(`/deck/${deck.id}`);
}