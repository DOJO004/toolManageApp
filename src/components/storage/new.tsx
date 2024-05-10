"use client";

import { apiPostStorageInfo } from "@/scripts/Apis/storage/storageApi";
import { FormEvent, useState } from "react";
import { NewStorageResponse } from "./types";

interface Props {
  getStorageList: () => void;
}

export default function StorageNew({ getStorageList }: Props) {
  const [newStorage, setNewStorage] = useState({
    StorageId: 0,
    Name: "",
  });

  const postStorage = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiPostStorageInfo(newStorage);
    const res = data as NewStorageResponse;
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      getStorageList();
      setNewStorage({
        StorageId: 0,
        Name: "",
      });
    }
  };
  const handleChangeNewStorage = (key: string, value: string | number) => {
    setNewStorage((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="p-4 bg-gray-900 rounded-md">
      <h2>新增倉儲</h2>
      <form onSubmit={(e) => postStorage(e)}>
        <div className="flex w-full gap-2 ">
          <div className="w-full">
            <label htmlFor="StorageId">ID</label>
            <input
              type="text"
              name="StorageId"
              className="w-full p-2 text-center text-black rounded-md "
              id="StorageId"
              value={newStorage.StorageId}
              onChange={(e) =>
                handleChangeNewStorage("StorageId", e.target.value)
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="Name">倉儲名稱</label>
            <input
              type="text"
              name="Name"
              className="w-full p-2 text-center text-black rounded-md "
              id="Name"
              value={newStorage.Name}
              onChange={(e) => handleChangeNewStorage("Name", e.target.value)}
            />
          </div>
        </div>
        <button className="w-full p-2 mt-4 bg-indigo-500 rounded-md ">
          新增
        </button>
      </form>
    </div>
  );
}
