"use client";
import {
  setMachineStatusTextColor,
  translateMachineStatus,
} from "@/components/machineInfo/functions";
import MachineLogInfo from "@/components/machineInfo/logInfo";
import MachineInfoPieChart from "@/components/machineInfo/pieChart";
import { apiGetMachineStatusList } from "@/scripts/Apis/machineInfo/machineInfoApis";
import { MachineStatusItem } from "@/scripts/Apis/machineInfo/types";
import { useEffect, useRef, useState } from "react";
export default function Page() {
  const [machineInfoList, setMachineInfoList] = useState<MachineStatusItem[]>(
    []
  );
  const [selectMachineInfo, setSelectMachineInfo] = useState<MachineStatusItem>(
    {} as MachineStatusItem
  );
  const selectMachineInfoIndex = useRef(0);
  const [machineConnected, setMachineConnected] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  // 取得設備列表
  const getMachineInfoList = async () => {
    const machineStatusValues = await apiGetMachineStatusList();
    if (machineStatusValues) {
      const { MachineStatusList: machineInfoList } = machineStatusValues;
      const { ModuleConnect: moduleConnect } = machineStatusValues;
      setMachineInfoList(machineInfoList);
      setMachineConnected(moduleConnect.AcqModuleStatus);
    }
  };

  // setting search value
  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  // 選擇設備
  const handleSelectMachineInfo = (index: number) => {
    selectMachineInfoIndex.current = index;
    setSelectMachineInfo(machineInfoList[selectMachineInfoIndex.current]);
  };

  const handleStatusTime = (time: number) => {
    return Math.floor(time / 60000);
  };

  // 每 10 秒更新 machine info list
  useEffect(() => {
    getMachineInfoList();
    const interval = setInterval(() => {
      getMachineInfoList();
    }, 3000);
    return () => clearInterval(interval);
  }, [searchValue]);

  useEffect(() => {
    setSelectMachineInfo(machineInfoList[selectMachineInfoIndex.current]);
  }, [machineInfoList]);

  return (
    <div className="w-full p-2 my-2 = rounded-xl">
      <div className="gap-4 md:flex">
        <MachineInfoPieChart selectMachineInfo={selectMachineInfo} />
        <MachineLogInfo selectMachineInfo={selectMachineInfo} />
      </div>
      <div className="p-2 my-4 overflow-auto bg-gray-900 rounded-md ">
        <div className="grid justify-center my-4">
          <div className="relative mx-auto w-fit ">
            <h3 className="my-2 text-center ">設備狀態</h3>
            <div className="absolute top-0 -right-3 ">
              <span className="relative flex w-3 h-3">
                <span
                  className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${machineConnected ? "bg-green-400" : "bg-red-400"}`}
                ></span>
                <span
                  className={`relative inline-flex w-3 h-3 rounded-full ${machineConnected ? "bg-green-500" : "bg-red-500"}`}
                ></span>
              </span>
            </div>
          </div>
          <input
            type="search"
            className="p-2 text-center text-black rounded-md w-96"
            placeholder="搜尋設備序號、產線"
            onChange={(e) => handleSearchValue(e.target.value)}
          />
        </div>
        <div className="overflow-auto text-center rounded-t-md">
          <table className="w-full">
            <thead className="bg-indigo-500 ">
              <tr>
                <th className="p-1 whitespace-nowrap">設備序號</th>
                <th className="p-1 whitespace-nowrap">產線別</th>
                <th className="p-1 whitespace-nowrap">轉速/進給率</th>
                <th className="p-1 whitespace-nowrap">運行狀態</th>
                <th className="p-1 whitespace-nowrap">
                  狀態持續時間
                  <span className="text-sm text-gray-300 "> min</span>
                </th>
                <th>最後更新</th>
              </tr>
            </thead>
            <tbody>
              {machineInfoList.length > 0 ? (
                machineInfoList.map((item, index) => (
                  <tr
                    key={item.MachineId}
                    onClick={() => handleSelectMachineInfo(index)}
                    className={`cursor-pointer hover:bg-gray-600 ${selectMachineInfoIndex.current === index ? "bg-gray-600" : ""}`}
                  >
                    <td className="p-1 whitespace-nowrap">
                      {item.SerialNumber}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.ProductLineData.Name}
                    </td>
                    <td className={`p-1 whitespace-nowrap`}>
                      {item.CurrentParameter.SpindleRPM} /
                      {item.CurrentParameter.TotalFeedRate}
                    </td>
                    <td
                      className={`p-1 whitespace-nowrap ${setMachineStatusTextColor(item.Status)}`}
                    >
                      {translateMachineStatus(item.Status)}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.StatusKeepTime === -1
                        ? "connection failed"
                        : handleStatusTime(item.StatusKeepTime)}
                    </td>
                    <td>{item.LastModify}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}> loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
