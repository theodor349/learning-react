const posts = [
  {
    title: 'Hello World',
    slug: 'hello-world',
    content: 'This is my first post!',
  },
  {
    title: 'Second Post',
    slug: 'second-post',
    content: 'This is my second post!',
  },
  {
    title: 'Third Post',
    slug: 'third-post',
    content: 'This is my third post!',
  },
  {
    title: 'Fourth Post',
    slug: 'fourth-post',
    content: 'This is my fourth post!',
  },
  {
    title: 'Fifth Post',
    slug: 'fifth-post',
    content: 'This is my fifth post!',
  },
  {
    title: 'Sixth Post',
    slug: 'sixth-post',
    content: 'This is my sixth post!',
  },
  {
    title: 'Seventh Post',
    slug: 'seventh-post',
    content: 'This is my seventh post!',
  },
  {
    title: 'Eighth Post',
    slug: 'eighth-post',
    content: 'This is my eighth post!',
  },
  {
    title: 'Ninth Post',
    slug: 'ninth-post',
    content: 'This is my ninth post!',
  },
  {
    title: 'Tenth Post',
    slug: 'tenth-post',
    content: 'This is my tenth post!',
  }
]

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(posts)
}