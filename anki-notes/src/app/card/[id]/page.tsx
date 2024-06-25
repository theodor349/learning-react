import  CardForm from '@/components/cardForm/cardForm'
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from "next/cache";
import { Card } from '@prisma/client'
import prisma from '@/lib/prisma'

type Props = {
  params: {
    id: string
  }
}

export default async function CardPage({params}: Props) {
  const session = await getServerSession(options);
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const serverCard = await prisma.card.findUniqueOrThrow({where: {id: params.id}}).then((res) => {return res});
  if(serverCard.userId !== userId) return console.error("Unauthorized");

  return (
    <CardForm card={serverCard}/>
  )
}