"use client";
import MachineLogInfo from "@/app/components/machineInfo/logInfo";
import MachineInfoPieChart from "@/app/components/machineInfo/pieChart";
import {
  GetMachineStatusInfoListResponse,
  MachineStatusItem,
} from "@/app/components/machineInfo/types";
import { apiGetMachineStatusList } from "@/scripts/Apis/dashboard/dashboard";
import { useEffect, useState } from "react";
export default function Page() {
  const [machineInfoList, setMachineInfoList] = useState<MachineStatusItem[]>(
    []
  );
  const [selectMachineInfo, setSelectMachineInfo] = useState<MachineStatusItem>(
    {} as MachineStatusItem
  );

  const getMachineInfoList = async () => {
    const data = await apiGetMachineStatusList();
    const res = data as GetMachineStatusInfoListResponse;
    console.log("get machine info list", res);

    if (res.data?.Values?.ReqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
      setSelectMachineInfo(res.data.Values.MachineStatusList[0]);
      return res.data.Values.MachineStatusList;
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

  const handleSelectMachineInfo = (item: MachineStatusItem) => {
    setSelectMachineInfo(item);
  };

  useEffect(() => {
    getMachineInfoList();
  }, []);
  return (
    <div className="w-full p-2 bg-gray-900 rounded-xl">
      <div className="gap-4 md:flex">
        <MachineInfoPieChart selectMachineInfo={selectMachineInfo} />
        <MachineLogInfo selectMachineInfo={selectMachineInfo} />
      </div>
      <div className="h-[40rem] p-2 my-4 bg-gray-700 rounded-md overflow-auto">
        <div className="grid justify-center my-4">
          <h3 className="my-2 text-center ">設備狀態</h3>
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
                <th className="p-1 whitespace-nowrap">連線狀態</th>
                <th className="p-1 whitespace-nowrap">運行狀態</th>
                <th className="p-1 whitespace-nowrap">狀態持續時間</th>
              </tr>
            </thead>
            <tbody>
              {machineInfoList.length > 0 ? (
                machineInfoList.map((item) => (
                  <tr
                    key={item.MachineId}
                    onClick={() => handleSelectMachineInfo(item)}
                    className="cursor-pointer hover:bg-gray-600"
                  >
                    <td className="p-1 whitespace-nowrap">Non</td>
                    <td className="p-1 whitespace-nowrap">
                      {item.ProductLineData.Name}
                    </td>
                    <td className={`p-1 whitespace-nowrap`}>
                      {item.CurrentParameter.SpindleRPM} /
                      {item.CurrentParameter.TotalFeedRate}
                    </td>
                    <td className="p-1 whitespace-nowrap">Non</td>
                    <td className="p-1 whitespace-nowrap">{item.Status}</td>
                    <td className="p-1 whitespace-nowrap">
                      {item.StatusKeepTime}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}> no data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
