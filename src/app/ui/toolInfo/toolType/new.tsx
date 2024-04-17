"use client";

import { apiNewToolType } from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useState } from "react";
import { PostToolTypeResponse, ToolTypeItem } from "./types";

interface NewToolTypeProps {
  getToolTypeList: () => void;
}
export function NewToolType({ getToolTypeList }: NewToolTypeProps) {
  const [newToolType, setNewToolType] = useState<ToolTypeItem>({
    Id: "",
    Name: "",
  });

  const doAddToolType = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewToolType(newToolType);
    const res = data as PostToolTypeResponse;
    const inputToolTypeId = document.querySelector<HTMLInputElement>("#id");
    console.log(res);

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
    <div className="px-4 pb-2 m-4 border rounded-lg ">
      <h4 id="scrollTarget" className="my-4 font-bold text-left">
        新增刀具類型
      </h4>
      <form
        onSubmit={(e) => doAddToolType(e)}
        className="grid items-center grid-cols-12 gap-2"
      >
        <div className="relative col-span-5 p-2">
          <label htmlFor="id" className="absolute left-2 -top-4 ">
            刀具類型 ID
          </label>
          <input
            type="text"
            id="id"
            className="w-full p-2 text-black border rounded-md"
            value={newToolType.Id}
            placeholder="刀具類型 ID"
            onChange={(e) =>
              setNewToolType({
                ...newToolType,
                Id: e.target.value,
              })
            }
          />
        </div>
        <div className="relative col-span-5 p-2">
          <label htmlFor="name" className="absolute left-2 -top-4 ">
            刀具類型名稱
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 text-black border rounded-md "
            placeholder="刀具類型名稱"
            value={newToolType.Name}
            onChange={(e) =>
              setNewToolType({
                ...newToolType,
                Name: e.target.value,
              })
            }
          />
        </div>
        <button className="col-span-2 bg-gray-800 hover:bg-gray-900">
          新增
        </button>
      </form>
    </div>
  );
}
