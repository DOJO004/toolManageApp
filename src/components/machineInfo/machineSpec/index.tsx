import SubmitButton from "@/components/buttons";
import {
  EditMachineSpecItem,
  MachineSpecItem,
  MachineTypeItem,
  ProductLineItem,
} from "@/scripts/Apis/machineInfo/types";
import React from "react";

interface Props {
  machineSpecList: MachineSpecItem[];
  editMachineSpecMode: boolean;
  editMachineSpecModeIndex: number;
  editMachineSpec: EditMachineSpecItem;
  handleEditMachineSpec: (key: string, value: string) => void;
  productLineList: ProductLineItem[];
  machineTypeList: MachineTypeItem[];
  patchMachineSpec: () => void;
  deleteMachineSpec: () => void;
  clickEditMachineSpec: (item: MachineSpecItem, index: number) => void;
  isPending: boolean;
}
export default function MachineSpecIndex({
  machineSpecList,
  editMachineSpecMode,
  editMachineSpecModeIndex,
  editMachineSpec,
  handleEditMachineSpec,
  productLineList,
  machineTypeList,
  patchMachineSpec,
  deleteMachineSpec,
  clickEditMachineSpec,
  isPending,
}: Props) {
  return (
    <table className="w-full ">
      <thead className="">
        <tr className="bg-indigo-500 ">
          <th className="p-1 whitespace-nowrap">生產線</th>
          <th className="p-1 whitespace-nowrap">設備類型名稱</th>
          <th className="p-1 whitespace-nowrap">設備 SN 序號</th>
          <th className="p-1 whitespace-nowrap">設備名稱</th>
          <th className="p-1 whitespace-nowrap">品牌</th>
          <th className="p-1 whitespace-nowrap">系列</th>
          <th className="p-1 whitespace-nowrap">設備IP位址</th>
          <th className="p-1 whitespace-nowrap">讀取器ID</th>
          <th className="p-1 whitespace-nowrap">編輯</th>
        </tr>
      </thead>
      <tbody>
        {machineSpecList.length > 0 ? (
          machineSpecList.map((item, index) => (
            <React.Fragment key={item.MachineId}>
              {editMachineSpecMode && editMachineSpecModeIndex === index ? (
                <tr>
                  <td>
                    <select
                      value={editMachineSpec.ProductLineId}
                      className="w-32 text-center text-black rounded-md"
                      onChange={(e) =>
                        handleEditMachineSpec("ProductLineId", e.target.value)
                      }
                    >
                      {productLineList.map((item) => (
                        <option
                          key={item.Id}
                          value={item.Id}
                          className="text-black"
                        >
                          {item.Name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.MachineTypeId}
                      onChange={(e) =>
                        handleEditMachineSpec("MachineTypeId", e.target.value)
                      }
                    >
                      {machineTypeList.map((item) => (
                        <option
                          value={item.Id}
                          key={item.Id}
                          className="text-black "
                        >
                          {item.Name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.SerialNumber}
                      onChange={(e) =>
                        handleEditMachineSpec("SerialNumber", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.Name}
                      onChange={(e) =>
                        handleEditMachineSpec("Name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.Brand}
                      onChange={(e) =>
                        handleEditMachineSpec("Brand", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.Series}
                      onChange={(e) =>
                        handleEditMachineSpec("Series", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.MachineIP}
                      onChange={(e) =>
                        handleEditMachineSpec("MachineIP", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="w-32 text-center text-black rounded-md"
                      value={editMachineSpec.ReaderId}
                      onChange={(e) =>
                        handleEditMachineSpec("ReaderId", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    <SubmitButton
                      name="完成"
                      classNames="bg-green-500 hover:bg-green-600"
                      onclick={() => patchMachineSpec()}
                      isPending={isPending}
                    />
                    <span> / </span>
                    <button
                      className="p-1 bg-red-500 rounded-md hover:bg-red-600"
                      onClick={() => deleteMachineSpec()}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item.MachineId} className="hover:bg-gray-500">
                  <td className="p-1 whitespace-nowrap">
                    {item.ProductLineData.Name}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.MachineTypeData.Name}
                  </td>
                  <td className="p-1 whitespace-nowrap">{item.SerialNumber}</td>
                  <td className="p-1 whitespace-nowrap">{item.Name}</td>
                  <td className="p-1 whitespace-nowrap">
                    {item.SystemData.Brand}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.SystemData.Series}
                  </td>
                  <td className="p-1 whitespace-nowrap">{item.MachineIP}</td>
                  <td className="p-1 whitespace-nowrap">{item.ReaderId}</td>

                  <td className="p-1 whitespace-nowrap">
                    <button
                      className="p-1 hover:bg-gray-900"
                      onClick={() => clickEditMachineSpec(item, index)}
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan={9}>no data...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
