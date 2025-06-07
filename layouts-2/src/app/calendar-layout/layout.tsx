import React from "react";
import { SquareArrowLeft, SquareArrowRight, Menu } from 'lucide-react';

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col md:flex-col-reverse h-screen bg-[#e9e2f3] ">

      {/* Calendar */}
      <div className={"flex-grow w-full"}>
      </div>

      {/* Menu Bar */}
      <div className={"bg-[#b090e0] flex flex-row items-end w-full p-2 rounded-t-2xl md:rounded-t-none"}>

        {/* Week and day of week */}
        <div className={"flex flex-col items-center text-white"}>
          <div className={"text-sm font-thin"}>
            Thu
          </div>
          <div className={"bg-[#400e8b] text-white text-lg w-12 h-12 rounded-2xl flex flex-col items-center justify-center"}>
            4
          </div>
        </div>

        {/* Date and controls */}
        <div className={"flex flex-col items-center flex-grow"}>
          <div className={"flex flex-row items-center gap-2 h-12 bg-[#400e8b] text-white text-lg rounded-2xl"}>
            <button className={"m-2 font-bold"}>
              <SquareArrowLeft />
            </button>
            <div className={"text-sm font-semibold"}>
              Jan 23, 2025
            </div>
            <button className={"m-2 font-bold"}>
              <SquareArrowRight />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className={"flex flex-row"}>
          <div className={"bg-[#400e8b] text-white text-lg w-12 h-12 rounded-2xl flex flex-col items-center justify-center"}>
            <Menu/>
          </div>
        </div>
      </div>
    </div>
  );
}