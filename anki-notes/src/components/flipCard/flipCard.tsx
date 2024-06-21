"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from 'react'
import { handleCorrect, handleWrong } from "@/actions/actions"
import { Card as CardModel, Practice } from '@prisma/client'

type Props = {
  card: CardModel,
  practice: Practice
}

export default function FlipCard({ card, practice }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className={cn("flex flex-col justify-around m-2 gap-2")}>
      <form>
        <Card>
          <CardHeader><strong>Question</strong></CardHeader>
          <CardContent>
            {card.front}
          </CardContent>
          <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
            <Button disabled={isFlipped} formAction={() => setIsFlipped(true)}>Show</Button>
          </CardFooter>
        </Card>

        {isFlipped && (
            <Card>
            <CardHeader><strong>Answer</strong></CardHeader>
            <CardContent>
              {card.back}
            </CardContent>
            <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
              <Button variant={"destructive"} formAction={async (formData: FormData) => {await handleWrong(card, practice); setIsFlipped(false)}}>Wrong</Button>
              <Button type='submit' formAction={async (formData: FormData) => {await handleCorrect(card, practice)}}>Correct</Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  )
}