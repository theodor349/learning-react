import FollowButton from '@/components/FollowButton/FollowButton';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) : Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id }});
  return { title: `User profile of ${user?.name}`};
}

export default async function UserProfile({ params }: Props) {
  // throw new Error('This is an error');


  const user = await prisma.user.findUnique({ where: { id: params.id }});
  const {name, bio, image, id } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img 
        width={300}
        src={image ?? '/mememan.webpg'}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      <FollowButton targetUserId={params.id} />
    </div>
  )
}