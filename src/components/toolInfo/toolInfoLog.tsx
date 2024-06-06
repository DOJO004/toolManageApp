"use client";

import { apiGetToolLoadingLogList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolLoadingItem, ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { useEffect, useState } from "react";

interface ToolInfoLogProps {
  toolInfoData: ToolStockItem;
}
const ToolInfoLog = ({ toolInfoData }: ToolInfoLogProps) => {
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

  const setOpActionsText = (opActions: number) => {
    switch (opActions) {
      case 0:
        return "入庫";
      case 1:
        return "重新入庫";
      case 2:
        return "出庫";
      case 3:
        return "修整";
      case 4:
        return "裝載";
      case 5:
        return "卸載";
      case -99:
        return "強制失敗";
      case -1:
        return "報廢";
      default:
        return "無法辨識此狀態";
    }
  };

  useEffect(() => {
    getToolLogData();
  }, [toolInfoData]);
  return (
    <div className="w-full p-2 mb-2 overflow-auto text-xs bg-gray-900 max-h-80 rounded-xl">
      <h3 className="mb-4 font-bold text-center border-b-2 ">刀具裝卸載日誌</h3>
      <div className="overflow-auto rounded-md ">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 text-xl whitespace-nowrap">設備名稱</th>
              <th className="p-1 text-xl whitespace-nowrap">狀態</th>
              <th className="p-1 text-xl whitespace-nowrap">刀庫號</th>
              <th className="p-1 text-xl whitespace-nowrap">更新時間</th>
            </tr>
          </thead>
          <tbody>
            {toolLogData?.length > 0 ? (
              toolLogData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.MachineLoading?.MachineSpec?.MachineName || " - "}
                  </td>
                  <td>{setOpActionsText(item.OpActions)}</td>
                  <td>{item.StockInfo?.StorageName || "-"}</td>
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
