import React from "react";

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header (Optional) */}
      <header className="w-full bg-blue-600 p-4 text-white text-center">
        My App Header
      </header>

      {/* flex, enables flex container */}
      {/* flex-row, aligns the elements on a row */}
      {/* flex-grow, makes the container grow to take all available space, in its parent, on the main axis */}
      {/*   Since the parent is flex-col, this is on the vertical axis */}
      {/* w-full, sets the width to 100% of the parents' width */}
      <div className="flex flex-row flex-grow w-full">

        {/* w-1/6, sets the width to 1/6 of its parents' width */}
        {/* p-2, creates a little bit of space on all sides within the container*/}
        <div className="bg-red-500 w-1/6 p-2">
          Left Sidebar
        </div>

        {/* w-full, sets the width to 100% of the parents' width */}
        {/* mx-4, creates a small buffer on the x-axis to the neighboring elements*/}
        <div className="bg-green-500 w-full mx-4 shadow">
          {children}
        </div>


        {/* w-1/6, sets the width to 1/6 of its parents' width */}
        {/* p-2, creates a little bit of space on all sides within the container*/}
        <div className="bg-blue-500 w-1/6 p-2">
          Right Sidebar
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        My App Footer
      </footer>
    </div>
  );
}