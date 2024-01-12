import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DeleteBtn } from "../../buttons";

interface EditToolTypeItem {
  ToolTypeID: string;
  Name: string;
}

interface ToolTypeEditProps {
  editToolType: EditToolTypeItem;
  setEditToolType: React.Dispatch<React.SetStateAction<EditToolTypeItem>>;
  fetchEditToolType: (e: FormEvent) => void;
  fetchDisableToolType: () => void;
  changeEditMode: () => void;
}

const ToolTypeEdit = ({
  editToolType,
  setEditToolType,
  fetchEditToolType,
  fetchDisableToolType,
  changeEditMode,
}: ToolTypeEditProps) => {
  const router = useRouter();
  return (
    <div className="relative mb-2 md:mx-2">
      <form
        className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 border-2 rounded-xl"
        onSubmit={(e) => fetchEditToolType(e)}
      >
        <p className="text-xl text-center">編輯刀具類型</p>
        <label htmlFor="ToolTypeID">ID</label>
        <input
          id="ToolTypeID"
          type="text"
          className="block pl-2 mb-2 text-gray-300 rounded-md min-h-10 min-w-72"
          placeholder="刀具ID"
          value={editToolType.ToolTypeID}
          readOnly
        />
        <label htmlFor="Name">名稱</label>
        <input
          id="Name"
          type="text"
          className="block pl-2 mb-2 text-black rounded-md min-h-10 min-w-72"
          placeholder="刀具類型名稱"
          value={editToolType.Name}
          onChange={(e) =>
            setEditToolType({ ...editToolType, Name: e.target.value })
          }
        />
        <button className="p-2 bg-indigo-500 rounded-md hover:bg-indigo-600 ">
          完成
        </button>
      </form>
      <button
        className="absolute text-xl top-2 right-4"
        onClick={() => changeEditMode()}
      >
        X
      </button>
      <div className="absolute top-2 left-4">
        <DeleteBtn deleteFunction={fetchDisableToolType} />
      </div>
    </div>
  );
};

export default ToolTypeEdit;
