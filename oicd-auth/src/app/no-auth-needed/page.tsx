import {auth0} from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;
  const isAuthenticated = !!user;

  return (
    <div>
      This page does not require authentication, and you are {isAuthenticated ? "signed in" : "not signed in"}
    </div>
  );
}