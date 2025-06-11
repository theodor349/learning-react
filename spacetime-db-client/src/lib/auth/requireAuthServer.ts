import {auth0} from "./auth";
import {redirect} from "next/navigation";
import {SessionData} from "@auth0/nextjs-auth0/types";

export async function requireAuthServer(): Promise<SessionData> {
  const session = await auth0.getSession();
  const user = session?.user;
  const isAuthenticated = !!user;

  if(!isAuthenticated)
    redirect("/")

  return session;
}
