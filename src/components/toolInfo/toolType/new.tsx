import { ToolTypeItem } from "@/scripts/Apis/toolInfo/types";
import { FormEvent } from "react";

interface NewToolTypeProps {
  postToolType: (e: FormEvent) => void;
  newToolType: ToolTypeItem;
  setNewToolType: React.Dispatch<React.SetStateAction<ToolTypeItem>>;
}
export function NewToolType({
  postToolType,
  newToolType,
  setNewToolType,
}: NewToolTypeProps) {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md ">
      <h4 id="scrollTarget" className="my-4 font-bold text-left">
        新增刀具類型
      </h4>
      <form onSubmit={(e) => postToolType(e)}>
        <div className="grid items-center grid-cols-2 gap-2">
          <div className="relative p-2">
            <label htmlFor="id" className="absolute left-2 -top-4 ">
              刀具類型 ID
            </label>
            <input
              type="text"
              id="id"
              className="w-full p-2 text-black border rounded-md"
              value={newToolType.Id}
              placeholder="刀具類型 ID"
              onChange={(e) =>
                setNewToolType({
                  ...newToolType,
                  Id: e.target.value,
                })
              }
            />
          </div>
          <div className="relative p-2">
            <label htmlFor="name" className="absolute left-2 -top-4 ">
              刀具類型名稱
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 text-black border rounded-md "
              placeholder="刀具類型名稱"
              value={newToolType.Name}
              onChange={(e) =>
                setNewToolType({
                  ...newToolType,
                  Name: e.target.value,
                })
              }
            />
          </div>
        </div>
        <button className="w-full my-2 bg-indigo-500 hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
