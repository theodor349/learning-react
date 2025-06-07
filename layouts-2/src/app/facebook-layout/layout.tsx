import React from "react";

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header (Optional) */}
      <header className="w-full bg-blue-600 p-4 text-white text-center">
        My App Header
      </header>

      {/* Main Content Area - Centered */}
      {/* w-full will take as much horizontal space as possible*/}
      {/* max-w-4xl makes sure it does not grow larger than 4xl*/}
      {/* p-4 adds a little padding all around. So all content within it is given a little less space*/}
      {/* flex-grow lets it take up any remaining space on the horizontal axis (e.g. move footer to the bottom of the page)*/}
      <main className="flex-grow w-full max-w-4xl p-4 mx-auto bg-white shadow-md">
        {children}
      </main>

      {/* Footer (Optional) */}
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        My App Footer
      </footer>
    </div>
  );
}