import {
  formatMMToCM,
  toolLifeStatusTextColor,
  toolStatusPieChartColor,
} from "@/scripts/Apis/toolInfo/functions";
import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import Image from "next/image";
import { useContext } from "react";
import { LangContext } from "../context/langContext";
import DefaultSkeleton from "../skeletons/default";
import ImagePlaceholder from "../skeletons/imagePlaceholder";

interface PieChartProps {
  toolInfoData: ToolStockItem;
  formatTime: (time: number) => string;
}
const PieChart = ({ toolInfoData, formatTime }: PieChartProps) => {
  const dict = useContext(LangContext);

  const toolLifePercent = toolInfoData?.LifePercentage;
  const toolLifeStatus = toolInfoData?.LifeStatus;

  const gradientColorsOutSide = `conic-gradient(${toolStatusPieChartColor(toolLifeStatus)} 0, ${toolStatusPieChartColor(toolLifeStatus)} ${toolLifePercent}%, gray ${toolLifePercent}%, gray)`;

  if (!dict) return <DefaultSkeleton />;

  return (
    <>
      {toolInfoData.hasOwnProperty("ToolSn") ? (
        <div className="flex flex-col w-full p-2 mb-2 bg-gray-900 rounded-xl max-h-80">
          <div className="flex justify-between mb-4 border-b-2 ">
            <div className="">
              <h3 className="font-bold ">{toolInfoData?.ToolSn} </h3>
              <h4 className="mb-4 text-gray-300">
                {toolInfoData?.ToolSpecName}
              </h4>
            </div>
            <div
              title={`${dict.tool_info.repair_times} / ${dict.tool_info.max_repair_times}`}
            >
              <div className="flex items-center">
                <Image
                  src={"/images/icons/repair.svg"}
                  alt="repair svg"
                  width={20}
                  height={20}
                  className="mx-2"
                />
                <p>
                  {`${toolInfoData?.LifeData?.RepairCnt} / ${toolInfoData?.MaxLife?.RepairCnt}`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-24 w-72 md:h-32 lg:h-48">
              <div
                className="w-24 h-24 mx-auto rounded-full md:absolute md:-translate-x-1/2 md:-translate-y-1/2 lg:w-40 lg:h-40 md:w-32 md:h-32 md:left-1/2 md:top-1/2"
                style={{ background: gradientColorsOutSide }}
              >
                <div className="absolute -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full w-14 h-14 lg:w-28 lg:h-28 md:w-12 md:h-12 top-1/2 left-1/2">
                  <p
                    className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${toolLifeStatusTextColor(toolLifeStatus)}`}
                  >
                    {toolLifePercent}%
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className="my-2 md:whitespace-nowrap">
                  {dict.tool_info.process_length}：
                </p>
                <h4 className="flex items-end">
                  {formatMMToCM(toolInfoData?.LifeData?.ProcessLength)}
                  <span className="text-sm text-gray-300"> cm</span>
                </h4>
              </div>
              <div>
                <p className="my-2 md:whitespace-nowrap">
                  {dict.tool_info.process_time}：
                </p>
                <h4>{formatTime(toolInfoData?.LifeData?.ProcessTime)}</h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ImagePlaceholder />
      )}
    </>
  );
};

export default PieChart;
