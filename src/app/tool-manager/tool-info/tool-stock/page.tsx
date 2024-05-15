"use client";

import { useNotice } from "@/components/context/NoticeContext";
import {
  GetStorageListResponse,
  StorageItem,
} from "@/components/storage/types";
import SweetAlert from "@/components/sweetAlert";
import {
  GetToolSpecListResponse,
  ToolSpecItem,
} from "@/components/toolInfo/toolSpec/types";
import ToolStockIndex from "@/components/toolInfo/toolStock";
import NewToolStock from "@/components/toolInfo/toolStock/new";
import {
  GetToolStockCountListResponse,
  PostToolStockResponse,
  StockToolCountItem,
  ToolStatusItem,
} from "@/components/toolInfo/toolStock/types";
import { apiGetStorageList } from "@/scripts/Apis/storage/storageApi";
import { apiGetToolSpecList } from "@/scripts/Apis/toolSpec/toolSpecApi";
import {
  apiGetToolStockCountList,
  apiNewToolStock,
} from "@/scripts/Apis/toolStock/toolStock";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [toolStockList, setToolStockList] = useState<StockToolCountItem[]>([]);
  const [newToolStockMode, setNewToolStockMode] = useState(false);
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolStock, setToolStock] = useState({
    StorageId: "",
    ToolSpecId: "",
    Qty: 0,
  });

  const [storageList, setStorageList] = useState<StorageItem[]>([]);

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
  const getToolSpecList = async () => {
    const data = await apiGetToolSpecList();
    const res = data as GetToolSpecListResponse;
    console.log("tool spec list ", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
    }
  };

  const getStorageList = async () => {
    const data = await apiGetStorageList();
    const res = data as GetStorageListResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log("storage list ", res);

    if (reqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    }
  };

  const postToolStock = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewToolStock(toolStock);
    const res = data as PostToolStockResponse;
    const reqInt = res.data?.Values?.ReqInt;

    console.log(res);
    if (reqInt === 0) {
      getToolStockList();
      cleanNewToolStock();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const cleanNewToolStock = () => {
    setToolStock({
      StorageId: "",
      ToolSpecId: "",
      Qty: 0,
    });
  };
  const handleToolStock = (name: string, value: number | string) => {
    setToolStock({
      ...toolStock,
      [name]: value,
    });
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
      case "NeedRepair":
        return "text-amber-500";
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
  }, [selectToolStock]);

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
            postToolStock={postToolStock}
            toolStock={toolStock}
            toolSpecList={toolSpecList}
            handleToolStock={handleToolStock}
            storageList={storageList}
          />
        </div>
      </div>
      <div>
        <ToolStockIndex
          toolStockList={toolStockList}
          sortToolStockList={sortToolStockList}
          getToolStatusClass={getToolStatusClass}
          translateToolStatus={translateToolStatus}
        />
      </div>
    </div>
  );
}
