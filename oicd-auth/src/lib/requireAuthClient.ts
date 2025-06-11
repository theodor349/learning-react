'use client'

import {useUser} from "@auth0/nextjs-auth0";
import {redirect} from "next/navigation";

export function requireAuthClient() {
  const state = useUser();
  const {user, isLoading} = state;

  if (isLoading)
    return state;
  if (!user)
    redirect("/")
  return state;
}