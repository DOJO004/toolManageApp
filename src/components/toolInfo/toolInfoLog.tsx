"use client";

import { LangContext } from "@/app/[lang]/layout";
import { setOpActionsText } from "@/scripts/Apis/toolInfo/functions";
import { apiGetToolLoadingLogList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolLoadingItem, ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { useContext, useEffect, useState } from "react";
import DefaultSkeleton from "../skeletons/default";

interface ToolInfoLogProps {
  toolInfoData: ToolStockItem;
}
const ToolInfoLog = ({ toolInfoData }: ToolInfoLogProps) => {
  const dict = useContext(LangContext);
  const [toolLogData, setToolLogData] = useState<ToolLoadingItem[]>([]);

  const getToolLogData = async () => {
    cleanToolLogData();
    const toolLoadingLogList = await apiGetToolLoadingLogList(
      toolInfoData?.ToolSn
    );
    if (!toolLoadingLogList) return;
    setToolLogData(toolLoadingLogList);
  };

  const cleanToolLogData = () => {
    setToolLogData([]);
  };

  useEffect(() => {
    getToolLogData();
  }, [toolInfoData]);

  if (!dict) return <DefaultSkeleton />;
  return (
    <div className="w-full p-2 mb-2 overflow-auto text-xs text-center bg-gray-900 max-h-80 rounded-xl">
      <div className="sticky bg-gray-900 -top-2">
        <h3 className="mb-4 font-bold border-b-2 ">
          {dict.tool_info.tool_install_log.title}
        </h3>
        <div className="grid items-center grid-cols-4 bg-indigo-500">
          <p className="p-1 text-xl font-bold whitespace-nowrap">
            {dict.tool_info.tool_install_log.machine_name}
          </p>
          <p className="p-1 text-xl font-bold whitespace-nowrap">
            {dict.tool_info.tool_install_log.status}
          </p>
          <p className="p-1 text-xl font-bold whitespace-nowrap">
            {dict.tool_info.tool_install_log.storage_name}
          </p>
          <p className="p-1 text-xl font-bold whitespace-nowrap">
            {dict.tool_info.tool_install_log.update_time}
          </p>
        </div>
      </div>
      {toolLogData?.length > 0 ? (
        toolLogData.map((item, index) => (
          <div key={index} className="grid items-center grid-cols-4">
            <p>{item.MachineLoading?.MachineSpec?.MachineName || " - "}</p>
            <p>{setOpActionsText(item.OpActions)}</p>
            <p>{item.StockInfo?.StorageName || "-"}</p>
            <p>{item.LogTime}</p>
          </div>
        ))
      ) : (
        <div>no data...</div>
      )}
    </div>
  );
};

export default ToolInfoLog;
