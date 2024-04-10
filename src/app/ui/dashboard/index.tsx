"use client";
import { apiGetMachineStatusList } from "@/scripts/Apis/dashboard/dashboard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardIndex() {
  const [machineInfoList, setMachineInfoList] = useState([]);
  const chartColor =
    "conic-gradient(from 0deg at 50% 50%, #2bfc4e 0deg 50deg, gray 50deg 360deg)";

  const getMachineInfoList = async () => {
    const res: any = await apiGetMachineStatusList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
    }
  };

  useEffect(() => {
    getMachineInfoList();
  }, []);
  return (
    <div className="w-full lg:grid-cols-2 lg:grid lg:gap-2 xl:grid-cols-3">
      {machineInfoList
        ? machineInfoList.map((item: any) => (
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
                      {item.Status} / {item.Activation} %
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mx-4 mt-10">
                {item.AtcLoadingList.map((tool: any) => (
                  <div
                    className="flex flex-col justify-center "
                    key={tool.ToolSn}
                  >
                    <div
                      className="flex items-center justify-center w-20 h-20 mx-auto rounded-full md:w-28 md:h-28"
                      style={{
                        background: chartColor,
                      }}
                    >
                      <div className="w-16 h-16 bg-gray-900 rounded-full md:w-24 md:h-24"></div>
                    </div>
                    <div className="p-2 mx-auto bg-green-500 border-2 border-gray-900 rounded-md w-fit">
                      <div className="text-center xl:text-xl ">
                        {tool.AtcNo}
                      </div>
                      <div className="text-center xl:text-xl">
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
