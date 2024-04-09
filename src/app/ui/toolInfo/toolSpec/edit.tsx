"use client";

import {
  apiDeleteToolSpec,
  apiEditToolSpec,
} from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiGetToolTypeList } from "@/scripts/Apis/toolType/toolTypeApi";
import React, { FormEvent, useEffect, useState } from "react";

interface editToolSpecItem {
  ToolSpecId: string;
  Name: string;
  ToolTypeId: string;
  SafetyStock: number;
  BladeDiameter: number;
  BladeHeight: number;
  TotalLength: number;
  HandleDiameter: number;
  ProcessCnt: number;
  ProcessTime: number;
  ProcessLength: number;
  RepairCnt: number;
}

interface EditToolSpecProps {
  editToolSpec: editToolSpecItem;
  setEditToolSpec: React.Dispatch<React.SetStateAction<editToolSpecItem>>;
  setEditToolSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
  getToolSpecList: () => void;
}
export function EditToolSpec({
  editToolSpec,
  setEditToolSpec,
  setEditToolSpecMode,
  getToolSpecList,
}: EditToolSpecProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [toolTypeList, setToolTypeList] = useState([]);

  const changePage = (value: number) => {
    setCurrentPage((prev) => prev + value);
  };

  const getToolTypeList = async () => {
    const res = await apiGetToolTypeList();
    setToolTypeList(res);
  };
  const patchToolSpec = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiEditToolSpec(editToolSpec);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setEditToolSpecMode(false);
      getToolSpecList();
      setCurrentPage(1);
    }
  };

  const handelEditToolSpec = (key: string, value: any) => {
    setEditToolSpec((prev) => ({ ...prev, [key]: value }));
  };

  const deleteToolSpec = async (e: FormEvent) => {
    e.preventDefault();
    const confirm = window.confirm("確定要刪除嗎?");

    if (confirm) {
      const res = await apiDeleteToolSpec(editToolSpec.ToolSpecId);
      if (res?.data?.Values?.ReqInt === 0) {
        setEditToolSpecMode(false);
        getToolSpecList();
        setCurrentPage(1);
      }
    }
  };

  useEffect(() => {
    getToolTypeList();
  }, []);
  return (
    <form
      className="relative w-full max-w-md p-4 mx-auto my-4 bg-gray-600 rounded-md "
      onSubmit={(e) => patchToolSpec(e)}
    >
      <button
        className="absolute left-[5%] p-2 text-2xl bg-gray-800 rounded-md top-5"
        onClick={(e) => deleteToolSpec(e)}
      >
        刪除
      </button>
      <h3 className="text-center ">編輯刀具規格</h3>
      {/* part one */}
      <div className={`${currentPage === 1 ? "block" : "hidden"}`}>
        <p className="my-2 text-sm text-center md:text-base lg:text-lg">●○○</p>
        <div className="my-4">
          <label htmlFor="ID">刀具類型</label>
          <select
            id="ID"
            value={editToolSpec.ToolTypeId}
            className="block w-full p-2 text-black border rounded-md"
            onChange={(e) => handelEditToolSpec("ToolTypeId", e.target.value)}
          >
            <option value="">請選擇</option>
            {toolTypeList.map((item) => (
              <option key={item.Id} value={item.Id} className="text-black ">
                {item.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label htmlFor="ID">刀具規格 ID</label>
          <p className="text-center ">{editToolSpec.ToolSpecId}</p>
        </div>
        <div className="my-4">
          <label htmlFor="Name">刀具規格名稱</label>
          <input
            id="Name"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.Name}
            onChange={(e) => handelEditToolSpec("Name", e.target.value)}
          />
        </div>
        <div
          className="p-2 text-center bg-gray-900 rounded-md cursor-pointer hover:bg-gray-800"
          onClick={() => changePage(1)}
        >
          下一步
        </div>
      </div>
      {/* part two */}
      <div className={`${currentPage === 2 ? "block" : "hidden"}`}>
        <div className="my-4">
          <label htmlFor="Φ">Φ</label>
          <input
            id="Φ"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.BladeDiameter}
            onChange={(e) =>
              handelEditToolSpec("BladeDiameter", e.target.value)
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="height">高度</label>
          <input
            id="height"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.BladeHeight}
            onChange={(e) => handelEditToolSpec("BladeHeight", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="totalLength">總長度</label>
          <input
            id="totalLength"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.TotalLength}
            onChange={(e) => handelEditToolSpec("TotalLength", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="手柄Φ">手柄Φ</label>
          <input
            id="手柄Φ"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.HandleDiameter}
            onChange={(e) =>
              handelEditToolSpec("HandleDiameter", e.target.value)
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="safetyStock">安全庫存</label>
          <input
            id="safetyStock"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.SafetyStock}
            onChange={(e) => handelEditToolSpec("SafetyStock", e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div
            className="w-full p-2 text-center bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(-1)}
          >
            上一步
          </div>
          <div
            className="w-full p-2 text-center bg-gray-900 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(1)}
          >
            下一步
          </div>
        </div>
      </div>
      {/* part three */}
      <div className={`${currentPage === 3 ? "block" : "hidden"}`}>
        <div className="my-4">
          <label htmlFor="RepairCnt">最大修整次數</label>
          <input
            id="RepairCnt"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.RepairCnt}
            onChange={(e) => handelEditToolSpec("RepairCnt", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessCnt">最大加工次數</label>
          <input
            id="ProcessCnt"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.ProcessCnt}
            onChange={(e) => handelEditToolSpec("ProcessCnt", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessLength">最大加工長度</label>
          <input
            id="ProcessLength"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.ProcessLength}
            onChange={(e) =>
              handelEditToolSpec("ProcessLength", e.target.value)
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessTime">最大加工時間</label>
          <input
            id="ProcessTime"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={editToolSpec.ProcessTime}
            onChange={(e) => handelEditToolSpec("ProcessTime", e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div
            className="w-full p-2 text-center bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(-1)}
          >
            上一步
          </div>
          <button className="w-full bg-gray-900 hover:bg-gray-800">編輯</button>
        </div>
      </div>
    </form>
  );
}
