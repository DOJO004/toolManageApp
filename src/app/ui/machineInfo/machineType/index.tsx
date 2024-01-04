import React from "react";
import LinkBtn from "../../linkBtn";
import Link from "next/link";

interface MachineTypeListItem {
  MachineTypeID: string;
  MachineTypeName: string;
}
interface MachineTypeIndexProps {
  machineTypeList: MachineTypeListItem[];
}

const MachineTypeIndex = ({ machineTypeList }: MachineTypeIndexProps) => {
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
            <div className="truncate ">
              <Link
                href={`/tool-manager/machine-info/machine-type/${index}/edit`}
              >
                編輯
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-2 right-3">
        <LinkBtn link="/tool-manager/machine-info/machine-type/new" />
      </div>
    </div>
  );
};
export default MachineTypeIndex;
