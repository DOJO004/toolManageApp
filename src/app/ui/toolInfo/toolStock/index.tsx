"use client";

import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import NewToolStock from "./new";

const ToolStockIndex = () => {
  const [toolStockList, setToolStockList] = useState([]);
  const [newToolStockMode, setNewToolStockMode] = useState(false);

  const getToolStockList = async () => {
    const res = await apiGetToolStockList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    }
  };

  useEffect(() => {
    getToolStockList();
  }, []);
  return (
    <div className="relative w-full p-2 mx-auto text-center bg-gray-900 rounded-xl">
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
      <div className="w-full h-full max-w-6xl mx-auto overflow-auto bg-gray-700 shadow-md rounded-t-xl">
        <table className="w-full h-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap">刀具類型</th>
              <th className="p-1 whitespace-nowrap">刀具 SN</th>
              <th className="p-1 whitespace-nowrap">刀具規格 ID</th>
              <th className="p-1 whitespace-nowrap">庫存安全線</th>
              <th className="p-1 whitespace-nowrap">警告</th>
              <th className="p-1 whitespace-nowrap">危險</th>
              <th className="p-1 whitespace-nowrap">待修中</th>
              <th className="p-1 whitespace-nowrap">修整中</th>
              <th className="p-1 whitespace-nowrap">可使用</th>
            </tr>
          </thead>
          <tbody>
            {toolStockList.map((item, index) => (
              <tr
                key={item.ToolSn}
                className="text-center cursor-pointer hover:bg-gray-600"
              >
                <td className="p-1">{item.ToolTypeData.Name}</td>
                <td className="p-1">{item.ToolSn}</td>
                <td className="p-1">{item.ToolSpecId}</td>
                <td className="p-1">{item.safetyStock}</td>
                <td className="p-1">{item.Warning}</td>
                <td className="p-1">{item.Danger}</td>
                <td className="p-1">{item.Pending}</td>
                <td className="p-1">{item.LifeData.RepairCnt}</td>
                <td className="p-1">{item.Usable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolStockIndex;
