"use client";

import { apiNewMachineType } from "@/scripts/Apis/machineType/machineType";
import { FormEvent, useState } from "react";
import { PostMachineTypeResponse } from "./types";

interface NewMachineTypeProps {
  getMachineTypeList: () => void;
  setNewMachineTypeMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewMachineType({
  getMachineTypeList,
  setNewMachineTypeMode,
}: NewMachineTypeProps) {
  const [newMachineType, setNewMachineType] = useState({
    Id: "",
    Name: "",
  });

  const postMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewMachineType(newMachineType);
    const res = data as PostMachineTypeResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      cleanNewMachineType();
      getMachineTypeList();
    }
  };

  const cleanNewMachineType = () => {
    setNewMachineType({
      Id: "",
      Name: "",
    });
  };

  const handleNewMachineType = (key: string, value: string) => {
    setNewMachineType((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="p-4 my-4 bg-gray-900 rounded-md">
      <div className="relative ">
        <h3 className="font-bold text-left ">新增設備類型</h3>
        <button
          className="absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-gray-700"
          onClick={() => setNewMachineTypeMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postMachineType(e)}>
        <div className="grid items-center grid-cols-2 gap-2 my-4">
          <div className="relative my-4">
            <label htmlFor="Id" className="absolute left-0 -top-6 ">
              設備 ID
            </label>
            <input
              type="text"
              id="Id"
              placeholder="設備 ID"
              className="w-full p-2 text-center text-black rounded-md"
              value={newMachineType.Id}
              onChange={(e) => handleNewMachineType("Id", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="Name" className="absolute left-0 -top-6 ">
              設備名稱
            </label>
            <input
              type="text"
              id="Name"
              placeholder="設備名稱"
              className="w-full p-2 text-center text-black rounded-md"
              value={newMachineType.Name}
              onChange={(e) => handleNewMachineType("Name", e.target.value)}
            />
          </div>
        </div>
        <button className="w-full p-1 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
