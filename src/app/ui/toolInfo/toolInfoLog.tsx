"use client";

import { apiGetToolLoadingLogList } from "@/scripts/Apis/toolInfo/toolInfo";
import { useEffect, useState } from "react";
import {
  GetToolInfoData,
  GetToolLoadingLogResponse,
  ToolLoadingItem,
} from "./types";

interface ToolInfoLogProps {
  toolInfoData: GetToolInfoData;
}
const ToolInfoLog = ({ toolInfoData }: ToolInfoLogProps) => {
  const [toolLogData, setToolLogData] = useState<ToolLoadingItem[]>([]);

  const getToolLogData = async () => {
    cleanToolLogData();
    const data = await apiGetToolLoadingLogList(toolInfoData.ToolSn);
    const res = data as GetToolLoadingLogResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setToolLogData(res.data.Values.ToolMacLoadingOpsList);
    }
  };

  const cleanToolLogData = () => {
    setToolLogData([]);
  };

  useEffect(() => {
    getToolLogData();
  }, [toolInfoData]);
  return (
    <div className="w-full p-2 mb-2 overflow-auto text-xs bg-gray-700 max-h-80 rounded-xl">
      <h3 className="mb-4 font-bold border-b-2 ">刀具裝卸載日誌</h3>
      <div className="overflow-auto rounded-md ">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 text-xl whitespace-nowrap">設備序號</th>
              <th className="p-1 text-xl whitespace-nowrap">動作</th>
              <th className="p-1 text-xl whitespace-nowrap">刀庫號</th>
              <th className="p-1 text-xl whitespace-nowrap">動作時間</th>
            </tr>
          </thead>
          <tbody>
            {toolLogData?.length > 0 ? (
              toolLogData.map((item) => (
                <tr key={item.LogTime}>
                  <td>{item.MachineId}</td>
                  <td>{item.OpActions}</td>
                  <td>{item.AtcNo}</td>
                  <td>{item.LogTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>no data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolInfoLog;
