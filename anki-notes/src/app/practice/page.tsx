export const dynamic = 'force-dynamic'

import FlipCard from '@/components/flipCard/flipCard';
import OutOfCards from '@/components/flipCard/outOfCards';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { PrismaClient } from "@prisma/client"


type Props = {}

export default async function Practice({}: Props) {

  const session = await getServerSession(options);
  if(!session)
    redirect('/api/auth/signin?callbackUrl=/practice');

  const prisma = new PrismaClient()

  const userEmail = session.user?.email!;
  const userId = await prisma.user.findFirst({where: { email: userEmail}}).then((res) => {return res?.id!});
  console.log("User ID: " + userId);
  // await prisma.deck.create({
  //   data: {
  //     userId: userId,
  //     name: "Test Deck",
  //     description: "This is a test deck",
  //   }
  // })

  // await prisma.card.create({
  //   data: {
  //     deckId: "clxohehqq0001bdouz3er89m0",
  //     front: "What is the capital of France?",
  //     back: "Paris",
  //   }
  // })

  // await prisma.card.create({
  //   data: {
  //     deckId: "clxohehqq0001bdouz3er89m0",
  //     front: "What is the capital of Denmark?",
  //     back: "Copenhagen",
  //   }
  // })

  // await prisma.practice.create({
  //   data: {
  //     userId: userId,
  //     cardId: "clxohhay00003bdou7soyje50",
  //     streak: 0,
  //   }
  // })
  // await prisma.practice.create({
  //   data: {
  //     userId: userId,
  //     cardId: "clxohhty60007bdou0oahkvya",
  //     streak: 0,
  //   }
  // })

  
  const date = new Date();
  const filter = `nextPractice<'${
    date.getUTCFullYear() + 
    "-" + (date.getUTCMonth() < 10 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1) + 
    "-" + (date.getUTCDate() < 10 ? "0" + (date.getUTCDate()) : date.getUTCDate()) + 
    "T00:00:00.000Z"}'`;
  var card: any | undefined;
  prisma.practice.findFirst({where: {nextPractice: {lt: date}}}).card().then((res) => {card = res});
  // await pb.collection('cards').getFirstListItem<AnkiCard>(filter)
  //   .then((res) => {card = res})
  //   .catch(() => {card = undefined});

  if(card === undefined) {
    return (
      <OutOfCards/>
    )
  }

  return (
    <FlipCard card={card}/>
  )
}