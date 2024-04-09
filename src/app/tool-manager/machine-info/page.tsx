"use client";
import MachineLogInfo from "@/app/ui/machineInfo/logInfo";
import MachineInfoPieChart from "@/app/ui/machineInfo/pieChart";
import { apiGetMachineStatusList } from "@/scripts/Apis/dashboard/dashboard";
import { useEffect, useState } from "react";
export default function Page() {
  const [machineInfoList, setMachineInfoList] = useState([]);
  const [selectMachineInfo, setSelectMachineInfo] = useState({
    MachineId: "",
    ProductLineData: {
      Id: "",
      Name: "",
    },
    MacTypeData: {
      Id: "",
      Name: "",
    },
    Serial0: "",
    MachineIP: "",
    SystemData: {
      Brand: "",
      Series: "",
      MT: "",
    },
    Status: "",
    Activation: 0,
    CurrentParameter: {
      CurrentGcd: 0,
      TotalFeedRate: 0,
      SpindleRPM: 0,
      SpindleLoading: 0,
      SpindleSpeed: 0,
      CurrentProgram: "",
    },
    AtcLoadingList: [
      {
        AtcNo: 0,
        ToolSn: "",
      },
      {
        AtcNo: 0,
        ToolSn: "",
      },
    ],
    LoadingLogList: [],
    LastModify: "",
  });

  const getMachineInfoList = async () => {
    const res = await apiGetMachineStatusList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
      setSelectMachineInfo(res.data.Values.MachineStatusList[0]);
    }
  };

  const handleSelectMachineInfo = (item: any) => {
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
        <h3 className="my-4 text-center ">設備資訊</h3>
        <div className="overflow-auto text-center rounded-t-md">
          <table className="w-full">
            <thead className="bg-indigo-500 ">
              <tr>
                <th className="p-1 whitespace-nowrap">設備序號</th>
                <th className="p-1 whitespace-nowrap">產線別</th>
                <th className="p-1 whitespace-nowrap">運行狀態</th>
                <th className="p-1 whitespace-nowrap">轉速/進給倍率</th>
                <th className="p-1 whitespace-nowrap">更新時間</th>
              </tr>
            </thead>
            <tbody>
              {machineInfoList
                ? machineInfoList.map((item) => (
                    <tr
                      key={item.MachineId}
                      onClick={() => handleSelectMachineInfo(item)}
                      className="cursor-pointer hover:bg-gray-700"
                    >
                      <td className="p-1 whitespace-nowrap">
                        {item.MachineId}
                      </td>
                      <td className="p-1 whitespace-nowrap">
                        {item.ProductLineData.Name}
                      </td>
                      <td className="p-1 whitespace-nowrap">{item.Status}</td>
                      <td className="p-1 whitespace-nowrap">
                        {item.CurrentParameter.SpindleRPM} /{" "}
                        {item.CurrentParameter.TotalFeedRate}
                      </td>
                      <td className="p-1 whitespace-nowrap">
                        {item.LastModify}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
