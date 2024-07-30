"use client";
import { LangContext } from "@/components/context/langContext";
import DefaultSkeleton from "@/components/skeletons/default";
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
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const dict = useContext(LangContext);
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

  if (!dict) return <DefaultSkeleton />;

  return (
    <div className="relative w-full h-full p-2 ">
      <div className="grid grid-cols-2 gap-2">
        <PieChart toolInfoData={toolInfoData} formatTime={formatTime} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-900 rounded-md h-[600px]">
        <div className="sticky my-4 bg-gray-900 -top-2">
          <h3 className="my-4">{dict.tool_info.title}</h3>
          <div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="search"
                className="p-2 text-black rounded-md w-96"
                placeholder={dict.tool_info.search.search_tool_placeholder}
                onChange={(e) => searchTool(e.target.value)}
              />
              <button
                className={`hover:bg-gray-500 rounded-full h-fit p-1 ${filterMode ? "bg-gray-500" : ""}`}
                onClick={() => setFilterMode(!filterMode)}
              >
                <Image
                  src="/images/icons/filter.svg"
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
                <p>{dict.tool_info.search.status.label}:</p>
                <ul className="flex gap-2">
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Normal") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Normal")}
                  >
                    {dict.tool_info.search.status.normal}
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Warning") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Warning")}
                  >
                    {dict.tool_info.search.status.warning}
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Alarm") ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("toolState", "Alarm")}
                  >
                    {dict.tool_info.search.status.alarm}
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("NeedRepair") ? "bg-indigo-500" : ""}`}
                    onClick={() =>
                      handleSetFilterData("toolState", "NeedRepair")
                    }
                  >
                    {dict.tool_info.search.status.need_repair}
                  </li>
                  <li
                    className={`cursor-pointer p-1 border rounded-md ${filterData.toolState.includes("Repairing") ? "bg-indigo-500" : ""}`}
                    onClick={() =>
                      handleSetFilterData("toolState", "Repairing")
                    }
                  >
                    {dict.tool_info.search.status.repairing}
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center gap-2 my-2">
                <p>{dict.tool_info.search.active_state.label}:</p>
                <ul className="flex gap-2">
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(0) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 0)}
                  >
                    {dict.tool_info.search.active_state.in_storage}
                  </li>
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(1) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 1)}
                  >
                    {dict.tool_info.search.active_state.move_out_storage}
                  </li>
                  <li
                    className={`p-1 border rounded-md cursor-pointer ${filterData.activeState.includes(2) ? "bg-indigo-500" : ""}`}
                    onClick={() => handleSetFilterData("activeState", 2)}
                  >
                    {dict.tool_info.search.active_state.in_use}
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center gap-2 my-2">
                <p>{dict.tool_info.search.location.label}:</p>
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
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.tool_sn}
            </p>
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.status} / {dict.tool_info.repair_times}
            </p>
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.loading} / {dict.tool_info.location}
            </p>
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.process_length}{" "}
              <span className="text-sm text-gray-300">cm</span>
            </p>
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.process_time}
            </p>
            <p className="p-1 font-bold whitespace-nowrap">
              {dict.tool_info.process_count}
            </p>
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
                <span>{item.PositionData.StorageInfo?.StorageName}</span>
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
          <div>no data...</div>
        )}
      </div>
    </div>
  );
}
