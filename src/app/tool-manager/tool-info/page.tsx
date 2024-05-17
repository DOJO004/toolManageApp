"use client";
import SweetAlert from "@/components/sweetAlert";
import PieChart from "@/components/toolInfo/piechart";
import ToolInfoLog from "@/components/toolInfo/toolInfoLog";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import {
  GetToolStockListResponse,
  ToolStockItem,
} from "../../../components/toolInfo/types";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState<ToolStockItem[]>([]);
  const [toolInfoData, setToolInfoData] = useState<ToolStockItem>(
    {} as ToolStockItem
  );

  const getToolInfoList = async (count = 0) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      return;
    }
    try {
      const data = await apiGetToolStockList();
      const res = data as GetToolStockListResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("get tool stock list", res);

      if (reqInt === 0) {
        setToolInfoList(res.data.Values.StockToolList);
        setToolInfoData(res.data.Values.StockToolList[0]);
        return res.data.Values.StockToolList;
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      getToolInfoList(count + 1);
    }
  };

  const handleGetToolInfoData = (data: any) => {
    console.log("get tool info data", data);

    setToolInfoData(data);
  };

  const getLifeStatusClassName = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "text-green-500";
      case "NeedRepair":
        return "text-red-500";
      case "Repairing":
        return "text-amber-500";
      case "Scrap":
        return "text-gray-500";
      default:
        return "";
    }
  };

  const sortToolInfoList = (toolInfoList: ToolStockItem[]) => {
    const referenceTable: { [key: string]: number } = {
      Normal: 1,
      Repairing: 2,
      Scrap: 3,
    };

    const sortData = toolInfoList.sort((a, b) => {
      if (referenceTable[a.LifeStatus] > referenceTable[b.LifeStatus]) {
        return 1;
      }
      if (referenceTable[a.LifeStatus] < referenceTable[b.LifeStatus]) {
        return -1;
      }
      return 0;
    });
    return sortData;
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const toolInfoList = await getToolInfoList();
      if (toolInfoList) {
        const filterData = sortToolInfoList(toolInfoList).filter((item) => {
          return item.ToolSn.toLowerCase().includes(value.toLowerCase());
        });
        setToolInfoList(filterData);
      }
    }, 500);
  };

  const translateLifeStatus = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "正常";
      case "NeedRepair":
        return "需要修整";
      case "Repairing":
        return "修理中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  const handleToolPositionData = (positionStatus: number) => {
    switch (positionStatus) {
      case 0:
        return "倉儲中";
      case 1:
        return "移出倉儲";
      case 2:
        return "裝載中";
      default:
        return "未知狀態";
    }
  };

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    getToolInfoList();
  }, []);
  return (
    <div className="relative w-full h-full p-2 ">
      <div className="flex gap-2 ">
        <PieChart toolInfoData={toolInfoData} formatTime={formatTime} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-900 rounded-md h-[600px]">
        <div className="my-4">
          <h3 className="my-4">刀具狀態列表</h3>
          <input
            type="search"
            className="p-2 text-black rounded-md w-96"
            placeholder="搜尋刀具序號"
            onChange={(e) => searchTool(e.target.value)}
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">狀態 / 修整次數</th>
              <th className="p-1 whitespace-nowrap">裝載狀態 / 位置</th>
              <th className="p-1 whitespace-nowrap" title="公分表示">
                累積加工長度 <span className="text-sm text-gray-300">cm</span>
              </th>
              <th className="p-1 whitespace-nowrap">累積加工時間</th>
              <th className="p-1 whitespace-nowrap">累積加工次數</th>
            </tr>
          </thead>
          <tbody>
            {toolInfoList?.length > 0 ? (
              sortToolInfoList(toolInfoList).map((item, index) => (
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
                    {translateLifeStatus(item.LifeStatus)}
                    <span> / </span>
                    {item.LifeData.RepairCnt}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {handleToolPositionData(item.PositionData.PositionStatus)}
                    <span> / </span>
                    {/* 上機中的位置 */}
                    {item.PositionData.LoadingInfo?.MachineSpec.MachineName}
                    {/* 倉儲中的位置 */}
                    <span title="倉儲編號">
                      {item.PositionData.StorageInfo?.StorageNo}
                    </span>
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.ProcessLength / 10}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {formatTime(item.LifeData.ProcessTime)}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.ProcessCnt}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
