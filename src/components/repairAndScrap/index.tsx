"use client";

import {
  apiRepairTool,
  apiRestockTool,
  apiScrapTool,
} from "@/scripts/Apis/repairAndScrap/repairAndScrap";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { FormEvent, useEffect, useState } from "react";
import {
  GetToolStockInfoListResponse,
  ToolStockListItem,
} from "../toolInfo/toolStock/types";

export default function RepairAndScrapIndex() {
  const [toolStockList, setToolStockList] = useState<ToolStockListItem[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");

  const getToolStockList = async () => {
    const data = await apiGetToolStockList();
    const res = data as GetToolStockInfoListResponse;
    console.log("get tool stock list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      const sortData = sortToolList(res.data.Values.StockToolList);
      const filterData = filterToolStatus(sortData);
      setToolStockList(filterData);
      return res.data.Values.StockToolList;
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

  const filterToolStatus = (data: ToolStockListItem[]) => {
    return data.filter(
      (item) => item.LifeStatus === "Repairing" || item.LifeStatus === "Scrap"
    );
  };

  const filterToolList = async (e: FormEvent) => {
    e.preventDefault();
    const data = await getToolStockList();
    if (data) {
      const filterData = data.filter((item) => {
        return (
          item.ToolSn.includes(inputSearch) ||
          item.ToolTypeData.Name.includes(inputSearch)
        );
      });
      setToolStockList(filterData);
    }
  };

  const sortToolList = (data: ToolStockListItem[]) => {
    const sortData = data.slice().sort((a, b) => {
      // 定義 LifeStatus 的排序優先順序
      const statusOrder: { [key: string]: number } = {
        Normal: 1,
        Repairing: 2,
        Scrap: 3,
      };

      // 比較 LifeStatus 的優先順序
      const statusComparison =
        statusOrder[a.LifeStatus] - statusOrder[b.LifeStatus];
      if (statusComparison !== 0) {
        return statusComparison;
      }

      // 如果 LifeStatus 相同，則按照 ToolSn 進行排序
      if (a.ToolSn < b.ToolSn) {
        return -1;
      }
      if (a.ToolSn > b.ToolSn) {
        return 1;
      }
      return 0;
    });
    return sortData;
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

  const showLifeStatusText = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "正常";
      case "Repairing":
        return "修整中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  useEffect(() => {
    getToolStockList();
  }, []);
  return (
    <div className="overflow-auto text-center ">
      <form className="my-4" onSubmit={(e) => filterToolList(e)}>
        <h3>修整 / 報廢</h3>
        <input
          type="search"
          className="p-2 my-2 text-black rounded-md w-96"
          placeholder="搜尋序號 / 名稱"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </form>
      <div className="overflow-auto bg-gray-900 rounded-t-md">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">刀具名稱</th>
              <th className="p-1 whitespace-nowrap">生命指數</th>
              <th className="p-1 whitespace-nowrap">狀態</th>
              <th className="p-1 whitespace-nowrap">修整次數 / 最大修整次數</th>
              <th className="p-1 whitespace-nowrap">報廢 / 修整時間</th>
              <th className="p-1 whitespace-nowrap">報廢 / 修整人員</th>
              <th className="p-1 whitespace-nowrap">送修 / 重新入庫</th>
              <th className="p-1 whitespace-nowrap">報廢</th>
            </tr>
          </thead>
          <tbody>
            {toolStockList.length > 0 ? (
              toolStockList.map((item: any) => (
                <tr key={item.ToolSn} className="hover:bg-gray-600 ">
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecName}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifePercentage}
                  </td>
                  <td
                    className={`p-1 whitespace-nowrap ${getLifeStatusClassName(
                      item.LifeStatus
                    )}`}
                  >
                    {showLifeStatusText(item.LifeStatus)}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.RepairCnt} / {item.LifeData.ProcessCnt}
                  </td>
                  <td></td>
                  <td></td>
                  {item.LifeStatus === "Normal" ? (
                    <td
                      className="p-1 whitespace-nowrap"
                      onClick={() => postRepairTool(item)}
                    >
                      <button className="p-1 rounded-md bg-amber-500 hover:bg-amber-600 ">
                        送修
                      </button>
                    </td>
                  ) : null}
                  {item.LifeStatus === "Repairing" ? (
                    <td
                      className="p-1 whitespace-nowrap"
                      onClick={() => postRestockTool(item)}
                    >
                      重新入庫
                    </td>
                  ) : null}
                  {item.LifeStatus === "Scrap" ? <td> - </td> : null}
                  {item.LifeStatus !== "Scrap" ? (
                    <td
                      className="p-1 whitespace-nowrap"
                      onClick={() => postScrapTool(item)}
                    >
                      <button className="p-1 bg-red-500 rounded-md hover:bg-red-600 ">
                        報廢
                      </button>
                    </td>
                  ) : (
                    " - "
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12}>no data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
