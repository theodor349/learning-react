import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import DeckForm from '@/components/deckForm/deckForm';
import DeckTable from '@/components/deckTable/page';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import prisma from '@/lib/prisma'


export default async function Deck() {
  const session = await getServerSession(options);
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const decks = await prisma.deck.findMany({where: {userId: userId}}).then((res) => {return res});

  return (
    <>
      <Tabs defaultValue="decks" className='py-2'>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="decks">Decks</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
        </TabsList>
        <TabsContent value="decks">
          <DeckTable decks={decks}/>
        </TabsContent>
        <TabsContent value="create">
          <DeckForm/>
        </TabsContent>
      </Tabs>
    </>
  )
}