import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from "@prisma/client"
// import DeckForm from '@/components/deckForm/deckForm';
import CardTable from '@/components/cardTable/page';

interface Props {
  params: {
    id: string
  }
}

export default async function DeckId({params}: Props) {
  console.log("---- Id: " + params.id)
  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const deck = await prisma.deck.findUnique({where: {id: params.id}}).then((res) => {return res});
  if(deck?.userId !== userId) return <h1>Unauthorized</h1>
  const cards = await prisma.card.findMany({where: {deckId: deck.id}}).then((res) => {return res});

  console.log("---- Deck: " + deck?.name)
  return (
    <>
      <CardTable cards={cards}/>
      {/* <CardForm/> */}
    </>
  )
}