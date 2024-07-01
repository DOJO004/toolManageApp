"use client";

import SubmitButton from "@/components/buttons";
import { NewDepartmentItem } from "@/scripts/Apis/userInfo/types";
import { FormEvent } from "react";

interface NewDepartmentProps {
  setNewDepartmentMode: React.Dispatch<React.SetStateAction<boolean>>;
  postDepartment: (e: FormEvent) => void;
  newDepartment: NewDepartmentItem;
  handleChange: (key: string, value: string) => void;
  isPending: boolean;
}

export default function NewDepartment({
  setNewDepartmentMode,
  postDepartment,
  newDepartment,
  handleChange,
  isPending,
}: NewDepartmentProps) {
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
        <SubmitButton
          name="新增"
          classNames="w-full bg-indigo-500 rounded-md hover:bg-indigo-600"
          onclick={() => {}}
          isPending={isPending}
        />
      </form>
    </div>
  );
}
