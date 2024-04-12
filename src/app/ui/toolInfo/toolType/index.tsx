"use client";
import {
  apiEditToolType,
  apiGetToolTypeList,
} from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useEffect, useState } from "react";
import { EditToolType } from "./edit";
import { NewToolType } from "./new";
import {
  GetToolTypeListResponse,
  PatchToolTypeResponse,
  ToolTypeItem,
} from "./types";

export function ToolTypeIndex() {
  const [toolTypeList, setToolTypeList] = useState<ToolTypeItem[]>([]);

  const [newToolTypeMode, setNewToolTypeMode] = useState(false);
  const [editToolTypeMode, setEditToolTypeMode] = useState(false);
  const [editToolType, setEditToolType] = useState<ToolTypeItem>({
    Id: "",
    Name: "",
  });

  const getToolTypeList = async () => {
    const data = await apiGetToolTypeList();
    const res = data as GetToolTypeListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeMenus);
    }
  };

  const doEditToolType = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiEditToolType(editToolType);
    const res = data as PatchToolTypeResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      alert("edit tool type success!");
    }
  };

  const handleClickNewToolType = () => {
    setEditToolTypeMode(false);
    setNewToolTypeMode(!newToolTypeMode);
  };

  const handleClickEditToolType = (item: ToolTypeItem) => {
    setNewToolTypeMode(false);
    setEditToolTypeMode(true);
    setEditToolType({
      Id: item.Id,
      Name: item.Name,
    });
    const scrollTarget = document.querySelector("#scrollTarget");
    if (scrollTarget) {
      scrollTarget.scrollIntoView({
        behavior: "smooth", // 可選的平滑捲動效果
        block: "start", // 將 div 元素的頂部對齊視窗的頂部
      });
    }
  };

  useEffect(() => {
    getToolTypeList();
  }, []);

  return (
    <div className="flex p-4">
      {/* index */}
      <div className="w-full h-full mx-4 overflow-auto ">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-600 "
            onClick={() => handleClickNewToolType()}
          >
            新增
          </button>
          <h2 className="my-4 text-center">刀具類型</h2>
        </div>
        <div className="overflow-hidden text-center bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead className="bg-indigo-500 border-b-2">
              <tr>
                <th className="p-1 whitespace-nowrap">ID</th>
                <th className="p-1 whitespace-nowrap">名稱</th>
              </tr>
            </thead>
            <tbody className="">
              {toolTypeList.length > 1 ? (
                toolTypeList.map((item) => (
                  <tr
                    key={item.Id}
                    className="cursor-pointer hover:bg-gray-600"
                    onClick={() => handleClickEditToolType(item)}
                  >
                    <td className="p-1">{item.Id}</td>
                    <td className="p-1">{item.Name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Don&apos;t have any data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* new */}
      <div
        className={`overflow-hidden relative  mx-auto transition-all duration-300 ease-in-out ${
          newToolTypeMode ? "w-1/2" : "w-0"
        }`}
      >
        <button
          className="absolute right-0 top-3 "
          onClick={() => handleClickNewToolType()}
        >
          X
        </button>
        <NewToolType getToolTypeList={getToolTypeList} />
      </div>
      {/* edit */}
      <div
        className={`relative  mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          editToolTypeMode ? "w-1/2" : "w-0"
        }`}
      >
        <button
          className="absolute right-0 top-3 "
          onClick={() => setEditToolTypeMode(false)}
        >
          X
        </button>
        <EditToolType
          editToolType={editToolType}
          setEditToolType={setEditToolType}
          doEditToolType={doEditToolType}
          setEditToolTypeMode={setEditToolTypeMode}
          getToolTypeList={getToolTypeList}
        />
      </div>
    </div>
  );
}
