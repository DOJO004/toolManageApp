"use client";

import {
  apiDeleteProductLineType,
  apiEditProductLineType,
} from "@/scripts/Apis/productLineType/productLineType";
import React, { FormEvent } from "react";

interface EditProductLineItem {
  Id: string;
  Name: string;
}

interface EditProductLineProps {
  editProductLine: EditProductLineItem;
  setEditProductLine: React.Dispatch<React.SetStateAction<EditProductLineItem>>;
  getProductLineList: () => void;
  setEditProductLineMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditProductLine({
  editProductLine,
  setEditProductLine,
  getProductLineList,
  setEditProductLineMode,
}: EditProductLineProps) {
  const handleEditProductLine = (key: string, value: string) => {
    setEditProductLine((prev) => ({ ...prev, [key]: value }));
  };

  const patchProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await apiEditProductLineType(editProductLine);
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      getProductLineList();
      setEditProductLineMode(false);
    }
  };

  const deleteProductLine = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const res: any = await apiDeleteProductLineType(editProductLine);
      if (res?.data?.Values?.ReqInt === 0) {
        getProductLineList();
        setEditProductLineMode(false);
      }
    }
  };
  return (
    <div className="w-full p-4 my-4 bg-gray-700">
      <div className="relative ">
        <button
          className="absolute top-0 right-0"
          onClick={() => setEditProductLineMode(false)}
        >
          X
        </button>
        <button
          className="absolute top-0 left-0 border rounded-md hover:bg-gray-600"
          onClick={() => deleteProductLine()}
        >
          刪除
        </button>
        <h3>編輯產線類型</h3>
      </div>
      <form
        className="max-w-lg mx-auto my-4"
        onSubmit={(e) => patchProductLine(e)}
      >
        <div className="my-4">
          <label htmlFor="Id">產線 ID</label>
          <p>{editProductLine.Id}</p>
        </div>
        <div className="my-4">
          <label htmlFor="Name">產線名稱</label>
          <input
            type="text"
            id="Name"
            className="w-full p-2 text-black rounded-md "
            value={editProductLine.Name}
            onChange={(e) => handleEditProductLine("Name", e.target.value)}
          />
        </div>
        <button className="w-full bg-gray-500 rounded-md hover:bg-gray-400">
          編輯
        </button>
      </form>
    </div>
  );
}
