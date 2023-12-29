import Link from "next/link";

interface ToolTypeListItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolTypeIndexProps {
  toolTypeList: ToolTypeListItem[];
}

const ToolTypeIndex = ({ toolTypeList }: ToolTypeIndexProps) => {
  return (
    <div className="relative w-full max-w-xl p-2 text-center bg-gray-900 rounded-xl">
      <p className="text-xl ">刀具類型</p>
      <div className="grid grid-cols-3 gap-2">
        <div>刀具類型ID</div>
        <div>刀具類型名稱</div>
        <div>編輯</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {toolTypeList.map((item, index) => (
          <>
            <div>{item.Name}</div>
            <div>{item.ToolTypeID}</div>
            <div>編輯</div>
          </>
        ))}
      </div>
      <div className="absolute top-2 right-5">
        <Link
          href="/tool-manager/tool-status/tool-type/new"
          className="p-1 text-sm bg-indigo-500 rounded-md"
        >
          新增刀具類型
        </Link>
      </div>
    </div>
  );
};

export default ToolTypeIndex;
