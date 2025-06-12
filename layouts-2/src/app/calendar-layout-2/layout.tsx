import React from "react";
import { SquareArrowLeft, SquareArrowRight, Menu } from 'lucide-react';

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-10 w-full bg-red-300 sticky top-0 z-10">
        {/* Header content */}
      </header>

      {/* Central area, the *only* one scrollable */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      <footer className="h-10 w-full bg-red-500 sticky bottom-0 z-10">
        {/* Footer content */}
      </footer>
    </div>

  );
}