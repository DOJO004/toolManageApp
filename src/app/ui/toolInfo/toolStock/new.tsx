import React, { FormEvent } from "react";
import Notice from "../../notice";
import { BackBtn } from "../../buttons";
import { useRouter } from "next/navigation";

interface ToolStockNewProps {
  toolSpecList: ToolSpecItem[];
  fetchAddToolStock: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
  setToolSpecID: React.Dispatch<React.SetStateAction<string>>;
  addQty: string;
  setAddQty: React.Dispatch<React.SetStateAction<string>>;
}

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
const ToolStockNew = ({
  toolSpecList,
  fetchAddToolStock,
  notice,
  isError,
  setToolSpecID,
  addQty,
  setAddQty,
}: ToolStockNewProps) => {
  const router = useRouter();
  return (
    <form
      className="relative flex flex-col justify-center w-full p-4 bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchAddToolStock(e)}
    >
      <p className="text-xl text-center">新增刀具庫存</p>
      {notice && <Notice isError={isError} />}
      <select
        defaultValue={""}
        className="block pl-2 mx-auto my-2 text-gray-500 rounded-md min-h-10 min-w-72"
        onChange={(e) => setToolSpecID(e.target.value)}
      >
        <option value="" className="text-gray-500 " disabled>
          請選擇刀具規格ID
        </option>
        {toolSpecList.map((item, index) => (
          <option
            key={item.ToolSpecID}
            value={item.ToolSpecID}
            className="text-gray-500 "
          >
            {item.Name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="數量"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={addQty}
        onChange={(e) => setAddQty(e.target.value)}
      />
      <button className="p-2 bg-blue-500 rounded-md min-w-72 ">新增</button>
      <div className="absolute top-3 left-5">
        <BackBtn backFunction={router.back} />
      </div>
    </form>
  );
};

export default ToolStockNew;
