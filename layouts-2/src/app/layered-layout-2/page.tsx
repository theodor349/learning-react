import React from 'react';
import {CurrentTimeDisplay} from "@/app/layered-layout/currentTimeDisplay";

export default function Page() {
  return(
    <>
      <CalendarHeader/>
      <div className={"w-full flex-grow overflow-auto"}>
        <div className={"bg-gray-500 h-screen"}></div>
      </div>
    </>
  )
}

function CalendarDisplay() {
  return (
    <>
      <div className="w-full h-screen flex-grow flex flex-row gap-x-1 overflow-auto bg-gray-500">
        {/*<HourDisplay/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
        {/*<DayColumn/>*/}
      </div>
    </>
  );
}

function CalendarHeader() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-[#b090e0]/30 h-12 w-full">
    </div>
  );
}

function HourDisplay() {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="w-12 flex flex-col">
      {hours.map((hour) => (
        <HourTextLine key={hour} hour={hour} />
      ))}
    </div>
  );
}

function DayColumn() {
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="flex-grow flex flex-col">
      {hours.map((hour) => (
        <HourLines key={hour} hour={hour} />
      ))}
    </div>
  );
}


interface HourProps {
  hour: number;
}

function HourTextLine({hour}: HourProps) {
  return (
    <div className={"text-sm h-[160px] text-center text-[#400e8b] z-10 -translate-y-3"}>
      {hour === 0 ? "" : `${hour.toString().padStart(2, '0')}:00`}
    </div>
  )
}

function HourLines({hour}: HourProps) {
  return (
    <>
      <div className={"flex flex-col"}>
        <QuarterRow isHour={false}/>
        <QuarterRow isHour={false}/>
        <QuarterRow isHour={false}/>
        {hour === 24 ? <div className={"h-10"}/> : <QuarterRow isHour={true}/>}
      </div>
    </>
  )
}
interface QuarterRowProps {
  isHour: boolean;
}
function QuarterRow({isHour}: QuarterRowProps) {
  return (
    <>
      {isHour ?
        <div className={"h-10 w-[calc(100%)] border-b-2 border-[#b090e0] hover:bg-[rgba(176,144,224,0.25)]"}/>
        :
        <div className={"h-10 w-[calc(100%)] border-b-2 border-[#b090e0] border-dotted hover:bg-[rgba(176,144,224,0.25)]"}/>
      }
    </>
  )
}
