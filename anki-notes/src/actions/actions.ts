"use server";

import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from "next/cache";
import { Card, Practice } from '@prisma/client'
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
  console.log(formData);
  console.log();
  console.log(formData.get("test"));
  // revalidatePath(`/deck`);
}