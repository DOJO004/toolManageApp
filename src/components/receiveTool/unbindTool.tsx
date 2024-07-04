import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import Link from "next/link";
import { FormEvent } from "react";

interface Props {
  searchUnbindTool: (e: FormEvent) => void;
  inputUnbindTool: string;
  setInputUnbindTool: (value: string) => void;
  toolList: ToolStockItem[];
  selectTool: number;
  handleClickBindData: (params: {
    key: string;
    index: number;
    ToolSn: string;
  }) => void;
}

export default function UnbindTool({
  searchUnbindTool,
  inputUnbindTool,
  setInputUnbindTool,
  toolList,
  selectTool,
  handleClickBindData,
}: Props) {
  return (
    <div className="w-full p-4 overflow-auto text-center bg-gray-900 rounded-md max-h-[700px]">
      <div className="sticky bg-gray-900 -top-4">
        <h3>未綁定刀具</h3>
        <form
          className="flex items-center justify-center w-full gap-2 mt-4"
          onSubmit={(e) => searchUnbindTool(e)}
        >
          <input
            type="search"
            id="search"
            className="w-full p-2 text-black rounded-md"
            placeholder="搜尋刀具"
            value={inputUnbindTool}
            onChange={(e) => setInputUnbindTool(e.target.value)}
          />
        </form>
        <div className="grid grid-cols-3 mt-4 bg-indigo-500">
          <p className="p-1 whitespace-nowrap">刀具類型</p>
          <p className="p-1 whitespace-nowrap">刀具規格</p>
          <p className="p-1 whitespace-nowrap">刀具 SN</p>
        </div>
      </div>

      {toolList.length > 0 ? (
        toolList.map((item: ToolStockItem, index) => (
          <div
            key={item.ToolSn}
            className={`cursor-pointer  grid grid-cols-3 hover:bg-gray-600 ${selectTool === index ? "bg-gray-600" : ""}`}
            onClick={() =>
              handleClickBindData({
                key: "tool",
                ToolSn: item.ToolSn,
                index: index,
              })
            }
          >
            <p className="p-1 whitespace-nowrap">{item.ToolTypeData.Name}</p>
            <p className="p-1 truncate whitespace-nowrap">
              {item.ToolSpecName}
            </p>
            <p className="p-1 whitespace-nowrap">{item.ToolSn}</p>
          </div>
        ))
      ) : (
        <div>
          <p>
            無此刀具... <br />
            <Link
              href="/tool-manager/tool-info/tool-stock"
              className="text-blue-500 hover:text-blue-600"
            >
              新增庫存?
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
