"use client";
import {
  setMachineStatusTextColor,
  translateMachineStatus,
} from "@/components/machineInfo/functions";
import {
  AtcLoadingItem,
  MachineStatusItem,
} from "@/components/machineInfo/types";
import { apiGetMachineStatusList } from "@/scripts/Apis/machineInfo/machineInfoApis";
import {
  toolLifeStatusBackgroundColor,
  toolLifeStatusTextColor,
  toolStatusPieChartColor,
} from "@/scripts/Apis/toolInfo/functions";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [machineInfoList, setMachineInfoList] = useState<MachineStatusItem[]>(
    []
  );

  const getMachineInfoList = async () => {
    const machineStatusValues = await apiGetMachineStatusList();
    if (machineStatusValues) {
      const { MachineStatusList: machineStatusList } = machineStatusValues;
      setMachineInfoList(machineStatusList);
    }
  };

  const progressColor = (LifePercentage: number, lifeStatus: string) => {
    return `conic-gradient(from 0deg at 50% 50%, ${toolStatusPieChartColor(lifeStatus)} 0deg ${LifePercentage}deg, gray ${LifePercentage}deg 360deg`;
  };

  const sortToolStatus = (data: AtcLoadingItem[]) => {
    return data.sort(
      (a, b) => a.ToolLife.LifePercentage - b.ToolLife.LifePercentage
    );
  };

  useEffect(() => {
    getMachineInfoList();
    const interval = setInterval(() => {
      getMachineInfoList();
    }, 10000);
    return () => clearInterval(interval);
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
                  <p className="text-xl font-bold md:text-2xl ">
                    {item.SerialNumber}
                  </p>
                  <p className="text-sm text-gray-400 ">
                    {item.MacTypeData.Name}
                  </p>
                </div>
                <div>
                  <div>
                    <div className="flex items-center">
                      <Image
                        src="/wi-fi.png"
                        alt="wi-fi"
                        width={25}
                        height={25}
                        className="mx-auto scale-75"
                      />
                      <p className="text-sm ">{item.MachineIP}</p>
                    </div>
                    <p
                      className={`text-sm ${setMachineStatusTextColor(item.Status)}`}
                    >
                      {translateMachineStatus(item.Status)} /{" "}
                      {(item.Activation * 100).toFixed(2)} %
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mx-4 mt-10">
                {sortToolStatus(item.AtcLoadingList).map((tool) => (
                  <div
                    className="flex flex-col justify-center "
                    key={tool.ToolSn}
                  >
                    <div
                      className="relative flex items-center justify-center w-20 h-20 mx-auto rounded-full md:w-28 md:h-28"
                      style={{
                        background: progressColor(
                          tool.ToolLife.LifePercentage,
                          tool.ToolLife.LifeStatus
                        ),
                      }}
                    >
                      <p
                        className={`absolute ${toolLifeStatusTextColor(tool.ToolLife.LifeStatus)}`}
                      >
                        {tool.ToolLife.LifePercentage}%
                      </p>
                      <div className="w-16 h-16 bg-gray-900 rounded-full md:w-24 md:h-24"></div>
                    </div>
                    <div
                      className={`p-2 mx-auto   rounded-md w-fit ${toolLifeStatusBackgroundColor(tool.ToolLife.LifeStatus)} `}
                    >
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
