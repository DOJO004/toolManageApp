import { NewToolSpecItem, ToolTypeItem } from "@/scripts/Apis/toolInfo/types";
import React, { FormEvent } from "react";

interface Props {
  setNewToolSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
  postNewToolSpec: (e: FormEvent) => void;
  newToolSpec: NewToolSpecItem;
  toolTypeList: ToolTypeItem[];
  handleNewToolSpec: (key: string, value: string | number) => void;
}

export function NewToolSpec({
  setNewToolSpecMode,
  postNewToolSpec,
  newToolSpec,
  toolTypeList,
  handleNewToolSpec,
}: Props) {
  return (
    <div className="p-2 bg-gray-900 rounded-md">
      <div className="relative ">
        <div className="flex items-end gap-2">
          <h3 className="font-bold text-left ">新增刀具規格</h3>
          <p className="text-sm text-gray-400 ">長度單位: mm</p>
          <p className="text-sm text-gray-400 ">時間單位: sec</p>
        </div>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900"
          onClick={() => setNewToolSpecMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postNewToolSpec(e)}>
        <div className="flex gap-2 mx-auto my-4 overflow-auto text-center whitespace-nowrap">
          <div className="">
            <label htmlFor="ID" className="block">
              刀具類型
            </label>
            <select
              id="ID"
              value={newToolSpec.ToolTypeId}
              className="w-full text-black rounded-md min-w-24"
              onChange={(e) => handleNewToolSpec("ToolTypeId", e.target.value)}
            >
              <option value="" className="text-gray-400 ">
                請選擇
              </option>
              {toolTypeList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black ">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="ID" className="block">
              刀具規格 ID
            </label>
            <input
              id="ID"
              type="text"
              className="w-full text-center text-black rounded-md min-w-24 "
              placeholder="刀具規格 ID"
              value={newToolSpec.ToolSpecId}
              onChange={(e) => handleNewToolSpec("ToolSpecId", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="Name" className="block">
              刀具規格名稱
            </label>
            <input
              id="Name"
              type="text"
              className="w-full text-center text-black rounded-md min-w-24 "
              placeholder="刀具規格名稱"
              value={newToolSpec.Name}
              onChange={(e) => handleNewToolSpec("Name", e.target.value)}
            />
          </div>

          <div className="">
            <label htmlFor="Φ" className="block">
              Φ
            </label>
            <input
              id="Φ"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.BladeDiameter}
              onChange={(e) =>
                handleNewToolSpec("BladeDiameter", e.target.value)
              }
            />
          </div>
          <div className="">
            <label htmlFor="height" className="block">
              高度
            </label>
            <input
              id="height"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.BladeHeight}
              onChange={(e) => handleNewToolSpec("BladeHeight", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="totalLength" className="block">
              總長度
            </label>
            <input
              id="totalLength"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.TotalLength}
              onChange={(e) => handleNewToolSpec("TotalLength", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="手柄Φ" className="block">
              手柄Φ
            </label>
            <input
              id="手柄Φ"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.HandleDiameter}
              onChange={(e) =>
                handleNewToolSpec("HandleDiameter", e.target.value)
              }
            />
          </div>
          <div className="">
            <label htmlFor="safetyStock" className="block">
              安全庫存
            </label>
            <input
              id="safetyStock"
              type="text"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.SafetyStock}
              onChange={(e) => handleNewToolSpec("SafetyStock", e.target.value)}
            />
          </div>

          <div className="">
            <label htmlFor="RepairCnt" className="block">
              最大修整次數
            </label>
            <input
              id="RepairCnt"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.RepairCnt}
              onChange={(e) => handleNewToolSpec("RepairCnt", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="ProcessCnt" className="block">
              最大加工次數
            </label>
            <input
              id="ProcessCnt"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.ProcessCnt}
              onChange={(e) => handleNewToolSpec("ProcessCnt", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="ProcessLength" className="block">
              最大加工長度
            </label>
            <input
              id="ProcessLength"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.ProcessLength}
              onChange={(e) =>
                handleNewToolSpec("ProcessLength", e.target.value)
              }
            />
          </div>
          <div className="">
            <label htmlFor="ProcessTime" className="block">
              最大加工時間
            </label>
            <input
              id="ProcessTime"
              type="number"
              className="w-full text-center text-black rounded-md min-w-24 "
              value={newToolSpec.ProcessTime}
              onChange={(e) => handleNewToolSpec("ProcessTime", e.target.value)}
            />
          </div>
        </div>
        <button className="w-full my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          送出
        </button>
      </form>
    </div>
  );
}
