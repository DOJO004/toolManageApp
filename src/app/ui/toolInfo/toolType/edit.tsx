import Notice from "@/app/ui/notice";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import DeleteBtn from "../../deleteBtn";
import BackBtn from "../../backBtn";

interface ToolTypeEditProps {
  toolTypeID: string;
  toolTypeName: string;
  setToolTypeName: React.Dispatch<React.SetStateAction<string>>;
  fetchEditToolType: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
  fetchDisableToolType: () => void;
}

const ToolTypeEdit = ({
  toolTypeID,
  toolTypeName,
  setToolTypeName,
  fetchEditToolType,
  notice,
  isError,
  fetchDisableToolType,
}: ToolTypeEditProps) => {
  const router = useRouter();
  return (
    <div className="relative">
      <form
        className="flex flex-col justify-center w-full p-4 bg-gray-900 rounded-xl"
        onSubmit={(e) => fetchEditToolType(e)}
      >
        <p className="text-center">編輯刀具類型</p>
        {notice && <Notice isError={isError} />}
        <input
          type="text"
          className="block pl-2 my-2 text-gray-300 rounded-md min-h-10 min-w-72"
          placeholder="刀具ID"
          value={toolTypeID}
          readOnly
        />
        <input
          type="text"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          placeholder="刀具類型名稱"
          value={toolTypeName}
          onChange={(e) => setToolTypeName(e.target.value)}
        />
        <button className="p-2 bg-blue-500 rounded-md ">完成</button>
      </form>
      <div className="absolute top-2 right-4">
        <DeleteBtn disableFunction={fetchDisableToolType} />
      </div>
      <div className="absolute top-2 left-2">
        <BackBtn backFunction={router.back} />
      </div>
    </div>
  );
};

export default ToolTypeEdit;
