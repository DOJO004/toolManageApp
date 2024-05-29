import React, { FormEvent, useEffect } from "react";
import { MachineTypeItem } from "../machineType/types";
import { ProductLineItem } from "../productLine/types";
import { NewMachineSpecItem } from "./types";

interface Props {
  setNewMachineSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
  postMachineSpec: (e: FormEvent<HTMLFormElement>) => void;
  newMachineSpec: NewMachineSpecItem;
  handleNewMachineSpec: (key: string, value: string | number | boolean) => void;
  productLineList: ProductLineItem[];
  machineTypeList: MachineTypeItem[];
}

export default function NewMachineSpec({
  setNewMachineSpecMode,
  postMachineSpec,
  newMachineSpec,
  handleNewMachineSpec,
  productLineList,
  machineTypeList,
}: Props) {
  useEffect(() => {}, []);
  return (
    <div className="p-4 bg-gray-900 rounded-xl">
      <div className="relative ">
        <h3 className="font-bold text-left">新增設備規格</h3>
        <button
          className="absolute top-0 right-0 p-1 m-2 rounded-full hover:bg-gray-700 "
          onClick={() => setNewMachineSpecMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postMachineSpec(e)}>
        <div className="flex gap-2 p-2 my-4 overflow-auto">
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="productLineId">
              生產線
            </label>
            <select
              id="productLineId"
              className="w-full p-2 text-black rounded-md min-w-24"
              value={newMachineSpec.ProductLineId}
              onChange={(e) =>
                handleNewMachineSpec("ProductLineId", e.target.value)
              }
            >
              <option value="" className="text-gray-300">
                選擇生產線
              </option>
              {productLineList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="machineTypeId">
              設備類型
            </label>
            <select
              id="machineTypeId"
              className="w-full p-2 text-black rounded-md min-w-24"
              value={newMachineSpec.MachineTypeId}
              onChange={(e) =>
                handleNewMachineSpec("MachineTypeId", e.target.value)
              }
            >
              <option value="" className="text-gray-300">
                選擇設備類型
              </option>
              {machineTypeList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="serialNumber">
              設備 SN
            </label>
            <input
              id="serialNumber"
              className="w-full p-2 text-black rounded-md min-w-24"
              value={newMachineSpec.SerialNumber}
              placeholder="設備 SN 序號"
              onChange={(e) =>
                handleNewMachineSpec("SerialNumber", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="name">
              設備名稱
            </label>
            <input
              id="name"
              className="w-full p-2 text-black rounded-md min-w-24"
              value={newMachineSpec.Name}
              placeholder="設備名稱"
              onChange={(e) => handleNewMachineSpec("Name", e.target.value)}
            />
          </div>

          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="machineIP">
              設備 IP 位址
            </label>
            <input
              id="machineIP"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="設備 IP 位址"
              value={newMachineSpec.MachineIP}
              onChange={(e) =>
                handleNewMachineSpec("MachineIP", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="readerId">
              讀取器 ID
            </label>
            <input
              id="readerId"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="讀取器 ID"
              value={newMachineSpec.ReaderId}
              onChange={(e) => handleNewMachineSpec("ReaderId", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="brand">
              品牌
            </label>
            <input
              id="brand"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="品牌"
              value={newMachineSpec.Brand}
              onChange={(e) => handleNewMachineSpec("Brand", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="series">
              系列
            </label>
            <input
              id="series"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="系列"
              value={newMachineSpec.Series}
              onChange={(e) => handleNewMachineSpec("Series", e.target.value)}
            />
          </div>

          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="mt">
              MT
            </label>
            <input
              id="mt"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="MT"
              value={newMachineSpec.MT}
              onChange={(e) => handleNewMachineSpec("MT", e.target.value)}
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="axisIndex">
              AxisIndex
            </label>
            <input
              type="number"
              id="axisIndex"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="AxisIndex"
              value={newMachineSpec.AxisIndex}
              onChange={(e) =>
                handleNewMachineSpec("AxisIndex", e.target.value)
              }
            />
          </div>
          <div className="relative my-4">
            <label className="absolute left-0 -top-6" htmlFor="axisName">
              AxisName
            </label>
            <input
              type="text"
              id="axisName"
              className="w-full p-2 text-black rounded-md min-w-24"
              placeholder="AxisName"
              value={newMachineSpec.AxisName}
              onChange={(e) => handleNewMachineSpec("AxisName", e.target.value)}
            />
          </div>
          <div className="my-4 ">
            <input
              type="checkbox"
              id="isSpindle"
              checked={newMachineSpec.IsSpindle}
              onChange={(e) =>
                handleNewMachineSpec("IsSpindle", e.target.checked)
              }
            />
            <label htmlFor="isSpindle">IsSpindle</label>
          </div>
        </div>
        <button className="w-full p-1 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
