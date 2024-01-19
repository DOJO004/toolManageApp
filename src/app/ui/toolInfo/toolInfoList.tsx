import React from "react";

interface ToolInfoListItem {
  ToolSpecID: string;
  ToolName: string;
  ToolType: string;
  LoadingStatus: {
    IsLoading: boolean;
    MachineSN: string;
  };
  LoadingLogList: [];
  LastModify: string;
  ToolSN: string;
  LifeStatus: string;
  LifePercentage: number;
  LifeData: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
}

interface ToolInfoListProps {
  toolStatusList: ToolInfoListItem[];
  handleToolStatusItem: (item: object) => void;
}

const ToolInfoList = ({
  toolStatusList,
  handleToolStatusItem,
}: ToolInfoListProps) => {
  return (
    <div className="w-full">
      <div className="overflow-auto rounded-md">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">狀態/修整次數</th>
              <th className="p-1 whitespace-nowrap">裝載狀態/設備</th>
              <th className="p-1 whitespace-nowrap">累積加工長度</th>
              <th className="p-1 whitespace-nowrap">累積加工時間</th>
              <th className="p-1 whitespace-nowrap">累積加工時間</th>
            </tr>
          </thead>
          <tbody>
            {toolStatusList.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer even:bg-gray-600"
                onClick={() => handleToolStatusItem(item)}
              >
                <td className="p-1 whitespace-nowrap ">{item.ToolSN}</td>
                <td className="p-1 whitespace-nowrap ">
                  {item.LifeStatus}/{item.LifeData.RepairCnt}
                </td>
                <td className="p-1 whitespace-nowrap ">
                  {item.LoadingStatus.IsLoading}/{item.LoadingStatus.MachineSN}
                </td>
                <td className="p-1 whitespace-nowrap ">
                  {item.LifeData.ProcessLength}
                </td>
                <td className="p-1 whitespace-nowrap ">
                  {item.LifeData.ProcessTime}
                </td>
                <td className="p-1 whitespace-nowrap ">{item.LastModify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolInfoList;
