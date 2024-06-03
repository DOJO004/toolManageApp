"use client";
import { apiGetToolSpecList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolSpecItem } from "@/scripts/Apis/toolInfo/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [notificationList, setNotificationList] = useState<any[]>([]);

  const getToolSpecList = async () => {
    setToolSpecList(await apiGetToolSpecList());
  };

  useEffect(() => {
    getToolSpecList();
  }, []);

  return (
    <div className="w-full min-h-screen p-4">
      <h1>設定</h1>
      <div className="mt-4 border-b-2">
        <p>通知設定</p>
      </div>
      <form
        action=""
        className="grid items-center grid-cols-4 gap-2 p-4 mt-4 bg-gray-900 rounded-md"
      >
        <div>
          <label htmlFor="">刀具規格</label>
          <select
            name=""
            id=""
            className="w-full p-1 text-center text-black rounded-md"
          >
            <option value="" className="text-gray-300">
              選擇刀具規格
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
        <div>
          <label htmlFor="">通知百分比</label>
          <input
            type="number"
            placeholder="輸入百分比"
            className="w-full p-1 text-center text-black rounded-md"
          />
        </div>
        <div>
          <label htmlFor="">通知方式</label>
          <select
            name=""
            id=""
            className="w-full p-1 text-center text-black rounded-md"
          >
            <option value="" className="text-black">
              Line
            </option>
            <option value="" className="text-black">
              Email
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="">詳細資訊</label>
          <input
            type="text"
            placeholder="Line token or Email"
            className="w-full p-1 text-center text-black rounded-md"
          />
        </div>
        <button className="col-span-4 p-1 mt-4 bg-indigo-500 rounded-md">
          新增
        </button>
      </form>
      <div className="mt-4 overflow-auto bg-gray-900 rounded-md min-h-96">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1">刀具規格</th>
              <th className="p-1">通知百分比</th>
              <th className="p-1">通知方式</th>
              <th className="p-1">詳細資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                no data...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
