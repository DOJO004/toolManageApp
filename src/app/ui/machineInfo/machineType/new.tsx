"use client";

import { apiNewMachineType } from "@/scripts/Apis/machineType/machineType";
import { FormEvent, useState } from "react";

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
    const res: any = await apiNewMachineType(newMachineType);
    console.log(res);
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
    <div className="p-4 my-4 bg-gray-700 rounded-md">
      <div className="relative ">
        <h3>新增設備類型</h3>
        <button
          className="absolute top-0 right-0 "
          onClick={() => setNewMachineTypeMode(false)}
        >
          X
        </button>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={(e) => postMachineType(e)}>
        <div className="my-4">
          <label htmlFor="Id">設備 ID</label>
          <input
            type="text"
            id="Id"
            className="w-full p-1 text-black rounded-md "
            value={newMachineType.Id}
            onChange={(e) => handleNewMachineType("Id", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="Name">設備名稱</label>
          <input
            type="text"
            id="Name"
            className="w-full p-1 text-black rounded-md "
            value={newMachineType.Name}
            onChange={(e) => handleNewMachineType("Name", e.target.value)}
          />
        </div>
        <button className="w-full my-4 bg-gray-500 rounded-md hover:bg-gray-400">
          新增
        </button>
      </form>
    </div>
  );
}
