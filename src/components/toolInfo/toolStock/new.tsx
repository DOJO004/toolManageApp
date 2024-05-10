import { StorageItem } from "@/components/storage/types";
import React, { FormEvent } from "react";
import { ToolSpecItem } from "../toolSpec/types";
import { NewToolStockItem } from "./types";

interface Props {
  getToolStockList: () => void;
  setNewToolStockMode: React.Dispatch<React.SetStateAction<boolean>>;
  postToolStock: (e: FormEvent) => void;
  toolStock: NewToolStockItem;
  toolSpecList: ToolSpecItem[];
  handleToolStock: (key: string, value: string | number) => void;
  storageList: StorageItem[];
}
export default function NewToolStock({
  getToolStockList,
  setNewToolStockMode,
  postToolStock,
  toolStock,
  toolSpecList,
  handleToolStock,
  storageList,
}: Props) {
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
              value={toolStock.StorageId}
              onChange={(e) => handleToolStock("StorageId", e.target.value)}
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
