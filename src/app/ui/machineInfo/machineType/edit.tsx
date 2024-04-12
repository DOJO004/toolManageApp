"use client";

import {
  apiDeleteMachineType,
  apiEditMachineType,
} from "@/scripts/Apis/machineType/machineType";
import { FormEvent } from "react";
import {
  DeleteMachineTypeResponse,
  MachineTypeItem,
  PatchMachineTypeResponse,
} from "./types";

interface EditMachineTypeProps {
  editMachineType: MachineTypeItem;
  setEditMachineType: React.Dispatch<React.SetStateAction<MachineTypeItem>>;
  setEditMachineTypeMode: React.Dispatch<React.SetStateAction<boolean>>;
  getMachineTypeList: () => void;
}
export default function EditMachineType({
  editMachineType,
  setEditMachineType,
  setEditMachineTypeMode,
  getMachineTypeList,
}: EditMachineTypeProps) {
  const handleEditMachineType = (key: string, value: string) => {
    setEditMachineType((prev) => ({ ...prev, [key]: value }));
  };

  const patchMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiEditMachineType(editMachineType);
    const res = data as PatchMachineTypeResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setEditMachineTypeMode(false);
      getMachineTypeList();
    }
  };

  const deleteMachineType = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const data = await apiDeleteMachineType(editMachineType);
      const res = data as DeleteMachineTypeResponse;

      if (res?.data?.Values?.ReqInt === 0) {
        setEditMachineTypeMode(false);
        getMachineTypeList();
      }
    }
  };
  return (
    <div className="p-4 my-4 bg-gray-700 rounded-md">
      <div className="relative ">
        <h3>編輯設備類型</h3>
        <button
          className="absolute top-0 right-0 "
          onClick={() => setEditMachineTypeMode(false)}
        >
          X
        </button>
        <button
          className="absolute top-0 left-0 p-2 border rounded-md"
          onClick={() => deleteMachineType()}
        >
          刪除
        </button>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={(e) => patchMachineType(e)}>
        <div className="my-4">
          <label htmlFor="Id" className="block text-left">
            設備 ID
          </label>
          <p>{editMachineType.Id}</p>
        </div>
        <div className="my-4">
          <label htmlFor="Name" className="block text-left">
            設備名稱
          </label>
          <input
            type="text"
            id="Name"
            className="w-full p-1 text-black rounded-md "
            value={editMachineType.Name}
            onChange={(e) => handleEditMachineType("Name", e.target.value)}
          />
        </div>
        <button className="w-full my-4 bg-gray-500 rounded-md hover:bg-gray-400">
          更新
        </button>
      </form>
    </div>
  );
}
