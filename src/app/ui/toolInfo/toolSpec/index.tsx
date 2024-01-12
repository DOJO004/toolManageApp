import { AddBtn } from "../../buttons";
import React, { Suspense } from "react";
interface ToolSpecItem {
  ToolSpecID: string;
  Name: string;
  ToolType: string;
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

interface ToolSpecIndexProps {
  toolSpecList: ToolSpecItem[];
  changeNewMode: () => void;
  changeEditMode: (index: number) => void;
  fetchGetToolInfoByID: (id: string) => void;
}

const ToolSpecIndex = ({
  toolSpecList,
  changeNewMode,
  changeEditMode,
  fetchGetToolInfoByID,
}: ToolSpecIndexProps) => {
  return (
    <div className="relative w-full p-2 overflow-auto text-center bg-gray-900 rounded-xl">
      <p className="text-xl">刀具規格</p>
      <table>
        <thead>
          <tr className="bg-gray-800">
            <td className="p-1 whitespace-nowrap">ID</td>
            <td className="p-1 whitespace-nowrap">名稱</td>
            <td className="p-1 whitespace-nowrap">Φ</td>
            <td className="p-1 whitespace-nowrap">高度</td>
            <td className="p-1 whitespace-nowrap">總長度</td>
            <td className="p-1 whitespace-nowrap">手柄Φ</td>
            <td className="p-1 whitespace-nowrap">安全庫存</td>
            <td className="p-1 whitespace-nowrap">最大修整次數</td>
            <td className="p-1 whitespace-nowrap">最大加工次數</td>
            <td className="p-1 whitespace-nowrap">最大加工長度</td>
            <td className="p-1 whitespace-nowrap">最大加工時間</td>
            <td className="p-1 whitespace-nowrap">編輯</td>
          </tr>
        </thead>
        <tbody>
          {toolSpecList.map((item, index) => (
            <tr key={item.ToolSpecID}>
              <td className="p-1 whitespace-nowrap ">{item.ToolSpecID}</td>
              <td className="p-1 whitespace-nowrap ">{item.Name}</td>
              <td className="p-1 whitespace-nowrap ">
                {item.Specification.BladeDiameter}
              </td>
              <td className="p-1 whitespace-nowrap ">
                {item.Specification.BladeHeight}
              </td>
              <td className="p-1 whitespace-nowrap ">
                {item.Specification.TotalLength}
              </td>
              <td className="p-1 whitespace-nowrap ">
                {item.Specification.HandleDiameter}
              </td>
              <td className="p-1 whitespace-nowrap ">{item.SafetyStock}</td>
              <td className="p-1 whitespace-nowrap ">
                {item.MaxLife.ProcessCnt}
              </td>
              <td className="p-1 whitespace-nowrap">
                {item.MaxLife.ProcessTime}
              </td>
              <td className="p-1 whitespace-nowrap">
                {item.MaxLife.ProcessLength}
              </td>
              <td className="p-1 whitespace-nowrap ">
                {item.MaxLife.ProcessTime}
              </td>
              <td
                className="whitespace-nowrap"
                onClick={() => {
                  changeEditMode(index), fetchGetToolInfoByID(item.ToolSpecID);
                }}
              >
                編輯
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute top-2 right-2">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ToolSpecIndex;
