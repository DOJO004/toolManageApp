import SubmitButton from "@/components/buttons";
import { ToolTypeItem } from "@/scripts/Apis/toolInfo/types";
import React from "react";

interface Props {
  toolTypeList: ToolTypeItem[];
  editToolTypeMode: boolean;
  editToolTypeModeIndex: number;
  editToolType: ToolTypeItem;
  setEditToolType: React.Dispatch<React.SetStateAction<ToolTypeItem>>;
  patchToolType: () => void;
  deleteToolType: (item: ToolTypeItem) => void;
  handleClickEditToolType: (item: ToolTypeItem, index: number) => void;
  isPending: boolean;
}

export default function ToolTypeIndex({
  toolTypeList,
  editToolTypeMode,
  editToolTypeModeIndex,
  editToolType,
  setEditToolType,
  patchToolType,
  deleteToolType,
  handleClickEditToolType,
  isPending,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 text-center bg-indigo-500 ">
        <p className="p-1 whitespace-nowrap">ID</p>
        <p className="p-1 whitespace-nowrap">名稱</p>
        <p className="p-1 whitespace-nowrap">編輯</p>
      </div>
      {toolTypeList.length > 0 ? (
        // edit mode
        toolTypeList.map((item, index) =>
          editToolTypeMode && index === editToolTypeModeIndex ? (
            <div className="grid grid-cols-3 text-center" key={item.Id}>
              <p className="p-1">{item.Id}</p>
              <p className="p-1">
                <input
                  autoFocus
                  type="text"
                  className="w-full mx-auto text-center text-black border rounded-md"
                  value={editToolType.Name}
                  onChange={(e) =>
                    setEditToolType({
                      ...editToolType,
                      Name: e.target.value,
                    })
                  }
                />
              </p>
              <p className="p-1">
                <SubmitButton
                  name="完成"
                  classNames="p-1 bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
                  onclick={() => patchToolType()}
                  isPending={isPending}
                />
                <span className="mx-2">/</span>
                <span
                  className="p-1 bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                  onClick={() => deleteToolType(item)}
                >
                  刪除
                </span>
              </p>
            </div>
          ) : (
            // render data
            <div className="grid grid-cols-3 text-center" key={item.Id}>
              <p className="p-1">{item.Id}</p>
              <p className="p-1">{item.Name}</p>
              <p onClick={() => handleClickEditToolType(item, index)}>
                <button className="p-1 rounded-md hover:bg-indigo-600 ">
                  編輯
                </button>
              </p>
            </div>
          )
        )
      ) : (
        <div className="my-4 text-xl text-center">查無資料...</div>
      )}
    </>
  );
}
