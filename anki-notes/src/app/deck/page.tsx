import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from "@prisma/client"
import DeckForm from '@/components/deckForm/deckForm';

export default async function Deck() {
  const session = await getServerSession(options);
  const prisma = new PrismaClient()
  const userEmail = session!.user?.email!;
  const userId = await prisma.user.findUnique({where: { email: userEmail}}).then((res) => {return res?.id!});
  const decks = await prisma.deck.findMany({where: {userId: userId}}).then((res) => {return res});
  console.log("Num Decks: " + decks.length)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id}>
              <td>{deck.name}</td>
              <td>{deck.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeckForm/>
    </>
  )
}