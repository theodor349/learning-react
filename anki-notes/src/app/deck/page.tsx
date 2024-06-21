import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from "@prisma/client"
import DeckForm from '@/components/deckForm/deckForm';
import DeckTable from '@/components/deckTable/page';

export default async function Deck() {
  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const decks = await prisma.deck.findMany({where: {userId: userId}}).then((res) => {return res});

  return (
    <>
      <DeckTable decks={decks}/>
      <DeckForm/>
    </>
  )
}