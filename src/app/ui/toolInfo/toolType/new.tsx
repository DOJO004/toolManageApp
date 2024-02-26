"use client";

import { apiAddToolTypeInfo } from "@/scripts/apis/tool-info";
import { FormEvent, useState } from "react";

interface ToolTypeNewProps {
  fetchGetToolTypeList: () => void;
  addToolTypeToggle: boolean;
}

const ToolTypeNew = ({
  fetchGetToolTypeList,
  addToolTypeToggle,
}: ToolTypeNewProps) => {
  const [newToolTypeInfo, setNewToolTypeInfo] = useState({
    id: "",
    name: "",
  });

  const fetchAddToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolTypeInfo(
      newToolTypeInfo.id,
      newToolTypeInfo.name
    );

    const reqInt = res?.data?.Values?.ReqInt;

    if (res?.status === 200 && reqInt === 0) {
      console.log("add tool type success!");
      setNewToolTypeInfo({
        id: "",
        name: "",
      });
      fetchGetToolTypeList();
    } else {
      console.log("add tool type false...", res);
    }
  };

  const handleNewToolTypeInput = (inputName: string, value: string) => {
    if (inputName === "Id") {
      setNewToolTypeInfo((prev) => ({
        ...prev,
        id: value,
      }));
    } else if (inputName === "Name") {
      setNewToolTypeInfo((prev) => ({
        ...prev,
        name: value,
      }));
    }
  };

  return (
    <div className={`${addToolTypeToggle === true ? "block" : "hidden"}`}>
      <form
        className="grid items-center grid-cols-3 gap-2 my-4 justify-items-center"
        onSubmit={(e) => fetchAddToolType(e)}
      >
        <input
          type="text"
          className="input"
          placeholder="刀具類型 ID"
          value={newToolTypeInfo.id}
          onChange={(e) => handleNewToolTypeInput("Id", e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="刀具類型名稱"
          value={newToolTypeInfo.name}
          onChange={(e) => handleNewToolTypeInput("Name", e.target.value)}
        />
        <button className="p-1 my-2 border rounded-md hover:bg-gray-300">
          送出
        </button>
      </form>
    </div>
  );
};

export default ToolTypeNew;
