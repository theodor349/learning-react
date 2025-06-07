export default function Page() {
  return(
    <div className={"w-full"}>

      <HourDisplay/>

    </div>
  )
}

function HourDisplay() {
  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="w-full grid grid-cols-[30px_1fr] items-end gap-x-2"> {/* Example grid layout */}
      {hours.map((hour) => (
        <HourLine key={hour} hour={hour} />
      ))}
    </div>
  );
}


interface HourLineProps {
  hour: number;
}

function HourLine({hour}: HourLineProps) {
  return (
    <>
      <div className={"text-sm text-right text-[#400e8b]"}>
        {hour === 24 ? "" : `${hour.toString().padStart(2, '0')}:00`}
      </div>
      <div className={"flex flex-col gap-10"}>
        <div/>
        <div className={"w-[calc(100%+38px)] ml-[-38px] border-b-2 border-[#b090e0] border-dotted"}/>
        <div className={"w-[calc(100%+38px)] ml-[-38px] border-b-2 border-[#b090e0] border-dotted"}/>
        {hour === 24 ? <div/> : <div className={"w-[calc(100%+38px)] border-b-2 border-[#b090e0] ml-[-38px]"} />}
      </div>
    </>
  )
}
