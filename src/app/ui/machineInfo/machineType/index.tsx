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
    <div className="relative w-full p-2 mx-auto text-center bg-gray-900 min-w-fit rounded-xl">
      <p className="text-xl">設備類型</p>
      <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">設備ID</div>
        <div className="truncate ">設備名稱</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {machineTypeList.map((item, index) => (
          <React.Fragment key={item.MachineTypeID}>
            <div className="truncate ">{item.MachineTypeID}</div>
            <div className="truncate ">{item.MachineTypeName}</div>
            <button
              className="truncate"
              onClick={() => {
                changeEditMode(index), fetchGetMachineTypeList(index);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};
export default MachineTypeIndex;
