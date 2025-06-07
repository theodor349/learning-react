import React from "react";

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header (Optional) */}
      <header className="w-full bg-blue-600 p-4 text-white text-center">
        My App Header
      </header>

      {/* flex, enables flex functionality */}
      {/* flex-col-reverse, sets the default flex direction to column and reverses the elements */}
      {/* lg:flex-row, set the flex direction to row when the screen size is large or larger than large */}
      {/* flex-grow, lets the container grow to take all available space of the parents' main axis, in this case vertical */}
      {/* gap-4, create a gap between all elements within the container including the edges of the container */}
      <div className="flex flex-col-reverse lg:flex-row flex-grow gap-4">

        {/* Sidebar */}
        {/* lg:w-1/4 set the width to 1/4 of the parents' width when the screen size is large or larger */}
        {/* w-full, set the default width to 100% of the parents' */}
        <aside className="lg:w-1/4 w-full bg-blue-50 p-4">
          {/* text-lg, sets the text size to large */}
          {/* font-semibold, sets the font to semibold */}
          <h3 className="text-lg font-semibold">Sidebar</h3>
          <p>This is a sidebar. It stacks on mobile and appears on the side on larger screens.</p>
        </aside>

        {/* Main Content */}
        {/* flex-grow, enables the container to eat all the remaining space on its parents' main axis, in this case horizontal */}
        <div className="flex-grow bg-gray-50 p-4">
          {/* text-lg, sets the text size to large */}
          {/* font-semibold, sets the font to semibold */}
          <h3 className="text-lg font-semibold">Main Section</h3>
          <p>This section will take up more space.</p>
          {children}
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        My App Footer
      </footer>
    </div>
  );
}