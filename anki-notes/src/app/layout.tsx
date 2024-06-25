import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "./NavMenu";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teaching Flipper",
  description: "The app which helps you learn, by flipping cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center">
          <div className="flex min-h-screen flex-col items-center w-[100%] max-w-screen">
            <NavMenu />
            {children}
            <SpeedInsights />
          </div>
        </div>
      </body>
    </html>
  );
}
