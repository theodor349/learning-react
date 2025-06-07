export default function Page() {
  return(
    <div className={"w-full"}>
      <div className={"relative w-full"}>
        <div className={"absolute w-full"}>
          <HourDisplay/>
        </div>
        <div className={"absolute w-full"}>
          <CurrentTimeDisplay/>
        </div>
      </div>
    </div>
  )
}

function CurrentTimeDisplay() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const dayProgressed = (hour * 60 + minutes) / 1440;
  const heightPerHour = 168;
  const totalContentHeight = 24 * heightPerHour;
  const currentLineTopPosition = dayProgressed * totalContentHeight;

  return (
      <div className={'relative z-10 border-b-4 border-dotted border-red-500'}
        style={{
          top: `${currentLineTopPosition}px`,
        }}
      ></div>
  );
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
        <div className={"w-[calc(100%+38px)] ml-[-38px] border-b-2 border-[#b090e0] border-dotted"}/>
        {hour === 24 ? <div/> : <div className={"w-[calc(100%+38px)] border-b-2 border-[#b090e0] ml-[-38px]"} />}
      </div>
    </>
  )
}
