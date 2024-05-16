"use client";
import MachineLogInfo from "@/components/machineInfo/logInfo";
import MachineInfoPieChart from "@/components/machineInfo/pieChart";
import {
  GetMachineStatusInfoListResponse,
  MachineStatusItem,
} from "@/components/machineInfo/types";
import SweetAlert from "@/components/sweetAlert";
import { apiGetMachineStatusList } from "@/scripts/Apis/dashboard/dashboard";
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

  const getMachineInfoList = async (count = 1) => {
    if (count >= 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      return;
    }
    try {
      const data = await apiGetMachineStatusList();
      const res = data as GetMachineStatusInfoListResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("get machine info list", res);

      if (reqInt === 0) {
        setMachineInfoList(res.data.Values.MachineStatusList);
        setMachineConnected(res.data.Values.ModuleConnect.AcqModuleStatus);
        return res.data.Values.MachineStatusList;
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      getMachineInfoList(count + 1);
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchMachineInfo = async (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const data = await getMachineInfoList();

      if (data) {
        const filterData = data.filter((item) => {
          return item.MachineId.toLowerCase().includes(value.toLowerCase());
        });
        setMachineInfoList(filterData);
      }
    }, 500);
  };

  // 選擇設備
  const handleSelectMachineInfo = (index: number) => {
    selectMachineInfoIndex.current = index;
    setSelectMachineInfo(machineInfoList[selectMachineInfoIndex.current]);
  };

  const handleStatusTime = (time: number) => {
    return Math.floor(time / 60000);
  };

  //

  // 設定運行狀態中文
  const machineStatus = (status: string) => {
    switch (status) {
      case "Emergency":
        return "緊急停止";
      case "Running":
        return "運行中";
      case "Disconnect":
        return "離線";
      default:
        return "未知狀態";
    }
  };

  // 設定運行狀態文字顏色
  const machineStatusColor = (status: string) => {
    switch (status) {
      case "Emergency":
        return "text-red-500";
      case "Running":
        return "text-green-500";
      case "Disconnect":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  // 設定運行狀態背景顏色
  const machineStatusBgColor = (status: string) => {
    switch (status) {
      case "Emergency":
        return "bg-red-500";
      case "Running":
        return "bg-green-500";
      case "Disconnect":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // 每三秒更新 machine info list
  useEffect(() => {
    const interval = setInterval(() => {
      getMachineInfoList();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectMachineInfo(machineInfoList[selectMachineInfoIndex.current]);
  }, [machineInfoList]);

  return (
    <div className="w-full p-2 my-2 = rounded-xl">
      <div className="gap-4 md:flex">
        <MachineInfoPieChart
          selectMachineInfo={selectMachineInfo}
          machineStatus={machineStatus}
          machineStatusBgColor={machineStatusBgColor}
        />
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
            className="p-2 text-black rounded-md w-96"
            placeholder="搜尋設備序號"
            onChange={(e) => searchMachineInfo(e.target.value)}
          />
        </div>
        <div className="overflow-auto text-center rounded-t-md">
          <table className="w-full">
            <thead className="bg-indigo-500 ">
              <tr>
                <th className="p-1 whitespace-nowrap">設備 SN</th>
                <th className="p-1 whitespace-nowrap">產線別</th>
                <th className="p-1 whitespace-nowrap">轉速/進給倍率</th>
                <th className="p-1 whitespace-nowrap">運行狀態</th>
                <th className="p-1 whitespace-nowrap">
                  狀態持續時間
                  <span className="text-sm text-gray-300 "> min</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {machineInfoList.length > 0 ? (
                machineInfoList.map((item, index) => (
                  <tr
                    key={item.MachineId}
                    onClick={() => handleSelectMachineInfo(index)}
                    className="cursor-pointer hover:bg-gray-600"
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
                      className={`p-1 whitespace-nowrap ${machineStatusColor(item.Status)}`}
                    >
                      {machineStatus(item.Status)}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.StatusKeepTime === -1
                        ? "connection failed"
                        : handleStatusTime(item.StatusKeepTime)}
                    </td>
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
