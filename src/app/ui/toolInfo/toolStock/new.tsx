import React, { FormEvent } from "react";
import Notice from "../../notice";
import { BackBtn, CloseBtn } from "../../buttons";
import { useRouter } from "next/navigation";

interface ToolSpecItem {
  ToolSpecID: "22";
  Name: "22";
  ToolType: "DRILL/鑽頭 001";
  Specification: {
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
  };
  SafetyStock: number;
  MaxLife: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
}

interface ToolStockNewProps {
  toolSpecList: ToolSpecItem[];
  fetchAddToolStock: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
  setToolSpecID: React.Dispatch<React.SetStateAction<string>>;
  addQty: string;
  setAddQty: React.Dispatch<React.SetStateAction<string>>;
  changeNewMode: () => void;
}

const ToolStockNew = ({
  toolSpecList,
  fetchAddToolStock,
  notice,
  isError,
  setToolSpecID,
  addQty,
  setAddQty,
  changeNewMode,
}: ToolStockNewProps) => {
  const router = useRouter();
  return (
    <div className="relative mb-2 md:w-fit md:mx-2">
      <form
        className="flex flex-col justify-center w-full p-4 bg-gray-900 border-2 rounded-md"
        onSubmit={(e) => fetchAddToolStock(e)}
      >
        <p className="text-xl text-center">新增刀具庫存</p>
        <hr className="my-2" />
        <div>
          <label htmlFor="tool-spec-id">刀具規格ID</label>
          <select
            defaultValue={""}
            className="block pl-2 mx-auto my-2 text-gray-500 rounded-md min-h-10 min-w-72"
            onChange={(e) => setToolSpecID(e.target.value)}
          >
            <option value="" className="text-gray-500 " disabled>
              請選擇刀具規格ID
            </option>
            {toolSpecList?.map((item, index) => (
              <option
                key={item.ToolSpecID}
                value={item.ToolSpecID}
                className="text-gray-500 "
              >
                {item.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="count">數量</label>
          <input
            id="count"
            type="number"
            placeholder="數量"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            value={addQty}
            onChange={(e) => setAddQty(e.target.value)}
          />
        </div>
        <button className="block pl-2 mx-auto my-2 bg-indigo-500 rounded-md min-h-10 min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ToolStockNew;
