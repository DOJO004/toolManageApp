"use client";

import { apiGetToolSpecList } from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiNewToolStock } from "@/scripts/Apis/toolStock/toolStock";
import { FormEvent, useEffect, useState } from "react";
import { GetToolSpecListResponse, ToolSpecItem } from "../toolSpec/types";
import { PostToolStockResponse } from "./types";

interface NewToolStockProps {
  getToolStockList: () => void;
}
export default function NewToolStock({ getToolStockList }: NewToolStockProps) {
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolStock, setToolStock] = useState({
    ToolSpecId: "",
    Qty: 0,
  });

  const getToolSpecList = async () => {
    const data = await apiGetToolSpecList();
    const res = data as GetToolSpecListResponse;
    console.log("tool spec list ", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
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
  }, []);

  return (
    <div className="w-full p-4 my-4 overflow-hidden bg-gray-600 max-h-96 mt-28 rounded-xl">
      <h3 className="text-center ">新增刀具庫存</h3>
      <form
        className="p-2 mx-auto rounded-md "
        onSubmit={(e) => postToolStock(e)}
      >
        <div className="my-4">
          <label htmlFor="ToolSpecId" className="block text-left">
            刀具規格名稱
          </label>
          <select
            id="ToolSpecId"
            className="w-full p-2 mx-auto text-black border rounded-md w-60"
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
        <div className="my-4">
          <label htmlFor="Qty" className="block text-left">
            數量
          </label>
          <input
            type="number"
            id="Qty"
            value={toolStock.Qty}
            className="w-full p-2 mx-auto text-black border rounded-md w-60"
            onChange={(e) => handleToolStock("Qty", e.target.value)}
          />
        </div>
        <button className="w-full p-2 my-4 bg-gray-500 rounded-md hover:bg-gray-800">
          新增
        </button>
      </form>
    </div>
  );
}
