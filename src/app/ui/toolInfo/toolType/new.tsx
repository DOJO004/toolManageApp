import React, { FormEvent } from "react";
import Notice from "@/app/ui/notice";

interface ToolTypeNewProps {
  toolTypeID: string;
  setToolTypeID: React.Dispatch<React.SetStateAction<string>>;
  toolTypeName: string;
  setToolTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchNewToolType: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
  changeNewMode: () => void;
}

const ToolTypeNew = ({
  toolTypeID,
  setToolTypeID,
  toolTypeName,
  setToolTypeName,
  fetchNewToolType,
  notice,
  isError,
  changeNewMode,
}: ToolTypeNewProps) => {
  return (
    <div className="relative">
      {" "}
      <form
        className="flex flex-col justify-center w-full p-4 mb-2 bg-gray-900 rounded-xl"
        onSubmit={(e) => fetchNewToolType(e)}
      >
        <p className="text-xl text-center">新增刀具類型</p>
        {notice && <Notice isError={isError} />}
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
        <button className="p-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
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