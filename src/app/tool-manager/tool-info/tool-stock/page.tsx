"use client";

import { useNotice } from "@/components/context/NoticeContext";

import ToolStockIndex from "@/components/toolInfo/toolStock";
import NewToolStock from "@/components/toolInfo/toolStock/new";
import {
  apiGetStorageList,
  apiGetToolSpecList,
  apiGetToolStockCountList,
  apiPostToolStock,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import {
  NewToolStockItem,
  StockToolCountItem,
  StorageMenuItem,
  ToolSpecItem,
  ToolStatusItem,
} from "@/scripts/Apis/toolInfo/types";
import {
  getToolStatusClass,
  selectedButtonBackgroundColor,
  toolPositionInfo,
} from "@/scripts/toolStockFunction";
import { AlertColor } from "@mui/material";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [toolStockList, setToolStockList] = useState<StockToolCountItem[]>([]);
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolSpecClass, setToolSpecClass] = useState<string[]>([]);
  const [selectToolClass, setSelectToolClass] = useState<string[]>([]); // 篩選的刀具類別
  const [selectToolStatus, setSelectToolStatus] = useState<string[]>([]); // 篩選的刀具狀態
  const [filterMode, setFilterMode] = useState(false);
  const [newToolStock, setNewToolStock] = useState<NewToolStockItem>(
    {} as NewToolStockItem
  );
  const [newToolStockMode, setNewToolStockMode] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const getToolStockList = async () => {
    setToolStockList(await apiGetToolStockCountList());
    setToolSpecClass(handleToolSpecClass(await apiGetToolStockCountList()));
  };

  const getToolSpecList = async () => {
    setToolSpecList(await apiGetToolSpecList());
  };

  const getStorageList = async () => {
    setStorageList(await apiGetStorageList());
  };

  const postToolStock = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const reqInt = await apiPostToolStock(newToolStock);
    if (reqInt === 0) {
      getToolStockList();
      cleanNewToolStock();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
    setIsPending(false);
  };

  const handleToolSpecClass = (toolStockList: StockToolCountItem[]) => {
    if (toolStockList.length === 0) return [];
    return toolStockList.map((item) => item.ToolSpecName);
  };

  const cleanNewToolStock = () => {
    setNewToolStock({
      StorageId: "",
      ToolSpecId: "",
      Qty: 0,
    });
  };
  const handleToolStock = (name: string, value: number | string) => {
    setNewToolStock({
      ...newToolStock,
      [name]: value,
    });
  };

  const filterToolStockList = async () => {
    let filteredData = await apiGetToolStockCountList();

    // 依據 ToolSpecName 進行篩選
    if (selectToolClass.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectToolClass.includes(item.ToolSpecName)
      );
    }

    // 依據 ToolStatusList.LifeStatus 進行篩選
    if (selectToolStatus.length > 0) {
      filteredData = filteredData
        .map((item) => {
          return {
            ...item,
            ToolStatusList: item.ToolStatusList.filter((tool) =>
              selectToolStatus.includes(tool.LifeStatus)
            ),
          };
        })
        .filter((item) => item.ToolStatusList.length > 0); // 過濾掉 ToolStatusList 為空的項目
    }

    setToolStockList(filteredData);
  };

  const sortToolStockList = (toolList: ToolStatusItem[]) => {
    const sortToolStatus = toolList.sort((a, b) => {
      // 定义 LifeStatus 的排序优先顺序
      const statusOrder: { [key: string]: number } = {
        Normal: 1,
        Repairing: 2,
        Scrap: 3,
      };

      // 比较 LifeStatus 的优先顺序
      const statusComparison =
        statusOrder[a.LifeStatus] - statusOrder[b.LifeStatus];
      if (statusComparison !== 0) {
        return statusComparison;
      }

      // 如果 LifeStatus 相同，则按照 lastModify 排序
      const dateA = new Date(a.LastModify);
      const dateB = new Date(b.LastModify);
      return dateB.getTime() - dateA.getTime();
    });

    return sortToolStatus;
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  const handleFilterToolSpecClassMenu = (className: string) => {
    if (selectToolClass.includes(className)) {
      setSelectToolClass(selectToolClass.filter((item) => item !== className));
    } else {
      setSelectToolClass([...selectToolClass, className]);
    }
  };

  const handleFilterToolStatusName = (status: string) => {
    if (selectToolStatus.includes(status)) {
      setSelectToolStatus(selectToolStatus.filter((item) => item !== status));
    } else {
      setSelectToolStatus([...selectToolStatus, status]);
    }
  };

  useEffect(() => {
    getToolStockList();
    getToolSpecList();
    getStorageList();
  }, []);

  useEffect(() => {
    filterToolStockList();
  }, [selectToolClass, selectToolStatus]);

  return (
    <div className="relative w-full p-2 mx-auto text-center rounded-xl">
      <div className="relative ">
        <div className="flex items-center justify-center gap-2">
          <h2 className="my-4">刀具庫存</h2>
          <button
            onClick={() => setFilterMode(!filterMode)}
            className="p-1 rounded-full hover:bg-gray-900 h-fit"
          >
            <Image
              src={"/icons/filter.svg"}
              alt="filter icon"
              width={30}
              height={30}
            />
          </button>
        </div>
        <button
          className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
          onClick={() => setNewToolStockMode(!newToolStockMode)}
        >
          新增
        </button>
        <div className="flex justify-center gap-2"></div>
        <div className="relative ">
          <div
            className={`overflow-hidden transition-all rounded-md duration-300 flex flex-col m-4 gap-4 bg-gray-900 ${filterMode ? "h-60" : "h-0"}`}
          >
            <div className="grid items-center grid-cols-6 gap-2 m-4">
              <label htmlFor="">篩選刀具類型 : </label>
              <button
                className="p-1 border border-gray-500 rounded-md hover:bg-indigo-500"
                onClick={() => setSelectToolClass([])}
              >
                All
              </button>
              {toolSpecClass.map((name) => (
                <button
                  key={name}
                  className={`p-1 border border-gray-500 rounded-md hover:bg-indigo-500 ${selectedButtonBackgroundColor(selectToolClass, name)}`}
                  onClick={() => handleFilterToolSpecClassMenu(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="grid items-center grid-cols-6 gap-2 m-4">
              <label htmlFor="filterToolStatus">篩選刀具狀態 : </label>
              <button
                className="p-1 border border-gray-500 rounded-md hover:bg-indigo-500"
                onClick={() => setSelectToolStatus([])}
              >
                All
              </button>
              <button
                className={`p-1 border border-gray-500 rounded-md hover:bg-indigo-500  ${selectedButtonBackgroundColor(selectToolStatus, "Normal")}`}
                onClick={() => handleFilterToolStatusName("Normal")}
              >
                正常
              </button>
              <button
                className={`p-1 border border-gray-500 rounded-md hover:bg-indigo-500  ${selectedButtonBackgroundColor(selectToolStatus, "Repairing")}`}
                onClick={() => handleFilterToolStatusName("Repairing")}
              >
                維修中
              </button>
              <button
                className={`p-1 border border-gray-500 rounded-md hover:bg-indigo-500  ${selectedButtonBackgroundColor(selectToolStatus, "NeedRepair")}`}
                onClick={() => handleFilterToolStatusName("NeedRepair")}
              >
                待修整
              </button>
              <button
                className={`p-1 border border-gray-500 rounded-md hover:bg-indigo-500  ${selectedButtonBackgroundColor(selectToolStatus, "Scrap")}`}
                onClick={() => handleFilterToolStatusName("Scrap")}
              >
                報廢
              </button>
            </div>
          </div>
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
            postToolStock={postToolStock}
            newToolStock={newToolStock}
            toolSpecList={toolSpecList}
            handleToolStock={handleToolStock}
            storageList={storageList}
            isPending={isPending}
          />
        </div>
      </div>
      <div>
        <ToolStockIndex
          toolPositionInfo={toolPositionInfo}
          toolStockList={toolStockList}
          sortToolStockList={sortToolStockList}
          getToolStatusClass={getToolStatusClass}
        />
      </div>
    </div>
  );
}
