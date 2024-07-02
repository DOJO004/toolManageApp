"use client";
import DefaultSkeleton from "@/components/skeletons/default";
import { ReturnDataItem } from "@/scripts/Apis/eLabelInfo/types";
import { toolLifeStatusTextColor } from "@/scripts/Apis/toolInfo/functions";
import {
  apiGetStorageList,
  apiGetToolStockList,
  apiRestockTool,
  apiScrapTool,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import { StorageMenuItem, ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { UserAccountItem } from "@/scripts/Apis/userInfo/types";
import { apiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";

import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleShowNotice = useHandleNotice();
  const [toolStockList, setToolStockList] = useState<ToolStockItem[]>([]);
  const [userList, setUserList] = useState<UserAccountItem[]>([]);
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [reStorageMode, setReStorageMode] = useState(false);
  const [reStorageTool, setReStorageTool] = useState<ReturnDataItem>({
    RevertorId: "",
    LToolCode: 0,
    StorageId: 0,
    ToolSn: "",
  });

  const getToolStockList = async () => {
    setToolStockList(filterToolStatus(await apiGetToolStockList(-4)));
  };

  const getUserList = async () => {
    setUserList(await apiGetUserInfoList());
  };

  const getStorageList = async () => {
    setStorageList(await apiGetStorageList());
  };

  const postScrapTool = async (item: ToolStockItem) => {
    console.log("scrap item = ", item);
    const confirm = window.confirm(`確定要報廢 ${item.ToolSn}嗎?`);
    if (confirm) {
      const reqInt = await apiScrapTool(item);
      if (reqInt === 0) {
        getToolStockList();
        handleShowNotice("success", true, "報廢成功");
      } else {
        console.log("scrap tool error. ReqInt = ", reqInt);
      }
    }
  };

  const postRestockTool = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiRestockTool(reStorageTool);
    if (reqInt === 0) {
      getToolStockList();
      cleanReStorageTool();
      handleShowNotice("success", true, "入庫成功");
    } else {
      console.log("restock tool error. ReqInt = ", reqInt);
    }
  };

  const filterToolStatus = (data: ToolStockItem[]) => {
    return data.filter(
      (item) => item.LifeStatus === "Repairing" || item.LifeStatus === "Scrap"
    );
  };

  const filterToolList = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiGetToolStockList(-4);
    if (data) {
      const filterData = data.filter((item) => {
        return (
          item.ToolSn.includes(inputSearch) ||
          item.ToolTypeData.Name.includes(inputSearch)
        );
      });
      setToolStockList(filterData);
    }
  };

  const handleReStorageTool = (data: ToolStockItem) => {
    setReStorageMode(true);
    setReStorageTool((prev) => ({ ...prev, ToolSn: data.ToolSn }));
  };

  const showLifeStatusText = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "正常";
      case "Repairing":
        return "修整中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  const cleanReStorageTool = () => {
    setReStorageMode(false);
    setReStorageTool({
      RevertorId: "",
      LToolCode: 0,
      StorageId: 0,
      ToolSn: "",
    });
  };

  useEffect(() => {
    getToolStockList();
    getUserList();
    getStorageList();
  }, []);
  return (
    <div className="w-full p-4 overflow-auto text-center ">
      <form className="my-4" onSubmit={(e) => filterToolList(e)}>
        <h1>修整 / 報廢</h1>
        <input
          type="search"
          className="p-2 my-2 text-black rounded-md w-96"
          placeholder="搜尋序號 / 名稱"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </form>
      <div className="= overflow-auto bg-gray-900 min-h-96 rounded-md">
        <table className="w-full px-2">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">刀具名稱</th>
              <th className="p-1 whitespace-nowrap">生命指數</th>
              <th className="p-1 whitespace-nowrap">狀態</th>
              <th className="p-1 whitespace-nowrap">修整次數 / 最大修整次數</th>
              <th className="p-1 whitespace-nowrap">報廢 / 修整人員</th>

              <th className="p-1 whitespace-nowrap">報廢 / 修整時間</th>
              <th className="p-1 whitespace-nowrap">送修 / 重新入庫</th>
              <th className="p-1 whitespace-nowrap">報廢</th>
            </tr>
          </thead>
          <tbody>
            {toolStockList.length > 0 ? (
              toolStockList.map((item: ToolStockItem) => (
                <tr key={item.ToolSn} className="hover:bg-gray-600 ">
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecName}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifePercentage}
                  </td>
                  <td
                    className={`p-1 whitespace-nowrap ${toolLifeStatusTextColor(
                      item.LifeStatus
                    )}`}
                  >
                    {showLifeStatusText(item.LifeStatus)}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.RepairCnt} / {item.MaxLife.RepairCnt}
                  </td>
                  <td>{item.Receiver?.UserName}</td>
                  <td>{item.LastModify}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeStatus === "Repairing" ? (
                      <button
                        className="p-1 rounded-md hover:bg-indigo-500"
                        onClick={() => handleReStorageTool(item)}
                      >
                        重新入庫
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeStatus !== "Scrap" ? (
                      <button
                        className="p-1 bg-red-500 rounded-md hover:bg-red-600 "
                        onClick={() => postScrapTool(item)}
                      >
                        報廢
                      </button>
                    ) : (
                      " - "
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>
                  <DefaultSkeleton />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <form
        className={`absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-gray-700 border rounded-md top-1/2 left-1/2 ${reStorageMode ? "block" : "hidden"}`}
        onSubmit={(e) => postRestockTool(e)}
      >
        <div className="relative ">
          <h2>重新入庫</h2>
          <div
            className="absolute top-0 p-2 rounded-full cursor-pointer right-5 hover:bg-gray-500"
            onClick={() => setReStorageMode(false)}
          >
            X
          </div>
        </div>
        <label htmlFor="user" className="mt-4">
          選擇人員
        </label>
        <select
          name=""
          id="user"
          className="w-full p-2 text-black rounded-md"
          value={reStorageTool.RevertorId}
          onChange={(e) =>
            setReStorageTool((prev) => ({
              ...prev,
              RevertorId: e.target.value,
            }))
          }
        >
          <option value="" className="text-gray-500 ">
            請選擇
          </option>
          {userList.map((user) => (
            <option
              key={user.AccountId}
              value={user.AccountId}
              className="text-black "
            >
              {user.UserName}
            </option>
          ))}
        </select>
        <label htmlFor="storage" className="mt-4">
          選擇倉庫
        </label>
        <select
          name=""
          id="storage"
          className="w-full p-2 text-black rounded-md"
          value={reStorageTool.StorageId}
          onChange={(e) =>
            setReStorageTool((prev) => ({
              ...prev,
              StorageId: Number(e.target.value),
            }))
          }
        >
          <option value="" className="text-gray-500 ">
            請選擇
          </option>
          {storageList.map((storage) => (
            <option
              key={storage.StorageId}
              value={storage.StorageId}
              className="text-black "
            >
              {storage.Name}
            </option>
          ))}
        </select>
        <button className="w-full p-2 mt-4 bg-indigo-500 rounded-md">
          入庫
        </button>
      </form>
    </div>
  );
}
