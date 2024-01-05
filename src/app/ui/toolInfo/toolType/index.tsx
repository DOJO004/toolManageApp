import Link from "next/link";
import React from "react";

interface ToolTypeListItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolTypeIndexProps {
  toolTypeList: ToolTypeListItem[];
  changeEditMode: (index: number) => void;
  fetchGetToolTypeList: (index: number) => void;
}

const ToolTypeIndex = ({
  toolTypeList,
  changeEditMode,
  fetchGetToolTypeList,
}: ToolTypeIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 rounded-xl">
      <p className="text-xl ">刀具類型</p>
      <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800 rounded-xl">
        <div>ID</div>
        <div>名稱</div>
        <div>編輯</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {toolTypeList.map((item, index) => (
          <React.Fragment key={item.ToolTypeID}>
            <div className="truncate ">{item.ToolTypeID}</div>
            <div className="truncate ">{item.Name}</div>
            <button
              onClick={() => {
                changeEditMode(index), fetchGetToolTypeList(index);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ToolTypeIndex;
