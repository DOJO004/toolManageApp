"use client";

import { apiNewProductLineType } from "@/scripts/Apis/productLineType/productLineType";
import { FormEvent, useState } from "react";
import { DepartmentItem } from "../../userInfo/department/type";
import { PostProductLineResponse } from "./types";

interface NewProductLineProps {
  getProductLineList: () => void;
  setNewProductLineMode: React.Dispatch<React.SetStateAction<boolean>>;
  departmentList: DepartmentItem[];
}

export default function NewProductLine({
  getProductLineList,
  setNewProductLineMode,
  departmentList,
}: NewProductLineProps) {
  const [newProductLine, setNewProductLine] = useState({
    Id: "",
    Name: "",
    DepartmentId: "",
  });

  const postProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewProductLineType(newProductLine);
    const res = data as PostProductLineResponse;
    console.log("post product line", res);
    if (res?.data?.Values?.ReqInt === 0) {
      getProductLineList();
      cleanProductLine();
    }
  };

  const cleanProductLine = () => {
    setNewProductLine({
      Id: "",
      Name: "",
      DepartmentId: "",
    });
  };

  const handleNewProductLine = (key: string, value: string) => {
    setNewProductLine((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="relative p-4 bg-gray-900 rounded-xl">
      <h3 className="text-left ">新增產線類型</h3>
      <button
        className="absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-gray-700"
        onClick={() => setNewProductLineMode(false)}
      >
        X
      </button>
      <form onSubmit={(e) => postProductLine(e)}>
        <div className="grid items-center grid-cols-3 gap-2 my-2 ">
          <div className="relative my-4">
            <label htmlFor="Id" className="absolute left-0 -top-6 ">
              產線 ID
            </label>
            <input
              type="text"
              id="Id"
              className="w-full p-2 text-black rounded-md "
              placeholder="產線 ID"
              value={newProductLine.Id}
              onChange={(e) => handleNewProductLine("Id", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="Name" className="absolute left-0 -top-6 ">
              產線名稱
            </label>
            <input
              type="text"
              id="Name"
              className="w-full p-2 text-black rounded-md "
              placeholder="產線名稱"
              value={newProductLine.Name}
              onChange={(e) => handleNewProductLine("Name", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="department" className="absolute left-0 -top-6 ">
              負責部門
            </label>
            <select
              id="department"
              className="w-full p-2 text-black rounded-md "
              value={newProductLine.DepartmentId}
              onChange={(e) =>
                handleNewProductLine("DepartmentId", e.target.value)
              }
            >
              <option value="" className="text-gray-500">
                選擇部門
              </option>
              {departmentList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="w-full p-1 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
