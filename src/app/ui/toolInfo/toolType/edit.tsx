"user client";

import { apiDeleteToolType } from "@/scripts/Apis/toolType/toolTypeApi";
import React, { FormEvent } from "react";
import { DeleteToolTypeResponse, ToolTypeItem } from "./types";

interface EditToolTypeProps {
  editToolType: ToolTypeItem;
  setEditToolType: React.Dispatch<React.SetStateAction<ToolTypeItem>>;
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
      const data = await apiDeleteToolType(id);
      const res = data as DeleteToolTypeResponse;
      if (res.data.Values.ReqInt === 0) {
        setEditToolTypeMode(false);
        getToolTypeList();
      }
    }
  };
  return (
    <div className="p-4 mx-auto my-4 bg-gray-600 rounded-md ">
      <h3 className="my-4 text-center">編輯刀具類型</h3>

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
            className="w-full p-2 mx-auto text-black border rounded-md w-60"
            value={editToolType.Name}
            onChange={(e) =>
              setEditToolType({
                ...editToolType,
                Name: e.target.value,
              })
            }
          />
        </div>
        <button className="w-full bg-gray-900">更新</button>
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
