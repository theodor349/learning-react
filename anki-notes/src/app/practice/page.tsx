import PocketBase from 'pocketbase';
import { revalidatePath } from 'next/cache';

type Props = {}

async function Update(card: any, data: Date) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  await pb.collection('cards').update(card.id, { nextPractice: data });
}

export default async function page({}: Props) {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const date = new Date();
  const filter = `nextPractice<'${
    date.getUTCFullYear() + 
    "-" + (date.getUTCMonth() < 10 ? "0" + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1) + 
    "-" + (date.getUTCDate() < 10 ? "0" + (date.getUTCDate()) : date.getUTCDate()) + 
    "T00:00:00.000Z"}'`;
  console.log(filter);
  const card = await pb.collection('cards').getFirstListItem<AnkiCard>(filter);
  
  async function handleCorrect() {
    "use server"
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('cards').update(card.id, { nextPractice: date });

    revalidatePath(`/practice`);
  }
  async function handleWrong() {
    "use server"
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('cards').update(card.id, { nextPractice: date });

    revalidatePath(`/practice`);
  }

  return (
    <>
      <form action={handleCorrect}>
        <div>
          <b>Q:</b> {card.question}
        </div> 
        <div>
          <b>Q:</b> {card.answer}
        </div> 
        <button formAction={handleWrong}>Wrong</button>
        <button type="submit">Correct</button>
      </form>
    </>
  )
}

type AnkiCard = {
  id: string
  question: string
  answer: string
}