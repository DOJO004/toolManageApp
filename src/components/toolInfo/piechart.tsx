import Image from "next/image";
import { ToolStockItem } from "./types";

interface PieChartProps {
  toolInfoData: ToolStockItem;
  formatTime: (time: number) => string;
}
const PieChart = ({ toolInfoData, formatTime }: PieChartProps) => {
  console.log(
    toolInfoData?.LifeData?.ProcessTime,
    toolInfoData?.MaxLife?.ProcessTime,
    toolInfoData?.LifeData?.ProcessLength,
    toolInfoData?.MaxLife?.ProcessLength
  );

  const toolLifePercent = toolInfoData.LifePercentage;

  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A ${toolLifePercent}%, #B9E6B5 ${toolLifePercent}%, #B9E6B5)`;

  return (
    <div className="flex flex-col w-full p-2 mb-2 bg-gray-900 rounded-xl md:mr-4">
      <div className="flex justify-between mb-4 border-b-2 ">
        <div className="">
          <h3 className="font-bold ">{toolInfoData?.ToolSn} </h3>
          <h4 className="mb-4 text-gray-300">{toolInfoData?.ToolSpecName}</h4>
        </div>
        <div title="修整次數 / 最大修整次數" className="flex items-start">
          <Image
            src={"/hammer.png"}
            alt="hammer"
            width={20}
            height={20}
            className="mx-2"
          />
          <p>
            {toolInfoData?.LifeData?.RepairCnt} /{" "}
            {toolInfoData?.MaxLife?.RepairCnt}
          </p>
        </div>
      </div>
      <div className="w-full h-full md:flex">
        <div className="relative h-24 w-72 md:h-32 lg:h-48">
          <div
            className="w-24 h-24 mx-auto rounded-full md:absolute md:-translate-x-1/2 md:-translate-y-1/2 lg:w-40 lg:h-40 md:w-32 md:h-32 md:left-1/2 md:top-1/2"
            style={{ background: gradientColorsOutSide }}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full w-14 h-14 lg:w-28 lg:h-28 md:w-12 md:h-12 top-1/2 left-1/2">
              <p className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
                {toolLifePercent}%
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:mt-4 lg:mt-12 xl:mt-16 md:block">
          <div className="flex items-center p-1 mx-2 ">
            <p className="my-2 md:whitespace-nowrap">累積加工長度：</p>
            <h4 className="flex items-end">
              {toolInfoData?.LifeData?.ProcessLength / 10}
              <span className="text-sm text-gray-300"> cm</span>
            </h4>
          </div>
          <div className="flex items-center mx-2">
            <p className="my-2 md:whitespace-nowrap">累積加工時間：</p>
            <h4>{formatTime(toolInfoData?.LifeData?.ProcessTime)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
