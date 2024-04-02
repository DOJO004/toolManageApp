"use client";

import { apiNewToolType } from "@/scripts/toolType/toolTypeApi";
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
    const res = await apiNewToolType(newToolType);
    const inputToolTypeId = document.querySelector("#id");

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
    <div className="p-4 mx-auto my-4 bg-gray-600 rounded-md w-fit">
      <h3 id="scrollTarget" className="my-4">
        新增刀具類型
      </h3>
      <form onSubmit={(e) => doAddToolType(e)}>
        <div className="my-4 text-left">
          <label htmlFor="id">刀具類型 ID</label>
          <input
            type="text"
            id="id"
            className="block p-2 mx-auto text-black border rounded-md w-60"
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
            className="block p-2 mx-auto text-black border rounded-md w-60"
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
