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
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [toolStockList, setToolStockList] = useState<StockToolCountItem[]>([]);
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolSpecClass, setToolSpecClass] = useState<string[]>([]);
  const [selectToolClass, setSelectToolClass] = useState<string[]>([]);
  const [toolSpecClassMenu, setToolSpecClassMenu] = useState<boolean>(false);

  const [newToolStock, setNewToolStock] = useState<NewToolStockItem>(
    {} as NewToolStockItem
  );
  const [newToolStockMode, setNewToolStockMode] = useState(false);

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

    const reqInt = await apiPostToolStock(newToolStock);
    if (reqInt === 0) {
      getToolStockList();
      cleanNewToolStock();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const handleToolSpecClass = (toolStockList: StockToolCountItem[]) => {
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

  const handleSelectToolClass = (name: string, checked: boolean) => {
    if (checked) {
      setSelectToolClass([...selectToolClass, name]);
    } else {
      setSelectToolClass(selectToolClass.filter((item) => item !== name));
    }
  };

  const filterToolStockList = async () => {
    const toolStockCountList = await apiGetToolStockCountList();

    if (selectToolClass.length === 0) {
      setToolStockList(toolStockCountList);
      return;
    }

    if (toolStockCountList.length > 0) {
      setToolStockList(
        toolStockCountList.filter((item) => {
          return selectToolClass.includes(item.ToolSpecName);
        })
      );
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
      case "NeedRepair":
        return "text-red-500";
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
      case "NeedRepair":
        return "需要維修";
      case "Repairing":
        return "維修中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  const toolPositionInfo = (status: number) => {
    switch (status) {
      case 0:
        return "存放於倉儲中";
      case 1:
        return "已移出倉儲";
      case 2:
        return "裝載於設備中";
      case -1:
        return "未知狀態";
      default:
        return "無此狀態";
    }
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  useEffect(() => {
    getToolStockList();
    getToolSpecList();
    getStorageList();
  }, []);

  useEffect(() => {
    filterToolStockList();
  }, [selectToolClass]);

  return (
    <div className="relative w-full p-2 mx-auto text-center rounded-xl">
      <div className="relative ">
        <h2 className="my-4">刀具庫存</h2>
        <button
          className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
          onClick={() => setNewToolStockMode(!newToolStockMode)}
        >
          新增
        </button>
        <div className="flex justify-center gap-2"></div>
        <div className="relative ">
          <label
            htmlFor=""
            className="p-2 border border-gray-300 rounded-md cursor-pointer hover:border-white "
            onClick={() => {
              setToolSpecClassMenu(!toolSpecClassMenu);
            }}
          >
            篩選刀具類型
          </label>

          <ul
            className={`${toolSpecClassMenu ? "block" : "hidden"} bg-white w-fit  left-1/2  items-start flex flex-col p-4 rounded-md mt-2 absolute top-6  -translate-x-1/2 z-10`}
          >
            {toolSpecClass.map((name) => (
              <li key={name} value={name}>
                <input
                  type="checkbox"
                  id={name}
                  onChange={(e) =>
                    handleSelectToolClass(name, e.target.checked)
                  }
                />
                <label
                  htmlFor={name}
                  className="text-black cursor-pointer hover:bg-gray-300"
                >
                  {name}
                </label>
              </li>
            ))}
          </ul>
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
          />
        </div>
      </div>
      <div>
        <ToolStockIndex
          toolPositionInfo={toolPositionInfo}
          toolStockList={toolStockList}
          sortToolStockList={sortToolStockList}
          getToolStatusClass={getToolStatusClass}
          translateToolStatus={translateToolStatus}
        />
      </div>
    </div>
  );
}
