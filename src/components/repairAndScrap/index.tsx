"use client";

import {
  apiRestockTool,
  apiScrapTool,
} from "@/scripts/Apis/repairAndScrap/repairAndScrap";
import {
  apiGetStorageList,
  apiGetToolStockList,
} from "@/scripts/Apis/toolInfo/toolInfo";
import {
  BasicResponse,
  GetStorageListResponse,
  StorageMenuItem,
} from "@/scripts/Apis/toolInfo/type";
import { ApiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApi";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNotice } from "../context/NoticeContext";
import {
  GetToolStockInfoListResponse,
  ToolStockListItem,
} from "../toolInfo/toolStock/types";
import { UserAccountItem, UserInfoList } from "../userInfo/types";

export default function RepairAndScrapIndex() {
  const { setShowNotice } = useNotice();
  const [toolStockList, setToolStockList] = useState<ToolStockListItem[]>([]);
  const [userList, setUserList] = useState<UserAccountItem[]>([]);
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [reStorageMode, setReStorageMode] = useState(false);
  const [reStorageTool, setReStorageTool] = useState({
    RevertorId: "",
    ToolSn: "",
    StorageId: 0,
  });

  const getToolStockList = async () => {
    const data = await apiGetToolStockList();
    const res = data as GetToolStockInfoListResponse;
    console.log("get tool stock list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      const sortData = sortToolList(res.data.Values.StockToolList);
      const filterData = filterToolStatus(sortData);
      setToolStockList(filterData);
      return res.data.Values.StockToolList;
    }
  };

  const getUserList = async () => {
    const data = await ApiGetUserInfoList();
    const res = data as UserInfoList;
    const reqInt = res.data?.Values?.ReqInt;
    if (reqInt === 0) {
      setUserList(res.data.Values.UserAccountList);
    } else {
      console.log("get user list error. ReqInt = ", reqInt);
    }
  };

  const getStorageList = async () => {
    const data = await apiGetStorageList();
    const res = data as GetStorageListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    } else {
      console.log("get storage list error. ReqInt = ", res.data.Values.ReqInt);
    }
  };

  const postScrapTool = async (item: ToolStockListItem) => {
    const confirm = window.confirm(`確定要報廢 ${item.ToolSn}嗎?`);
    if (confirm) {
      const data = await apiScrapTool(item);
      const res = data as BasicResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("scrap tool", res);

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
    const data = await apiRestockTool(reStorageTool);
    const res = data as BasicResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);
    if (reqInt === 0) {
      getToolStockList();
      cleanReStorageTool();
      handleShowNotice("success", true, "入庫成功");
    } else {
      console.log("restock tool error. ReqInt = ", reqInt);
    }
  };

  const filterToolStatus = (data: ToolStockListItem[]) => {
    return data.filter(
      (item) => item.LifeStatus === "Repairing" || item.LifeStatus === "Scrap"
    );
  };

  const filterToolList = async (e: FormEvent) => {
    e.preventDefault();
    const data = await getToolStockList();
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

  const sortToolList = (data: ToolStockListItem[]) => {
    const sortData = data.slice().sort((a, b) => {
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

      // 如果 LifeStatus 相同，則按照 ToolSn 進行排序
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

  const handleReStorageTool = (data: ToolStockListItem) => {
    setReStorageMode(true);
    setReStorageTool((prev) => ({ ...prev, ToolSn: data.ToolSn }));
  };

  const getLifeStatusClassName = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "text-green-500";
      case "Repairing":
        return "text-amber-500";
      case "Scrap":
        return "text-gray-500";
      default:
        return "";
    }
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
      ToolSn: "",
      StorageId: 0,
    });
  };

  const handleShowNotice = (
    type: AlertColor,
    show: boolean,
    messages: string
  ) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  useEffect(() => {
    getToolStockList();
    getUserList();
    getStorageList();
  }, []);
  return (
    <div className="overflow-auto text-center ">
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
      <div className="= overflow-auto bg-gray-900 rounded-t-md">
        <table className="w-full ">
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
              toolStockList.map((item: ToolStockListItem) => (
                <tr key={item.ToolSn} className="hover:bg-gray-600 ">
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecName}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifePercentage}
                  </td>
                  <td
                    className={`p-1 whitespace-nowrap ${getLifeStatusClassName(
                      item.LifeStatus
                    )}`}
                  >
                    {showLifeStatusText(item.LifeStatus)}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LifeData.RepairCnt} / {item.MaxLife.RepairCnt}
                  </td>
                  <td>{item.Receiver.UserName}</td>
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
                <td colSpan={12}>no data...</td>
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
