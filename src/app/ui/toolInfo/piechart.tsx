interface PieChartProps {
  toolStatusItem: {
    ToolSN: string;
    ToolName: string;
    ProcessTime: string;
    ProcessLength: string;
  };
}
import Image from "next/image";
const PieChart = ({ toolStatusItem }: PieChartProps) => {
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A 30%, #B9E6B5 30%, #B9E6B5)`;
  const gradientColorsInSide = `conic-gradient(#FACC15 0, #FACC15 50%, #F5ECB5 50%, #F5ECB5)`;

  return (
    <div className="flex flex-col w-full p-2 mb-2 bg-gray-900 rounded-xl md:mr-4">
      <div className="flex justify-between mb-4 border-b-2 ">
        <div className="">
          <p className="text-2xl font-bold">{toolStatusItem.ToolSN}</p>
          <p className="mb-4 text-gray-300">{toolStatusItem.ToolName}</p>
        </div>
        <div className="flex items-start">
          <Image
            src={"/hammer.png"}
            alt="hammer"
            width={20}
            height={20}
            className="mx-2"
          />
          <p>2/7</p>
        </div>
      </div>
      <div className="w-full md:flex">
        <div className="relative w-full left-1/2 md:left-0">
          <div
            className="w-24 h-24 -translate-x-1/2 rounded-full md:translate-x-0"
            style={{ background: gradientColorsOutSide }}
          >
            <div
              className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2"
              style={{ background: gradientColorsInSide }}
            >
              <div className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full top-1/2 left-1/2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:block">
          <div className="flex items-center mx-2">
            <p className="my-2 border-l-4 border-green-600 md:whitespace-nowrap">
              累積加工長度：
            </p>
            <p>{toolStatusItem.ProcessLength}</p>
          </div>
          <div className="flex items-center mx-2">
            <p className="my-2 border-l-4 border-yellow-600 md:whitespace-nowrap">
              累積加工時間：
            </p>
            <p>{toolStatusItem.ProcessTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
