import React from "react";

export default function LearningLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header (Optional) */}
      <header className="w-full flex flex-row bg-blue-300 text-black">
        {/* Left */}
        <div className="flex flex-row gap-4 p-4 items-center">
          <div className={"w-8 h-8 bg-red-500"}/>
          <div className={"w-32 h-12 bg-red-500"}/>
          <button className={"bg-gray-200 px-4 py-2"}>Today</button>
          <div className={"flex flex-row gap-1"}>
            <button className={"bg-gray-200 px-2 py-1"}>Left</button>
            <button className={"bg-gray-200 px-2 py-1"}>Right</button>
          </div>
          <div className={"font-semibold text-lg"}>2025-01-01</div>
        </div>

        {/* Right */}
        <div className={"flex flex-row flex-grow items-center justify-end gap-4 p-4"}>
          <div className={"w-12 h-12 bg-red-500"}/>
          <div className={"w-8 h-8 bg-red-500"}/>
          <div className={"flex flex-row gap-0"}>
            <div className={"w-10 h-10 bg-blue-500"}/>
            <div className={"w-10 h-10 bg-red-500"}/>
          </div>
          <div className={"w-32 h-12 bg-red-500"}/>
          <div className={"w-8 h-8 bg-red-500"}/>
          <div className={"w-8 h-8 bg-red-500"}/>
        </div>
      </header>

      <div className={"flex flex-row w-full flex-grow bg-blue-500 gap-4"}>
        <div className={"flex   flex-col w-1/6 bg-red-500 p-4 gap-2"}>
          <div className={"w-1/2 h-12 bg-blue-500"}/>
          <div className={"w-full h-44 bg-green-500 "}/>
          <div className={"w-3/4 h-12 bg-blue-500"}/>
        </div>

        <div className={"flex-grow bg-green-500 rounded-2xl mr-2"}>

        </div>
      </div>
    </div>
  );
}