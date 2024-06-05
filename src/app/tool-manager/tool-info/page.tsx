"use client";
import PieChart from "@/components/toolInfo/piechart";
import ToolInfoLog from "@/components/toolInfo/toolInfoLog";
import {
  formatMMToCM,
  formatTime,
  handleToolPositionData,
  sortToolInfoList,
  toolLifeStatusTextColor,
  translateLifeStatus,
} from "@/scripts/Apis/toolInfo/functions";
import { apiGetToolStockList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState<ToolStockItem[]>([]);
  const [toolInfoData, setToolInfoData] = useState<ToolStockItem>(
    {} as ToolStockItem
  );
  const [toolInfoIndex, setToolInfoIndex] = useState<Number>(0);

  const getToolInfoList = async () => {
    const toolStockList = await apiGetToolStockList(null);
    if (toolStockList.length > 0) {
      setToolInfoList(toolStockList);
      setToolInfoData(toolStockList[0]);
    }
  };

  const handleGetToolInfoData = (data: any, index: number) => {
    console.log("get tool info data", data);
    setToolInfoData(data);
    setToolInfoIndex(index);
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const toolInfoList = await apiGetToolStockList(null);
      if (toolInfoList) {
        const filterData = sortToolInfoList(toolInfoList).filter((item) => {
          return item.ToolSn.toLowerCase().includes(value.toLowerCase());
        });
        setToolInfoList(filterData);
      }
    }, 500);
  };

  useEffect(() => {
    getToolInfoList();
  }, []);
  return (
    <div className="relative w-full h-full p-2 ">
      <div className="grid grid-cols-2 gap-2">
        <PieChart toolInfoData={toolInfoData} formatTime={formatTime} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-900 rounded-md h-[600px]">
        <div className="sticky my-4 bg-gray-900 -top-2">
          <h3 className="my-4">刀具狀態列表</h3>
          <input
            type="search"
            className="p-2 text-black rounded-md w-96"
            placeholder="搜尋刀具序號"
            onChange={(e) => searchTool(e.target.value)}
          />
          <div className="grid grid-cols-6 mt-4 bg-indigo-500 ">
            <p className="p-1 font-bold whitespace-nowrap">刀具序號</p>
            <p className="p-1 font-bold whitespace-nowrap">狀態 / 修整次數</p>
            <p className="p-1 font-bold whitespace-nowrap">裝載狀態 / 位置</p>
            <p className="p-1 font-bold whitespace-nowrap" title="公分表示">
              累積加工長度 <span className="text-sm text-gray-300">cm</span>
            </p>
            <p className="p-1 font-bold whitespace-nowrap">累積加工時間</p>
            <p className="p-1 font-bold whitespace-nowrap">累積加工次數</p>
          </div>
        </div>
        {toolInfoList?.length > 0 ? (
          sortToolInfoList(toolInfoList).map((item, index) => (
            <div
              key={item.ToolSn}
              className={`cursor-pointer grid grid-cols-6 hover:bg-gray-600 ${toolInfoIndex === index ? "bg-gray-600" : ""}`}
              onClick={() => handleGetToolInfoData(item, index)}
            >
              <p className="p-1 whitespace-nowrap">{item.ToolSn}</p>
              <p
                className={`p-1 whitespace-nowrap ${toolLifeStatusTextColor(
                  item.LifeStatus
                )}`}
              >
                {translateLifeStatus(item.LifeStatus)}
                <span> / </span>
                {item.LifeData.RepairCnt}
              </p>
              <p className="p-1 whitespace-nowrap">
                {handleToolPositionData(item.PositionData.PositionStatus)}
                <span> / </span>
                {/* 上機中的位置 */}
                {item.PositionData.LoadingInfo?.MachineSpec.MachineName}
                {/* 倉儲中的位置 */}
                <span title="倉儲編號">
                  {item.PositionData.StorageInfo?.StorageName}
                </span>
              </p>
              <p className="p-1 whitespace-nowrap">
                {formatMMToCM(item.LifeData.ProcessLength)}
              </p>
              <p className="p-1 whitespace-nowrap">
                {formatTime(item.LifeData.ProcessTime)}
              </p>
              <p className="p-1 whitespace-nowrap">
                {item.LifeData.ProcessCnt}
              </p>
            </div>
          ))
        ) : (
          <div>
            <p className="col-span-6 text-center">loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
