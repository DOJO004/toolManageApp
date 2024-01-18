import React, { FormEvent } from "react";
import { ToggleBtn } from "../../buttons";

interface ToolTypeNewProps {
  toolTypeID: string;
  setToolTypeID: React.Dispatch<React.SetStateAction<string>>;
  toolTypeName: string;
  setToolTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchNewToolType: (e: FormEvent) => void;
  changeNewMode: () => void;
  toggleBtn: boolean;
  setToggleBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolTypeNew = ({
  toolTypeID,
  setToolTypeID,
  toolTypeName,
  setToolTypeName,
  fetchNewToolType,
  changeNewMode,
  toggleBtn,
  setToggleBtn,
}: ToolTypeNewProps) => {
  return (
    <div className="relative md:mx-2">
      <div className="absolute top-3 left-3">
        <ToggleBtn toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
      </div>
      <form
        className="flex flex-col justify-center p-4 mb-2 bg-gray-900 border-2 w-fit rounded-xl"
        onSubmit={(e) => fetchNewToolType(e)}
      >
        <p className="text-xl text-center">新增刀具類型</p>
        <input
          type="text"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          placeholder="刀具ID"
          value={toolTypeID}
          onChange={(e) => setToolTypeID(e.target.value)}
        />
        <input
          type="text"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          placeholder="刀具類型名稱"
          value={toolTypeName}
          onChange={(e) => setToolTypeName(e.target.value)}
        />
        <button className="p-2 mt-4 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          新增
        </button>
      </form>
      <button
        className="absolute text-xl top-2 right-4"
        onClick={() => changeNewMode()}
      >
        X
      </button>
    </div>
  );
};

export default ToolTypeNew;
