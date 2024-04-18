import { Metadata } from 'next';

// Not necessary, just for demonstration.
// As this is the default behavior, as we do not do any data fetching.
export const dynamic = 'force-static'; 

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        NextSpace is a community-driven platform for Next.js developers to share
        their knowledge and experience. We aim to provide a space for developers
        to learn from each other and grow together.
      </p>
    </div>
  );
}