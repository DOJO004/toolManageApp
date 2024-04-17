"use client";

import { apiGetToolStockCountList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import NewToolStock from "./new";
import {
  GetToolStockListResponse,
  ToolStatusItem,
  ToolStockItem,
} from "./types";

const ToolStockIndex = () => {
  const [toolStockList, setToolStockList] = useState<ToolStockItem[]>([]);
  const [newToolStockMode, setNewToolStockMode] = useState(false);
  const [selectToolStock, setSelectToolStock] = useState<
    { name: string; checked: boolean }[]
  >([]);
  const [toolSpecClass, setToolSpecClass] = useState<string[]>([]);

  const getToolStockList = async () => {
    const data = await apiGetToolStockCountList();
    const res = data as GetToolStockListResponse;
    console.log("get tool stock list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.StockToolCountList);

      // 使用 Set 來過濾重複元素
      const uniqueToolSpecNames = new Set<string>();
      res.data.Values.StockToolCountList.forEach((item) => {
        uniqueToolSpecNames.add(item.ToolSpecName);
      });

      // 將 Set 轉換為陣列，然後更新 toolSpecClass 狀態
      setToolSpecClass(Array.from(uniqueToolSpecNames));
    }
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    if (value) {
      setSelectToolStock((prev) => [...prev, { name: name, checked: value }]);
    } else {
      setSelectToolStock((prev) => prev.filter((item) => item.name !== name));
    }
  };

  const filterToolStockList = async () => {
    const data = await apiGetToolStockCountList();
    const res = data as GetToolStockListResponse;

    if (selectToolStock.length === 0) {
      setToolStockList(res.data.Values.StockToolCountList);
      return;
    }

    if (res?.data?.Values?.ReqInt === 0) {
      const filterData = res.data.Values.StockToolCountList.filter((item) =>
        selectToolStock.map((obj) => obj.name).includes(item.ToolSpecName)
      );
      filterData.length > 0 ? setToolStockList(filterData) : null;
    }
  };

  const sortToolStockList = (toolList: ToolStatusItem[]) => {
    const sortData = toolList.sort((a, b) => {
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

      // 如果 LifeStatus 相同，則按照其他屬性進行排序，例如 ToolSn
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

  const getToolStatusClass = (status: string) => {
    switch (status) {
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

  const translateToolStatus = (status: string) => {
    switch (status) {
      case "Normal":
        return "正常";
      case "Repairing":
        return "維修中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  useEffect(() => {
    getToolStockList();
  }, []);

  useEffect(() => {
    filterToolStockList();
  }, [selectToolStock]);

  return (
    <div className="relative w-full h-screen p-2 mx-auto overflow-auto text-center rounded-xl">
      <div className="relative ">
        <h2 className="my-4">刀具庫存</h2>
        <button
          className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
          onClick={() => setNewToolStockMode(!newToolStockMode)}
        >
          新增
        </button>
        <div className="flex justify-center gap-2">
          {toolSpecClass.map((name) => (
            <div key={name}>
              <input
                type="checkbox"
                id={name}
                onChange={(e) => handleCheckboxChange(name, e.target.checked)}
              />
              <label htmlFor={name}>{name}</label>
            </div>
          ))}
        </div>
        {/* new */}
        <div
          className={` overflow-hidden transition-all duration-300 easy-in-out ${
            newToolStockMode ? "h-52" : "h-0"
          }`}
        >
          <NewToolStock
            getToolStockList={getToolStockList}
            setNewToolStockMode={setNewToolStockMode}
          />
        </div>
      </div>

      {toolStockList?.length > 0
        ? toolStockList.map((item: ToolStockItem, index: number) => (
            <div key={item.ToolSpecId} className="relative ">
              <div className="sticky top-0 ">
                <div className="flex items-center p-2 bg-gray-700 rounded-md">
                  <h3 className="p-1 my-2 font-bold text-left ">
                    {item.ToolSpecName}
                  </h3>
                  <p>
                    安全庫存 :<span className="text-">{item.SafetyStock}</span>
                  </p>
                  <p>
                    現有庫存 :
                    <span className="text-green-500">{item.CurrentStock}</span>
                  </p>
                  <p>
                    危險 :
                    <span className="text-amber-500">{item.WarningCount}</span>
                  </p>
                  <p>
                    警告 :
                    <span className="text-red-500">{item.AlarmCount}</span>
                  </p>
                </div>
                <div className="grid grid-cols-7 gap-2 bg-indigo-500 ">
                  <p className="p-1 whitespace-nowrap">ToolSN</p>
                  <p className="p-1 whitespace-nowrap">狀態</p>
                  <p className="p-1 whitespace-nowrap">生命百分比</p>
                  <p className="p-1 whitespace-nowrap">最後修改時間</p>
                  <p className="p-1 whitespace-nowrap">machine_id</p>
                  <p className="p-1 whitespace-nowrap">所在位置</p>
                  <p className="p-1 whitespace-nowrap">領用人</p>
                </div>
              </div>
              {item.ToolStatusList.length > 0
                ? sortToolStockList(item.ToolStatusList).map(
                    (item: ToolStatusItem) => (
                      <div
                        key={item.ToolSn}
                        className="grid grid-cols-7 gap-2 hover:bg-gray-600"
                      >
                        <p>{item.ToolSn}</p>
                        <p className={getToolStatusClass(item.LifeStatus)}>
                          {translateToolStatus(item.LifeStatus)}
                        </p>
                        <p>{item.LifePercentage}</p>
                        <p>{item.LastModify}</p>
                      </div>
                    )
                  )
                : null}
            </div>
          ))
        : null}
    </div>
  );
};

export default ToolStockIndex;
