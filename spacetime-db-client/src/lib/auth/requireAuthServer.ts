import {auth0} from "@/lib/auth0";
import {redirect} from "next/navigation";

export async function requireAuthServer() {
  const session = await auth0.getSession();
  const user = session?.user;
  const isAuthenticated = !!user;

  if(!isAuthenticated)
    redirect("/")

  return session;
}
