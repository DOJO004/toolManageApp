import Link from "next/link";
import LinkBtn from "../../linkBtn";
import React from "react";

interface ToolTypeListItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolTypeIndexProps {
  toolTypeList: ToolTypeListItem[];
}

const ToolTypeIndex = ({ toolTypeList }: ToolTypeIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 rounded-xl">
      <p className="text-xl ">刀具類型</p>
      <div className="grid grid-cols-3 gap-2 p-1 bg-gray-800 rounded-xl">
        <div>ID</div>
        <div>名稱</div>
        <div>編輯</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {toolTypeList.map((item, index) => (
          <React.Fragment key={item.ToolTypeID}>
            <div className="truncate ">{item.ToolTypeID}</div>
            <div className="truncate ">{item.Name}</div>
            <div>
              <Link href={`/tool-manager/tool-info/tool-type/${index}/edit`}>
                編輯
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
      <button className="absolute top-3 right-2">
        <LinkBtn link={"/tool-manager/tool-info/tool-type/new"} />
      </button>
    </div>
  );
};

export default ToolTypeIndex;
