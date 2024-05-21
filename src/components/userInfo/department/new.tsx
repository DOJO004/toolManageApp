"use client";

import { ApiPostDepartment } from "@/scripts/Apis/userInfo/departmentApi";
import { FormEvent, useState } from "react";
import { NewDepartmentItem, PostDepartmentResponse } from "./type";

interface NewDepartmentProps {
  getDepartmentList: () => void;
  setNewDepartmentMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewDepartment({
  getDepartmentList,
  setNewDepartmentMode,
}: NewDepartmentProps) {
  const [newDepartment, setNewDepartment] = useState<NewDepartmentItem>({
    DepartmentId: "",
    Name: "",
  });

  const postDepartment = async (e: FormEvent) => {
    e.preventDefault();
    const data = await ApiPostDepartment(newDepartment);
    const res = data as PostDepartmentResponse;
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      getDepartmentList();
    }
  };

  const handleChange = (key: string, value: string) => {
    setNewDepartment((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="p-4 bg-gray-900 rounded-md">
      <div className="relative ">
        <h2>新增部門</h2>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-700"
          onClick={() => setNewDepartmentMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postDepartment(e)}>
        <div className="flex gap-4 my-4 ">
          <div className="w-full ">
            <label htmlFor="DepartmentId">部門 ID</label>
            <input
              type="text"
              id="DepartmentId"
              className="w-full p-2 text-black rounded-md "
              value={newDepartment.DepartmentId}
              onChange={(e) => handleChange("DepartmentId", e.target.value)}
            />
          </div>
          <div className="w-full ">
            <label htmlFor="Name">部門名稱</label>
            <input
              type="text"
              id="Name"
              className="w-full p-2 text-black rounded-md "
              value={newDepartment.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
            />
          </div>
        </div>
        <button className="w-full bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
