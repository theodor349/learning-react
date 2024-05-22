import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className={cn("w-[512px]")}>
        <CardHeader>Architectural Smells</CardHeader>
        <CardContent>
          What is a "Golden hammer"?
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button>Flip</Button>
        </CardFooter>
      </Card>

      <Card className={cn("w-[512px]")}>
        <CardHeader>Architectural Smells</CardHeader>
        <CardContent>
        This smell occurs when familiar technologies are used as solutions to every problem.
        </CardContent>
        <CardFooter className={"flex justify-center " + cn("gap-[10px]")}>
          <Button>Very Easy</Button>
          <Button>Easy</Button>
          <Button>Hard</Button>
          <Button>Very Hard</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
