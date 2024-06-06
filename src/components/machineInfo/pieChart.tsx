import { MachineStatusItem } from "@/scripts/Apis/machineInfo/types";
import Image from "next/image";
import {
  formatMilliseconds,
  formatPercent,
  setMachineBackgroundColor,
  translateMachineStatus,
} from "./functions";

interface MachineInfoPieChartProps {
  selectMachineInfo: MachineStatusItem;
}

const MachineInfoPieChart = ({
  selectMachineInfo,
}: MachineInfoPieChartProps) => {
  // 稼動時數轉成百分比
  const machineActivation = formatPercent(selectMachineInfo?.Activation);

  // 設定圖表顏色
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A ${machineActivation}%, #b8b8b8 ${machineActivation}%, #b8b8b8)`;

  return (
    <div className="w-full p-2 bg-gray-900 rounded-md">
      <div>
        <div className="flex justify-between border-b-2">
          <div>
            <p className="text-gray-300">
              {selectMachineInfo?.ProductLineData?.Name}
            </p>
            <h3>{selectMachineInfo?.SerialNumber}</h3>
            <p className="text-gray-300">
              {selectMachineInfo?.MacTypeData?.Name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/wifi.svg"
              alt="wifi img"
              width={24}
              height={24}
            />
            <p>{selectMachineInfo?.MachineIP}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 ">
          <div className="relative w-full">
            <div
              className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full lg:w-40 lg:h-40 md:w-32 md:h-32 left-1/2 top-1/2"
              style={{ background: gradientColorsOutSide }}
            >
              <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full lg:w-32 lg:h-32 md:w-24 md:h-24 left-1/2 top-1/2">
                <p className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {machineActivation}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="p-2 my-2 bg-gray-800 rounded-md">
              <p>總稼動時數(當日)</p>
              <hr className="my-1" />
              <p>{formatMilliseconds(selectMachineInfo?.ProcessTime)}</p>
            </div>
            <div className="p-2 my-2 bg-gray-800 rounded-md">
              <p>設備開機時數(當日)</p>
              <hr className="my-1" />
              <p>{formatMilliseconds(selectMachineInfo?.TotalConnectTime)}</p>
            </div>
            <div
              className={`w-full p-2 my-2 text-center rounded-md ${setMachineBackgroundColor(selectMachineInfo?.Status)}`}
            >
              <p>{translateMachineStatus(selectMachineInfo?.Status)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineInfoPieChart;
