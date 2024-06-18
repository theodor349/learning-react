"use client"

import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from "next-auth/react"

const SignInButton = () => {
  return (
    <Button onClick={() => signIn()}>Sign In</Button>
  )
}

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut()}>Sign Out</Button>
  )
}

export { SignInButton, SignOutButton }