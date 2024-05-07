"use client";

import { apiGetToolStockCountList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import SweetAlert from "../../sweetAlert";
import NewToolStock from "./new";
import {
  GetToolStockCountListResponse,
  StockToolCountItem,
  ToolStatusItem,
  ToolStockItem,
} from "./types";

const ToolStockIndex = () => {
  const [toolStockList, setToolStockList] = useState<StockToolCountItem[]>([]);
  const [newToolStockMode, setNewToolStockMode] = useState(false);
  const [selectToolStock, setSelectToolStock] = useState<
    { name: string; checked: boolean }[]
  >([]);
  const [toolSpecClass, setToolSpecClass] = useState<string[]>([]);

  const getToolStockList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
    } else {
      const data = await apiGetToolStockCountList();
      const res = data as GetToolStockCountListResponse;
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
      } else {
        getToolStockList(count + 1);
      }
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
    const res = data as GetToolStockCountListResponse;

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
        return "text-gray-400";
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
    <div className="relative w-full  p-2 mx-auto overflow-auto text-center rounded-xl">
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
            <div className="relative mt-8 " key={item.ToolSpecId}>
              <div className="sticky top-0 grid items-center grid-cols-12 p-2 bg-gray-900 rounded-md">
                <h3 className="p-1 my-2 font-bold text-left ">
                  {item.ToolSpecName}
                </h3>
                <div className="flex items-center justify-between w-full col-span-11">
                  <div className="flex items-center gap-2">
                    <h4>
                      現有庫存 :
                      <span className="text-green-500">
                        {item.CurrentStock +
                          item.WarningCount +
                          item.AlarmCount}
                      </span>
                    </h4>
                    <p>
                      危險 :
                      <span className="text-amber-500">
                        {item.WarningCount}
                      </span>
                    </p>
                    <p>
                      警告 :
                      <span className="text-red-500">{item.AlarmCount}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 ">
                      安全庫存 :{item.SafetyStock}
                    </p>
                  </div>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-500">
                    <th className="p-1 ">刀具 SN</th>
                    <th className="p-1 ">狀態</th>
                    <th className="p-1 ">生命指數</th>
                    <th className="p-1 ">最後修改時間</th>
                    <th className="p-1 ">設備 SN</th>
                    <th className="p-1 ">所在位置</th>
                    <th className="p-1 ">領用人 / 歸還人</th>
                  </tr>
                </thead>
                <tbody>
                  {item.ToolStatusList.length > 0
                    ? sortToolStockList(item.ToolStatusList).map(
                        (item: ToolStatusItem) => (
                          <tr key={item.ToolSn} className="even:bg-gray-700">
                            <td className="p-1 ">{item.ToolSn}</td>
                            <td
                              className={`p-1 ${getToolStatusClass(item.LifeStatus)}`}
                            >
                              {translateToolStatus(item.LifeStatus)}
                            </td>
                            <td className="p-1">{item.LifePercentage}</td>
                            <td className="p-1">{item.LastModify}</td>
                            <td className="p-1"></td>
                            <td className="p-1"></td>
                            <td className="p-1"></td>
                          </tr>
                        )
                      )
                    : null}
                </tbody>
              </table>
            </div>
          ))
        : null}
    </div>
  );
};

export default ToolStockIndex;
