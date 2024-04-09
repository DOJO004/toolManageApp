"use client";

import {
  apiRepairTool,
  apiRestockTool,
  apiScrapTool,
} from "@/scripts/Apis/repairAndScrap/repairAndScrap";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";

export default function RepairAndScrapIndex() {
  const [toolStockList, setToolStockList] = useState([]);

  const getToolStockList = async () => {
    const res = await apiGetToolStockList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    }
  };

  const postRepairTool = async (data: any) => {
    const confirm = window.confirm(`確定要送修 ${data.ToolSn}嗎?`);
    if (confirm) {
      const res = await apiRepairTool(data);
      console.log("repair tool ", res);
      getToolStockList();
    }
  };
  const postScrapTool = async (data: any) => {
    const confirm = window.confirm(`確定要報廢 ${data.ToolSn}嗎?`);
    if (confirm) {
      const res = await apiScrapTool(data);
      console.log("scrap tool", res);
      getToolStockList();
    }
  };

  const postRestockTool = async (data: any) => {
    const res = await apiRestockTool(data);
    console.log("reStock", res);
    getToolStockList();
  };

  useEffect(() => {
    getToolStockList();
  }, []);
  return (
    <div className="text-center ">
      <h3 className="my-4">修整 / 報廢</h3>
      <table className="w-full">
        <thead>
          <tr className="bg-indigo-500">
            <th className="p-1 whitespace-nowrap">刀具序號</th>
            <th className="p-1 whitespace-nowrap">刀具名稱</th>
            <th className="p-1 whitespace-nowrap">生命指數</th>
            <th className="p-1 whitespace-nowrap">目前狀態</th>
            <th className="p-1 whitespace-nowrap">已加工次數</th>
            <th className="p-1 whitespace-nowrap">已加工時間</th>
            <th className="p-1 whitespace-nowrap">已加工長度</th>
            <th className="p-1 whitespace-nowrap">修整次數</th>
            <th className="p-1 whitespace-nowrap">送修 / 重新入庫</th>
            <th className="p-1 whitespace-nowrap">報廢</th>
          </tr>
        </thead>
        <tbody>
          {toolStockList
            ? toolStockList.map((item) => (
                <tr key={item.ToolSn} className="hover:bg-gray-600">
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecName}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifePercentage}
                  </td>
                  <td className="p-1 whitespace-nowrap">{item.LifeStatus}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.ProcessCnt}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.ProcessTime}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.ProcessLength}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.RepairCnt}
                  </td>
                  {item.LifeStatus === "Normal" ? (
                    <td
                      className="p-1 cursor-pointer whitespace-nowrap"
                      onClick={() => postRepairTool(item)}
                    >
                      送修
                    </td>
                  ) : null}
                  {item.LifeStatus === "Repairing" ? (
                    <td
                      className="p-1 cursor-pointer whitespace-nowrap"
                      onClick={() => postRestockTool(item)}
                    >
                      重新入庫
                    </td>
                  ) : null}
                  {item.LifeStatus === "Scrap" ? <td> - </td> : null}
                  {item.LifeStatus !== "Scrap" ? (
                    <td
                      className="p-1 cursor-pointer whitespace-nowrap"
                      onClick={() => postScrapTool(item)}
                    >
                      報廢
                    </td>
                  ) : (
                    " - "
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
