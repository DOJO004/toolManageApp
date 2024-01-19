import React from "react";
import { AddBtn } from "../../buttons";
import Link from "next/link";

interface MachineTypeListItem {
  MachineTypeID: string;
  MachineTypeName: string;
}
interface MachineTypeIndexProps {
  machineTypeList: MachineTypeListItem[];
  changeNewMode: () => void;
  changeEditMode: (index: number) => void;
  fetchGetMachineTypeList: (index: number) => void;
}

const MachineTypeIndex = ({
  machineTypeList,
  changeNewMode,
  changeEditMode,
  fetchGetMachineTypeList,
}: MachineTypeIndexProps) => {
  return (
    <div className="relative p-2 mx-2 text-center ">
      <p className="">設備類型</p>
      <hr className="my-4 " />
      <div className="mt-2 overflow-auto rounded-t-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 text-black whitespace-nowrap">設備ID</th>
              <th className="p-1 text-black whitespace-nowrap">設備名稱</th>
              <th className="p-1 text-black whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {machineTypeList.map((item, index) => (
              <tr
                key={item.MachineTypeID}
                className="hover:bg-indigo-500 even:bg-gray-700"
              >
                <td className="p-1 whitespace-nowrap ">{item.MachineTypeID}</td>
                <td className="p-1 whitespace-nowrap ">
                  {item.MachineTypeName}
                </td>
                <td
                  className="p-1 px-2 cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    changeEditMode(index), fetchGetMachineTypeList(index);
                  }}
                >
                  編輯
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};
export default MachineTypeIndex;
