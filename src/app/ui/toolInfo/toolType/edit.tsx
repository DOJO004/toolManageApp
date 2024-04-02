"user client";

import { apiDeleteToolType } from "@/scripts/toolType/toolTypeApi";
import React, { FormEvent } from "react";

interface EditToolTypeProps {
  editToolType: {
    Id: string;
    Name: string;
  };
  setEditToolType: React.Dispatch<
    React.SetStateAction<{
      Id: string;
      Name: string;
    }>
  >;
  doEditToolType: (e: FormEvent) => void;
  getToolTypeList: () => void;
  setEditToolTypeMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditToolType({
  editToolType,
  setEditToolType,
  doEditToolType,
  getToolTypeList,
  setEditToolTypeMode,
}: EditToolTypeProps) {
  const doDeleteToolType = async (id: string) => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      await apiDeleteToolType(id);
      setEditToolTypeMode(false);
      getToolTypeList();
    }
  };
  return (
    <div className="p-4 mx-auto my-4 bg-gray-600 rounded-md ">
      <h3 className="my-4">編輯刀具類型</h3>

      <form onSubmit={(e) => doEditToolType(e)}>
        <div className="my-4 text-left">
          <label htmlFor="id">刀具類型 ID</label>
          <p className="block text-center text-white rounded-md">
            {editToolType.Id}
          </p>
        </div>
        <div className="my-4 text-left">
          <label htmlFor="name">刀具類型名稱</label>
          <input
            type="text"
            id="name"
            className="block p-2 mx-auto text-black border rounded-md w-60"
            value={editToolType.Name}
            onChange={(e) =>
              setEditToolType({
                ...editToolType,
                Name: e.target.value,
              })
            }
          />
        </div>
        <button className="w-full bg-gray-900">編輯</button>
      </form>
      <button
        className="w-full my-2 bg-gray-700"
        onClick={() => doDeleteToolType(editToolType.Id)}
      >
        刪除
      </button>
    </div>
  );
}
