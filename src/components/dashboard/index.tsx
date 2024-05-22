"use client";
import { apiGetMachineStatusList } from "@/scripts/Apis/dashboard/dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  GetMachineStatusInfoListResponse,
  MachineStatusItem,
} from "../machineInfo/types";

export default function DashboardIndex() {
  const [machineInfoList, setMachineInfoList] = useState<MachineStatusItem[]>(
    []
  );
  const chartColor = `conic-gradient(from 0deg at 50% 50%, #2bfc4e 0deg 50deg, gray 50deg 360deg)`;

  const getMachineInfoList = async () => {
    const data = await apiGetMachineStatusList();
    const res = data as GetMachineStatusInfoListResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
    }
  };

  const toolStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "text-green-500";
      case "NeedRepair":
        return "text-red-500";
    }
  };

  const progressColor = (progress: number) => {
    const roundValue = (360 * progress) / 100;
    console.log("roundValue = ", roundValue);

    if (progress < 50) {
      return `conic-gradient(from 0deg at 50% 50%, yellow 0deg ${roundValue}deg, gray ${roundValue}deg 360deg)`;
    } else if (progress < 30) {
      return `conic-gradient(from 0deg at 50% 50%, red 0deg ${roundValue}deg, gray ${roundValue}deg 360deg)`;
    } else {
      return `conic-gradient(from 0deg at 50% 50%, green 0deg ${roundValue}deg, gray ${roundValue}deg 360deg)`;
    }
  };

  useEffect(() => {
    getMachineInfoList();
  }, []);
  return (
    <div className="w-full lg:grid-cols-2 lg:grid lg:gap-2 xl:grid-cols-3">
      {machineInfoList
        ? machineInfoList.map((item) => (
            <div
              className="w-full p-2 mx-auto mb-2 bg-gray-900 rounded-md"
              key={item.MachineId}
            >
              <div className="flex justify-between w-full border-b-2">
                <div>
                  <p className="">{item.ProductLineData.Name}</p>
                  <p className="text-2xl font-bold md:text-4xl ">
                    {item.SerialNumber}
                  </p>
                  <p className="text-sm text-gray-400 ">
                    {item.MacTypeData.Name}
                  </p>
                </div>
                <div>
                  <div>
                    <Image
                      src="/wi-fi.png"
                      alt="wi-fi"
                      width={30}
                      height={30}
                      className="mx-auto scale-75"
                    />
                    <p>{item.MachineIP}</p>
                    <p>
                      {item.Status} / {(item.Activation * 100).toFixed(2)} %
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mx-4 mt-10">
                {item.AtcLoadingList.map((tool) => (
                  <div
                    className="flex flex-col justify-center "
                    key={tool.ToolSn}
                  >
                    <div
                      className="relative flex items-center justify-center w-20 h-20 mx-auto rounded-full md:w-28 md:h-28"
                      style={{
                        background: progressColor(tool.ToolLife.LifePercentage),
                      }}
                    >
                      <p
                        className={`absolute ${toolStatusColor(tool.ToolLife.LifeStatus)}`}
                      >
                        {tool.ToolLife.LifePercentage}%
                      </p>
                      <div className="w-16 h-16 bg-gray-900 rounded-full md:w-24 md:h-24"></div>
                    </div>
                    <div className="p-2 mx-auto bg-green-500 border-2 border-gray-900 rounded-md w-fit">
                      <div className="text-center xl:text-xl " title="裝載位置">
                        {tool.AtcNo}
                      </div>
                      <div className="text-center xl:text-xl" title="刀具 SN">
                        {tool.ToolSn ? tool.ToolSn : "no data"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
