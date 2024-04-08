"use client";

import {
  apiDeleteMachineType,
  apiEditMachineType,
} from "@/scripts/Apis/machineType/machineType";
import { FormEvent } from "react";

interface editMachineTypeItem {
  Id: string;
  Name: string;
}

interface EditMachineTypeProps {
  editMachineType: editMachineTypeItem;
  setEditMachineType: React.Dispatch<React.SetStateAction<editMachineTypeItem>>;
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
    const res = await apiEditMachineType(editMachineType);
    if (res?.data?.Values?.ReqInt === 0) {
      setEditMachineTypeMode(false);
      getMachineTypeList();
    }
  };

  const deleteMachineType = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const res = await apiDeleteMachineType(editMachineType);
      console.log(res);

      if (res?.data?.Values?.ReqInt === 0) {
        setEditMachineTypeMode(false);
        getMachineTypeList();
      }
    }
  };
  return (
    <div className="my-4">
      <h3>編輯設備類型</h3>
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
      <button
        className="w-full max-w-lg mx-auto my-4 bg-gray-700 rounded-md hover:bg-gray-500"
        onClick={() => deleteMachineType()}
      >
        刪除
      </button>
    </div>
  );
}
