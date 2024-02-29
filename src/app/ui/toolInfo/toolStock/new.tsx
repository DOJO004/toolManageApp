"use client";

import { apiAddToolStock } from "@/scripts/apis/tool-stock";
import { FormEvent, useState } from "react";

interface ToolSpecItem {
  ToolSpecId: string;
  Name: string;
}
interface ToolStockNewProps {
  toolSpecList: ToolSpecItem[];
  fetchGetToolStockList: () => void;
}

export default function ToolStockNew({
  toolSpecList,
  fetchGetToolStockList,
}: ToolStockNewProps) {
  const [newToolStock, setNewToolStock] = useState({
    ToolSpecId: "",
    Qty: 0,
  });

  const fetchAddToolStock = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolStock(newToolStock);
    const reqInt = res?.data?.Values?.ReqInt;

    console.log(res);
    if (reqInt === 0) {
      fetchGetToolStockList();
    }
  };

  const handleInput = (name: string, value: string | number) => {
    setNewToolStock((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="mb-4 border-b-2 ">
      <form
        onSubmit={(e) => fetchAddToolStock(e)}
        className="grid items-center grid-cols-3 gap-2 my-4"
      >
        <select
          value={newToolStock.ToolSpecId}
          className=" input"
          onChange={(e) => handleInput("ToolSpecId", e.target.value)}
        >
          <option value="">請選擇</option>
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
        <input
          type="number"
          placeholder="請輸入數量"
          className="input"
          value={newToolStock.Qty}
          onChange={(e) => handleInput("Qty", e.target.value)}
        />
        <button className="w-full p-1 my-4 bg-indigo-500 rounded-md">
          送出
        </button>
      </form>
    </div>
  );
}
