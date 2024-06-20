export const dynamic = 'force-dynamic'

import PocketBase from 'pocketbase';
import FlipCard from '@/components/flipCard/flipCard';
import OutOfCards from '@/components/flipCard/outOfCards';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

type Props = {}

export default async function Practice({}: Props) {
  const session = await getServerSession(options);
  if(!session)
    redirect('/api/auth/signin?callbackUrl=/practice');

  const pb = new PocketBase('http://127.0.0.1:8090');
  const date = new Date();
  const filter = `nextPractice<'${
    date.getUTCFullYear() + 
    "-" + (date.getUTCMonth() < 10 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1) + 
    "-" + (date.getUTCDate() < 10 ? "0" + (date.getUTCDate()) : date.getUTCDate()) + 
    "T00:00:00.000Z"}'`;
  var card: AnkiCard | undefined;
  await pb.collection('cards').getFirstListItem<AnkiCard>(filter)
    .then((res) => {card = res})
    .catch(() => {card = undefined});

  if(card === undefined) {
    return (
      <OutOfCards/>
    )
  }

  return (
    <FlipCard card={card}/>
  )
}

type AnkiCard = {
  id: string
  question: string
  answer: string
}