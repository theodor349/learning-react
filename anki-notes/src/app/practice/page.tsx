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
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const practice = await prisma.practice.findFirst({where: {userId: userId, nextPractice: {lt: new Date()}, practiced: false}, orderBy: {nextPractice: "asc"}}).then((res) => {return res});

  if(practice === undefined || practice === null) {
    return (
      <OutOfCards/>
    )
  }

  const card = await prisma.card.findUnique({where: {id: practice?.cardId}}).then((res) => {return res});
  return (
    <FlipCard card={card!} practice={practice!}/>
  )
}