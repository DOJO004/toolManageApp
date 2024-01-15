import React from "react";
import { AddBtn } from "../../buttons";
import PageController from "../../pageController/pageController";

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

interface ToolStockIndexProps {
  toolStockList: ToolStockItem[];
  changeNewMode: () => void;
}

const ToolStockIndex = ({
  toolStockList,
  changeNewMode,
}: ToolStockIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 max-w-fit rounded-xl">
      <p className="text-xl">刀具庫存</p>
      <div className="mt-2 overflow-hidden rounded-t-xl">
        <table>
          <thead>
            <tr className="bg-indigo-300 ">
              <th className="p-1 text-black">刀具規格ID</th>
              <th className="p-1 text-black">總數</th>
              <th className="p-1 text-black">庫存安全線</th>
              <th className="p-1 text-black">警告</th>
              <th className="p-1 text-black">危險</th>
              <th className="p-1 text-black">待修中</th>
              <th className="p-1 text-black">修整中</th>
              <th className="p-1 text-black">可使用</th>
            </tr>
          </thead>
          <tbody>
            {toolStockList?.map((item, index) => (
              <tr key={item.ToolSpecID} className=" even:bg-gray-700">
                <td className="p-1">{item.ToolSpecID}</td>
                <td className="p-1">{item.TotalQty}</td>
                <td className="p-1">{item.SafetyStock}</td>
                <td className="p-1">{item.AlarmCnt}</td>
                <td className="p-1">{item.WarningCnt}</td>
                <td className="p-1">{item.NeedRepairCnt}</td>
                <td className="p-1">{item.RepairCnt}</td>
                <td className="p-1">
                  {item.TotalQty -
                    item.AlarmCnt -
                    item.WarningCnt -
                    item.NeedRepairCnt -
                    item.RepairCnt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-2 right-5">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ToolStockIndex;
