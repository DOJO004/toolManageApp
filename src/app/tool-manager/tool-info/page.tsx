"use client";
import PieChart from "@/components/toolInfo/piechart";
import ToolInfoLog from "@/components/toolInfo/toolInfoLog";
import { apiGetMachineSpecList } from "@/scripts/Apis/machineInfo/machineInfoApis";
import {
  formatMMToCM,
  formatTime,
  handleToolPositionData,
  sortToolInfoList,
  toolLifeStatusTextColor,
  translateLifeStatus,
} from "@/scripts/Apis/toolInfo/functions";
import {
  apiGetStorageList,
  apiGetToolStockList,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import { FilterData, ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState<ToolStockItem[]>([]);
  const [toolInfoData, setToolInfoData] = useState<ToolStockItem>(
    {} as ToolStockItem
  );
  const [toolInfoIndex, setToolInfoIndex] = useState<Number>(0);
  const [positionList, setPositionList] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<FilterData>({
    toolState: [],
    activeState: [],
    position: [],
  });

  const getToolInfoList = async () => {
    const toolStockList = await apiGetToolStockList(null);
    if (toolStockList.length > 0) {
      setToolInfoList(toolStockList);
      setToolInfoData(toolStockList[0]);
    }
  };

  const handleSetPositionList = async () => {
    const storageList = await apiGetStorageList();
    const machineList = await apiGetMachineSpecList();
    const storageNames = storageList.map((item) => item.Name);
    const machineNames = machineList.map((item) => item.Name);

    const positionData = [...storageNames, ...machineNames];

    setPositionList(positionData);
  };

  const handleSetFilterData = (
    type: "toolState" | "activeState" | "position",
    item: string | number
  ) => {
    setFilterData((prevState) => ({
      ...prevState,
      [type]: updateArray(prevState[type], item),
    }));
  };

  const updateArray = <T extends string | number>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  const handleGetToolInfoData = (data: any, index: number) => {
    setToolInfoData(data);
    setToolInfoIndex(index);
  };

  // 篩選選擇的刀具狀態、裝載狀態、位置
  const filterToolStatusList = async () => {
    const toolDataList = await apiGetToolStockList(null);
    if (
      filterData.toolState.length === 0 &&
      filterData.position.length === 0 &&
      filterData.activeState.length === 0
    ) {
      setToolInfoList(toolDataList);
      return;
    }
    const filteredToolDataList = toolDataList.filter((item) => {
      const matchToolStatus =
        filterData.toolState.length === 0 ||
        filterData.toolState.includes(item.LifeStatus);
      const matchActiveState =
        filterData.activeState.length === 0 ||
        filterData.activeState.includes(item.PositionData.PositionStatus);
      const matchStoragePosition =
        filterData.position.length === 0 ||
        filterData.position.includes(
          item.PositionData.StorageInfo?.StorageName
        );
      const matchMachineName =
        filterData.position.length === 0 ||
        filterData.position.includes(
          item.PositionData.LoadingInfo?.MachineSpec.MachineName
        );

      return (
        matchToolStatus &&
        matchActiveState &&
        (matchStoragePosition || matchMachineName)
      );
    });

    setToolInfoList(filteredToolDataList);
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      if (value === "") {
        setToolInfoList(await apiGetToolStockList(null));
        cleanFilterData();
        return;
      }
      const filterData = sortToolInfoList(toolInfoList).filter((item) => {
        return item.ToolSn.toLowerCase().includes(value.toLowerCase());
      });
      setToolInfoList(filterData);
    }, 500);
  };

  const cleanFilterData = () => {
    setFilterData({
      toolState: [],
      activeState: [],
      position: [],
    });
  };

  useEffect(() => {
    getToolInfoList();
    handleSetPositionList();
  }, []);

  useEffect(() => {
    filterToolStatusList();
  }, [filterData]);
  return (
    <div className="relative w-full h-full p-2 ">
      <div className="grid grid-cols-2 gap-2">
        <PieChart toolInfoData={toolInfoData} formatTime={formatTime} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-900 rounded-md h-[600px]">
        <div className="sticky my-4 bg-gray-900 -top-2">
          <h3 className="my-4">刀具狀態列表</h3>
          <div>
            <div className="flex justify-center gap-2">
              <input
                type="search"
                className="p-2 text-black rounded-md w-96"
                placeholder="搜尋刀具序號"
                onChange={(e) => searchTool(e.target.value)}
              />
              <button onClick={() => setFilterMode(!filterMode)}>
                <Image
                  src="/icons/filter.svg"
                  alt="filter"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {/* filter */}
            <div
              className={`transition-all duration-300 ease-in-out my-4 overflow-hidden ${filterMode ? "h-32" : "h-0"}`}
            >
              <div className="flex items-center justify-center gap-2 my-2">
                <label htmlFor="">狀態:</label>
                <ul className="flex gap-2">
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Normal") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Normal")}
                  >
                    正常
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Warning") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Warning")}
                  >
                    警告
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Alarm") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Alarm")}
                  >
                    警報
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("NeedRepair") ? "bg-indigo-500" : ""}`}
                    onClick={() =>
                      handleSetFilterData("toolState", "NeedRepair")
                    }
                  >
                    需要維修
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Repairing") ? "bg-indigo-500" : ""}`}
                    onClick={() =>
                      handleSetFilterData("toolState", "Repairing")
                    }
                  >
                    維修中
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center gap-2 my-2">
                <label htmlFor="">裝載狀態:</label>
                <ul className="flex gap-2">
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(0) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 0)}
                  >
                    倉儲中
                  </li>
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(1) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 1)}
                  >
                    移出倉儲
                  </li>
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(2) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 2)}
                  >
                    裝載中
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center gap-2 my-2">
                <label htmlFor="">位置:</label>
                <ul className="flex gap-2">
                  {positionList.map((item) => (
                    <li
                      key={item}
                      className={`p-1 border rounded-md cursor-pointer ${filterData.position.includes(item) ? "bg-indigo-500" : ""}`}
                      onClick={() => handleSetFilterData("position", item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
