import React from "react";
import { AddBtn } from "../../buttons";

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
    <div className="relative w-full h-full p-2 overflow-auto text-center ">
      <div className="absolute top-1 right-3 ">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
      <p className="">刀具類型</p>
      <hr className="my-2" />
      <div className="overflow-auto shadow-md rounded-t-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-300 ">
              <th className="p-1 text-black whitespace-nowrap">ID</th>
              <th className="p-1 text-black whitespace-nowrap">名稱</th>
              <th className="p-1 text-black whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {toolTypeList.map((item, index) => (
              <tr key={item.ToolTypeID} className=" even:bg-gray-700">
                <td className="p-1 whitespace-nowrap">{item.ToolTypeID}</td>
                <td className="p-1 whitespace-nowrap">{item.Name}</td>
                <td
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    changeEditMode(index), fetchGetToolTypeList(index);
                  }}
                >
                  編輯
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolTypeIndex;
