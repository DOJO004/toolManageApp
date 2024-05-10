"use client";

import {
  GetStorageListResponse,
  StorageItem,
} from "@/components/storage/types";
import { apiGetStorageList } from "@/scripts/Apis/storage/storageApi";
import { apiGetToolSpecList } from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiNewToolStock } from "@/scripts/Apis/toolStock/toolStock";
import React, { FormEvent, useEffect, useState } from "react";
import { GetToolSpecListResponse, ToolSpecItem } from "../toolSpec/types";
import { PostToolStockResponse } from "./types";

interface NewToolStockProps {
  getToolStockList: () => void;
  setNewToolStockMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function NewToolStock({
  getToolStockList,
  setNewToolStockMode,
}: NewToolStockProps) {
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolStock, setToolStock] = useState({
    ToolSpecId: "",
    Qty: 0,
  });

  const [storageList, setStorageList] = useState<StorageItem[]>([]);

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
    const reqInt = res.data.Values.ReqInt;
    console.log("storage list ", res);

    if (reqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    }
  };

  const postToolStock = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewToolStock(toolStock);
    const res = data as PostToolStockResponse;
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      getToolStockList();
      cleanNewToolStock();
    }
  };

  const cleanNewToolStock = () => {
    setToolStock({
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

  useEffect(() => {
    getToolSpecList();
    getStorageList();
  }, []);

  return (
    <div className="w-full p-4 bg-gray-700 rounded-md">
      <div className="relative ">
        <h3 className="text-left ">新增刀具庫存</h3>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900 "
          onClick={() => setNewToolStockMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postToolStock(e)}>
        <div className="flex items-center gap-2">
          <div className="w-full">
            <label htmlFor="ToolSpecId" className="block text-left">
              刀具規格名稱
            </label>
            <select
              id="ToolSpecId"
              className="w-full p-1 text-center text-black rounded-md"
              value={toolStock.ToolSpecId}
              onChange={(e) => handleToolStock("ToolSpecId", e.target.value)}
            >
              <option value="" className="text-black ">
                請選擇
              </option>
              {toolSpecList.map((item) => (
                <option
                  key={item.ToolSpecId}
                  value={item.ToolSpecId}
                  className="text-black"
                >
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="Qty" className="block text-left">
              數量
            </label>
            <input
              type="number"
              id="Qty"
              value={toolStock.Qty}
              className="w-full p-1 text-center text-black rounded-md"
              onChange={(e) => handleToolStock("Qty", e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="StorageId">倉儲</label>
            <select
              id="StorageId"
              className="w-full p-2 text-center text-black rounded-md"
            >
              <option value="">選擇倉儲</option>
              {storageList.map((item) => (
                <option
                  value={item.StorageId}
                  key={item.StorageId}
                  className="text-black"
                >
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="w-full p-1 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
