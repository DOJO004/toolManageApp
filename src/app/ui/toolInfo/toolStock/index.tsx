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
    <div className="relative w-full p-2 mx-auto text-center bg-gray-900 rounded-xl">
      <p className="">刀具庫存</p>
      <hr className="my-2" />
      <div className="mt-2 overflow-auto rounded-t-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 text-black whitespace-nowrap">刀具規格ID</th>
              <th className="p-1 text-black whitespace-nowrap">總數</th>
              <th className="p-1 text-black whitespace-nowrap">庫存安全線</th>
              <th className="p-1 text-black whitespace-nowrap">警告</th>
              <th className="p-1 text-black whitespace-nowrap">危險</th>
              <th className="p-1 text-black whitespace-nowrap">待修中</th>
              <th className="p-1 text-black whitespace-nowrap">修整中</th>
              <th className="p-1 text-black whitespace-nowrap">可使用</th>
            </tr>
          </thead>
          <tbody>
            {toolStockList?.map((item, index) => (
              <tr key={item.ToolSpecID} className=" even:bg-gray-700">
                <td className="p-1 whitespace-nowrap">{item.ToolSpecID}</td>
                <td className="p-1 whitespace-nowrap">{item.TotalQty}</td>
                <td className="p-1 whitespace-nowrap">{item.SafetyStock}</td>
                <td className="p-1 whitespace-nowrap">{item.AlarmCnt}</td>
                <td className="p-1 whitespace-nowrap">{item.WarningCnt}</td>
                <td className="p-1 whitespace-nowrap">{item.NeedRepairCnt}</td>
                <td className="p-1 whitespace-nowrap">{item.RepairCnt}</td>
                <td className="p-1 whitespace-nowrap">
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
