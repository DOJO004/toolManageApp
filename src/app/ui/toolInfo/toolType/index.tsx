"use client";
import {
  apiEditToolType,
  apiGetToolTypeList,
} from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useEffect, useState } from "react";
import { EditToolType } from "./edit";
import { NewToolType } from "./new";

export function ToolTypeIndex() {
  const [toolTypeList, setToolTypeList] = useState([
    {
      Id: "",
      Name: "",
    },
  ]);

  const [newToolTypeMode, setNewToolTypeMode] = useState(false);
  const [editToolTypeMode, setEditToolTypeMode] = useState(false);
  const [editToolType, setEditToolType] = useState({
    Id: "",
    Name: "",
  });

  const getToolTypeList = async () => {
    const res = await apiGetToolTypeList();
    setToolTypeList(res);
  };

  const doEditToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiEditToolType(editToolType);
  };

  const handleClickNewToolType = () => {
    console.log("HI");

    setEditToolTypeMode(false);
    setNewToolTypeMode(!newToolTypeMode);
  };

  const handleClickEditToolType = (item: { Id: string; Name: string }) => {
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
    <>
      <div className="w-full h-full p-2 overflow-auto text-center ">
        <div className="relative ">
          <button
            className="absolute translate-x-[150%] bg-gray-600"
            onClick={() => handleClickNewToolType()}
          >
            新增
          </button>
          <h2 className="my-4">刀具類型</h2>
        </div>
        {/* new */}
        <div
          className={`overflow-hidden relative w-fit mx-auto transition-all duration-300 ease-in-out ${
            newToolTypeMode ? "h-96" : "h-0"
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
          className={`relative w-fit mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
            editToolTypeMode ? "h-[28rem]" : "h-0"
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
        {/* index */}
        <div className="w-full h-full max-w-6xl mx-auto overflow-auto bg-gray-700 shadow-md rounded-t-xl">
          <table className="w-full h-full ">
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
                    className="cursor-pointer  hover:bg-gray-600"
                    onClick={() => handleClickEditToolType(item)}
                  >
                    <td className="p-1">{item.Id}</td>
                    <td className="p-1">{item.Name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Don't have any data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
