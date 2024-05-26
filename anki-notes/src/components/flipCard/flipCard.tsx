"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from 'react'

type Props = {
  deckTitle: string
  question: string
  answer: string
}

export default function FlipCard({deckTitle, question, answer}: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <div className={cn("flex flex-col justify-around m-2 gap-2")}>
      <Card>
        <CardHeader><strong>Question</strong></CardHeader>
        <CardContent>
          {question}
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button disabled={isFlipped} onClick={() => setIsFlipped(true)}>Show</Button>
        </CardFooter>
      </Card>

      {isFlipped && 
      (
        <Card>
          <CardHeader><strong>Answer</strong></CardHeader>
          <CardContent>
            {answer}
          </CardContent>
          <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
            <Button variant="destructive">Wrong</Button>
            <Button>Correct</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}