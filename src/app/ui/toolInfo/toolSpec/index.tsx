import Link from "next/link";
import { AddBtn } from "../../buttons";
import React from "react";
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
    <div className="relative w-full p-2 text-center bg-gray-900 max-w-fit rounded-xl">
      <p className="text-xl">刀具規格</p>
      <div className="grid grid-cols-12 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">ID</div>
        <div className="truncate ">名稱</div>
        <div className="truncate ">Φ</div>
        <div className="truncate ">高度</div>
        <div className="truncate ">總長度</div>
        <div className="truncate ">手柄Φ</div>
        <div className="truncate ">安全庫存</div>
        <div className="truncate ">最大修整次數</div>
        <div className="truncate ">最大加工次數</div>
        <div className="truncate ">最大加工長度</div>
        <div className="truncate ">最大加工時間</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-1">
        {toolSpecList.map((item, index) => (
          <React.Fragment key={item.ToolSpecID}>
            <div className="truncate ">{item.ToolSpecID}</div>
            <div className="truncate ">{item.Name}</div>
            <div className="truncate ">{item.Specification.BladeDiameter}</div>
            <div className="truncate ">{item.Specification.BladeHeight}</div>
            <div className="truncate ">{item.Specification.TotalLength}</div>
            <div className="truncate ">{item.Specification.HandleDiameter}</div>
            <div className="truncate ">{item.SafetyStock}</div>
            <div className="truncate ">{item.MaxLife.ProcessCnt}</div>
            <div className="truncate ">{item.MaxLife.ProcessTime}</div>
            <div className="truncate ">{item.MaxLife.ProcessLength}</div>
            <div className="truncate ">{item.MaxLife.ProcessTime}</div>
            <button
              className="truncate"
              onClick={() => {
                changeEditMode(index), fetchGetToolInfoByID(item.ToolSpecID);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-2 right-2">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ToolSpecIndex;
