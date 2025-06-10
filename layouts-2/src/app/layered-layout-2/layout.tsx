import React from "react";
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col h-screen">
      <div className={"flex-grow w-full flex flex-col"}>
        { children}
      </div>

      <div className={"bg-[#b090e0] w-full p-2 rounded-t-2xl shadow-xl " +
        " text-xl font-semibold " +
        "grid grid-cols-[48px_1fr_48px] items-center text-center "}>

        {/* Comment Row */}
          <div className={"font-thin text-xs"}>
            Week
          </div>

          <div className={"font-thin text-xs"}>
            Thursday
          </div>

          <div className={"font-thin text-xs"}>
          </div>

        {/* Main Row */}
          <div className={""}>
            4
          </div>

          <div className={"flex flex-col items-center flex-grow"}>
            <div className={"flex flex-row items-center gap-2"}>
              <button className={""}>
                <ChevronLeft />
              </button>
              <div className={""}>
                Jan 23, 2025
              </div>
              <button className={""}>
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className={"w-full flex flex-row justify-center"}>
            <Menu/>
          </div>
      </div>
    </div>
  );
}