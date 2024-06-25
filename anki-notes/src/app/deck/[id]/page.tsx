import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import DeckForm from '@/components/deckForm/deckForm';
import CardForm from '@/components/cardForm/cardForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardTable from '@/components/cardTable/page';
import prisma from '@/lib/prisma'

interface Props {
  params: {
    id: string
  }
}

export default async function DeckId({params}: Props) {
    const session = await getServerSession(options);
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const deck = await prisma.deck.findUnique({where: {id: params.id}}).then((res) => {return res});
  if(deck?.userId !== userId) return console.log("Unauthorized");
  const cards = await prisma.card.findMany({where: {deckId: deck.id}}).then((res) => {return res});

  return (
    <>
      <Tabs defaultValue="cards" className='py-2'>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="edit">Edit Deck</TabsTrigger>
          <TabsTrigger value="create">Create Card</TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
          <CardTable cards={cards}/>
        </TabsContent>
        <TabsContent value="edit">
          <DeckForm deck={deck}/> 
        </TabsContent>
        <TabsContent value="create">
          <CardForm deck={deck}/> 
        </TabsContent>
      </Tabs>
    </>
  )
}