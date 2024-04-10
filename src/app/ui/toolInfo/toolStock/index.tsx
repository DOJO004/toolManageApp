"use client";

import { apiGetToolStockCountList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import NewToolStock from "./new";

const ToolStockIndex = () => {
  const [toolStockList, setToolStockList] = useState([]);
  const [newToolStockMode, setNewToolStockMode] = useState(false);

  const getToolStockList = async () => {
    const res = await apiGetToolStockCountList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.StockToolCountList);
    }
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
    getToolStockList();
  }, []);
  return (
    <div className="relative w-full h-screen p-2 mx-auto overflow-auto text-center rounded-xl">
      <div className="relative ">
        <button
          className="absolute translate-x-[150%] bg-gray-600"
          onClick={() => setNewToolStockMode(!newToolStockMode)}
        >
          新增
        </button>
        <h2 className="my-4">刀具庫存</h2>
      </div>
      {/* new */}
      <div
        className={` overflow-hidden transition-all duration-300 easy-in-out ${
          newToolStockMode ? "h-96" : "h-0"
        }`}
      >
        <NewToolStock getToolStockList={getToolStockList} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {toolStockList
          ? toolStockList.map((item) => (
              <div
                key={item.ToolSpecId}
                className="p-2 my-4 overflow-auto h-[50rem] bg-gray-700 rounded-md"
              >
                <h3 className="my-2">{item.ToolSpecName}</h3>
                <div className="flex justify-center gap-2 my-2">
                  <p>
                    安全庫存 : <span className="text-">{item.SafetyStock}</span>
                  </p>
                  <p>
                    現有庫存 :{" "}
                    <span className="text-green-500">{item.CurrentStock}</span>
                  </p>
                  <p>
                    危險 :{" "}
                    <span className="text-amber-500">{item.WarningCount}</span>
                  </p>
                  <p>
                    警告 :{" "}
                    <span className="text-red-500">{item.AlarmCount}</span>
                  </p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-500">
                      <th className="p-1 whitespace-nowrap">ToolSN</th>
                      <th className="p-1 whitespace-nowrap">狀態</th>
                      <th className="p-1 whitespace-nowrap">生命百分比</th>
                      <th className="p-1 whitespace-nowrap">最後修改時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.ToolStatusList.map((tool) => (
                      <tr key={tool.ToolSn}>
                        <td className="p-1 whitespace-nowrap">{tool.ToolSn}</td>
                        <td
                          className={`p-1 whitespace-nowrap ${getLifeStatusClassName(
                            tool.LifeStatus
                          )}`}
                        >
                          {tool.LifeStatus}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {tool.LifePercentage}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {tool.LastModify}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ToolStockIndex;
