import type { NextAuthOptions } from "next-auth";
import type GitHubProvider from "next-auth/providers/github"; 
import Github from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ], 
}