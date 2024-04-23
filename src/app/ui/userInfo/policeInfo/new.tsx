"use client";

import { apiNewPoliceInfo } from "@/scripts/Apis/userInfo/policeApi";
import React, { FormEvent, useState } from "react";
import { NewPoliceItemInfo } from "./type";

interface NewPoliceInfoProps {
  setNewPoliceMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewPoliceInfo({
  setNewPoliceMode,
}: NewPoliceInfoProps) {
  const [newPolice, setNewPolice] = useState<NewPoliceItemInfo>({
    PermissionId: "",
    Name: "",
    PermissionType: 1,
  });

  const postPoliceInfo = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewPoliceInfo(newPolice);
    console.log(data);
  };

  const handleChange = (key: string, value: string) => {
    setNewPolice({ ...newPolice, [key]: value });
  };
  return (
    <div className="p-4 my-4 bg-gray-500 rounded-md">
      <div className="relative ">
        <h2>新增權限</h2>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900"
          onClick={() => setNewPoliceMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postPoliceInfo(e)}>
        <div className="flex gap-2 ">
          <div className="w-full ">
            <label htmlFor="PermissionId">ID</label>
            <input
              type="text"
              id="PermissionId"
              className="w-full p-2 text-black rounded-md "
              value={newPolice.PermissionId}
              onChange={(e) => handleChange("PermissionId", e.target.value)}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="Name">名稱</label>
            <input
              type="text"
              id="Name"
              className="w-full p-2 text-black rounded-md "
              value={newPolice.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="PermissionType">權限</label>
            <select
              id="PermissionType"
              className="w-full p-2 text-black rounded-md "
              value={newPolice.PermissionType}
              onChange={(e) => handleChange("PermissionType", e.target.value)}
            >
              <option value="1" className="text-black ">
                讀取
              </option>
              <option value="2" className="text-black ">
                寫入
              </option>
              <option value="3" className="text-black ">
                讀取+寫入
              </option>
            </select>
          </div>
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          送出
        </button>
      </form>
    </div>
  );
}
