import React from "react";
import { AddBtn } from "../../buttons";

interface ToolStockIndexProps {
  toolStockList: ToolStockItem[];
}

interface ToolStockItem {
  ToolSpecID: string;
  ToolType: string;
  SafetyStock: number;
  TotalQty: number;
  WarningCnt: number;
  AlarmCnt: number;
  NeedRepairCnt: number;
  RepairCnt: number;
  ToolLifeList: [];
}

const ToolStockIndex = ({ toolStockList }: ToolStockIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 max-w-fit rounded-xl">
      <p className="text-xl">刀具庫存</p>
      <div className="grid grid-cols-8 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">刀具規格ID</div>
        <div className="truncate ">總數</div>
        <div className="truncate ">庫存安全線</div>
        <div className="truncate ">警告</div>
        <div className="truncate ">危險</div>
        <div className="truncate ">待修中</div>
        <div className="truncate ">修整中</div>
        <div className="truncate ">可使用</div>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {toolStockList?.map((item, index) => (
          <React.Fragment key={item.ToolSpecID}>
            <div>{item.ToolSpecID}</div>
            <div>{item.TotalQty}</div>
            <div>{item.SafetyStock}</div>
            <div>{item.AlarmCnt}</div>
            <div>{item.WarningCnt}</div>
            <div>{item.NeedRepairCnt}</div>
            <div>{item.RepairCnt}</div>
            <div>
              {item.TotalQty -
                item.AlarmCnt -
                item.WarningCnt -
                item.NeedRepairCnt -
                item.RepairCnt}
            </div>
          </React.Fragment>
        ))}
      </div>
      <button className="absolute top-2 right-5">
        <AddBtn link="/tool-manager/tool-info/tool-stock/new" />
      </button>
    </div>
  );
};

export default ToolStockIndex;
