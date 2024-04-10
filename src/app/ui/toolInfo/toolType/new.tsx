"use client";

import { apiNewToolType } from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useState } from "react";

interface NewToolTypeProps {
  getToolTypeList: () => void;
}
export function NewToolType({ getToolTypeList }: NewToolTypeProps) {
  const [newToolType, setNewToolType] = useState({
    Id: "",
    Name: "",
  });

  const doAddToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res: any = await apiNewToolType(newToolType);
    const inputToolTypeId = document.querySelector<HTMLInputElement>("#id");

    if (res?.data?.Values?.ReqInt === 0) {
      setNewToolType({
        Id: "",
        Name: "",
      });
      getToolTypeList();
      if (inputToolTypeId) {
        inputToolTypeId.focus();
      }
    }
  };
  return (
    <div className="w-full p-4 mx-auto my-4 bg-gray-600 rounded-md">
      <h3 id="scrollTarget" className="my-4 text-center">
        新增刀具類型
      </h3>
      <form onSubmit={(e) => doAddToolType(e)}>
        <div className="my-4 text-left">
          <label htmlFor="id">刀具類型 ID</label>
          <input
            type="text"
            id="id"
            className="w-full p-2 mx-auto text-black border rounded-md "
            value={newToolType.Id}
            onChange={(e) =>
              setNewToolType({
                ...newToolType,
                Id: e.target.value,
              })
            }
          />
        </div>
        <div className="my-4 text-left">
          <label htmlFor="name">刀具類型名稱</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 mx-auto text-black border rounded-md "
            value={newToolType.Name}
            onChange={(e) =>
              setNewToolType({
                ...newToolType,
                Name: e.target.value,
              })
            }
          />
        </div>
        <button className="w-full bg-gray-900">新增</button>
      </form>
    </div>
  );
}
