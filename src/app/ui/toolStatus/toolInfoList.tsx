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
  setSelectToolID: React.Dispatch<React.SetStateAction<string>>;
}

const ToolInfoList = ({
  toolStatusList,
  setSelectToolID,
}: ToolInfoListProps) => {
  return (
    <>
      <div className="p-1 my-1 overflow-auto bg-gray-900 rounded-xl max-h-[32rem]">
        <div className="grid grid-cols-6 gap-2 text-center ">
          <div className="truncate">刀具序號</div>
          <div className="truncate">狀態/修整次數</div>
          <div className="truncate">裝載狀態/設備</div>
          <div className="truncate">累積加工長度</div>
          <div className="truncate">累積加工時間</div>
          <div className="truncate">更新時間</div>
        </div>
        <div>
          {toolStatusList.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-2 text-center cursor-pointer hover:bg-indigo-500"
              onClick={() => setSelectToolID(item.ToolSpecID)}
            >
              <div className="truncate ">{item.ToolSN}</div>
              <div className="truncate ">
                {item.LifeStatus}/{item.LifeData.RepairCnt}
              </div>
              <div className="truncate ">
                {item.LoadingStatus.IsLoading}/{item.LoadingStatus.MachineSN}
              </div>
              <div className="truncate ">{item.LifeData.ProcessLength}</div>
              <div className="truncate ">{item.LifeData.ProcessTime}</div>
              <div className="truncate ">{item.LastModify}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToolInfoList;
