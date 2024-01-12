import React, { Suspense } from "react";
import { AddBtn } from "../../buttons";
import {
  ToolTypeIndexTableLoading,
  ToolTypeIndexTitleLoading,
} from "./loading";

interface ToolTypeListItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolTypeIndexProps {
  toolTypeList: ToolTypeListItem[];
  changeEditMode: (index: number) => void;
  fetchGetToolTypeList: (index: number) => void;
  changeNewMode: () => void;
}

const ToolTypeIndex = ({
  toolTypeList,
  changeEditMode,
  fetchGetToolTypeList,
  changeNewMode,
}: ToolTypeIndexProps) => {
  return (
    <div className=" relative w-full h-[500px] overflow-auto p-2 text-center bg-gray-900 rounded-xl min-w-72 md:h-[1056px]">
      <Suspense fallback={<ToolTypeIndexTitleLoading />}>
        <div className="absolute top-1 right-3 ">
          <AddBtn changeNewMode={changeNewMode} />
        </div>
        <p className="text-xl ">刀具類型</p>
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800 rounded-xl">
          <div>ID</div>
          <div>名稱</div>
          <div>編輯</div>
        </div>
      </Suspense>
      <Suspense fallback={<ToolTypeIndexTableLoading />}>
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
      </Suspense>
    </div>
  );
};

export default ToolTypeIndex;
