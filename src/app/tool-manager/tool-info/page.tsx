"use client";
import PieChart from "@/app/ui/toolInfo/piechart";
import ToolInfoLog from "@/app/ui/toolInfo/toolInfoLog";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  GetToolInfoData,
  ToolStockItem,
} from "../../ui/toolInfo/types";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState<ToolStockItem[]>([]);
  const [toolInfoData, setToolInfoData] = useState<ToolStockItem>(
    {} as ToolStockItem
  );

  const getToolInfoList = async () => {
    const data = await apiGetToolStockList();
    const res = data as ApiResponse;
    console.log("get tool stock list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolInfoList(res.data.Values.ToolStockList);
      setToolInfoData(res.data.Values.ToolStockList[0]);
    }
  };

  const handleGetToolInfoData = (data: GetToolInfoData) => {
    console.log("get tool info data", data);

    setToolInfoData(data);
  };

  const getLifeStatusClassName = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "text-green-500";
      case "Repairing":
        return "text-amber-500";
      case "Scrap":
        return "text-gray-500";
      default:
        return "";
    }
  };

  useEffect(() => {
    getToolInfoList();
  }, []);
  return (
    <div className="w-full h-full p-2 bg-gray-900 rounded-lg ">
      <div className="flex flex-col w-full md:flex-row">
        <PieChart toolInfoData={toolInfoData} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-700 rounded-md h-[40rem] ">
        <h3 className="my-4">刀具狀態列表</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">狀態/修整次數</th>
              <th className="p-1 whitespace-nowrap">裝載狀態/設備</th>
              <th className="p-1 whitespace-nowrap">累積加工長度</th>
              <th className="p-1 whitespace-nowrap">累積加工時間</th>
              <th className="p-1 whitespace-nowrap">累積加工次數</th>
            </tr>
          </thead>
          <tbody>
            {toolInfoList
              ? toolInfoList.map((item) => (
                  <tr
                    key={item.ToolSn}
                    className="cursor-pointer hover:bg-gray-600"
                    onClick={() => handleGetToolInfoData(item)}
                  >
                    <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                    <td
                      className={`p-1 whitespace-nowrap ${getLifeStatusClassName(
                        item.LifeStatus
                      )}`}
                    >
                      {item.LifeStatus} / {item.LifeData.RepairCnt}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.LoadingData.IsLoading
                        ? `裝載中 / ${item.LoadingData.MachineId}`
                        : "未裝載"}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.LifeData.ProcessLength}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.LifeData.ProcessTime}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.LifeData.ProcessCnt}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
