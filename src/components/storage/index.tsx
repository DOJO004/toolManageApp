"use client";

import {
  apiDeleteStorageInfo,
  apiEditSTorageInfo,
  apiGetStorageList,
} from "@/scripts/Apis/storage/storageApi";
import { useEffect, useState } from "react";
import { DeleteToolStockResponse } from "../toolInfo/toolStock/types";
import StorageNew from "./new";
import {
  EditStorageItem,
  GetStorageListResponse,
  PatchStorageResponse,
  StorageItem,
} from "./types";

export default function StorageIndex() {
  const [storageList, setStorageList] = useState<StorageItem[]>([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState<EditStorageItem>(
    {} as EditStorageItem
  );

  const getStorageList = async () => {
    const data = await apiGetStorageList();
    const res = data as GetStorageListResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    } else {
      console.log(reqInt);
    }
  };

  const patchStorage = async () => {
    const data = await apiEditSTorageInfo(editData);
    const res = data as PatchStorageResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      getStorageList();
      setEditMode(false);
      setEditIndex(-1);
      setEditData({
        StorageId: 0,
        Name: "",
      });
    }
  };

  const deleteStorage = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const data = await apiDeleteStorageInfo(editData);
      const res = data as DeleteToolStockResponse;
      const reqInt = res.data?.Values?.ReqInt;
      if (reqInt === 0) {
        setEditMode(false);
        getStorageList();
      }
      console.log(res);
    }
  };

  const handleEditMode = (item: StorageItem, index: number) => {
    console.log(item);

    setNewMode(false);
    setEditMode(true);
    setEditIndex(index);
    setEditData({
      StorageId: item.StorageId,
      Name: item.Name,
    });
  };

  useEffect(() => {
    getStorageList();
  }, []);
  return (
    <div className="w-full text-center">
      <div className="relative">
        <h1>倉儲列表</h1>
        <button
          className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-900"
          onClick={() => setNewMode(!newMode)}
        >
          新增
        </button>
      </div>
      <div
        className={` transition-all duration-300 overflow-hidden ease-in-out ${newMode ? "h-52" : "h-0"}`}
      >
        <StorageNew getStorageList={getStorageList} />
      </div>
      <div className="my-4 overflow-hidden bg-gray-900 rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1">倉儲 ID</th>
              <th className="p-1">倉儲名稱</th>
              <th className="p-1">刀具數量</th>
              <th className="p-1">編輯</th>
            </tr>
          </thead>
          <tbody>
            {storageList.map((item, index) =>
              editIndex === index ? (
                <tr key={item.StorageId}>
                  <td className="p-1">{item.StorageId}</td>
                  <td className="p-1">
                    <input
                      type="text"
                      value={editData.Name}
                      className="text-center text-black "
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          Name: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-1"> - </td>
                  <td className="p-1">
                    <button
                      className="p-1 rounded-md hover:bg-indigo-500"
                      onClick={() => patchStorage()}
                    >
                      完成
                    </button>
                    <span> / </span>
                    <button
                      className="p-1 rounded-md hover:bg-indigo-500"
                      onClick={() => deleteStorage()}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item.StorageId}>
                  <td className="p-1">{item.StorageId}</td>
                  <td className="p-1">{item.Name}</td>
                  <td className="p-1">{item.TotalCount}</td>
                  <td className="p-1">
                    <button
                      className="p-1 rounded-md hover:bg-indigo-500"
                      onClick={() => handleEditMode(item, index)}
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
