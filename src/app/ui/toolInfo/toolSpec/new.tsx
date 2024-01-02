import React from "react";

interface ToolTypeItem {
  Name: string;
  ToolTypeID: string;
}

interface ToolSpecItem {
  ToolSpecID: string;
  Name: string;
  ToolType: string;
  Specification: {
    BladeDiameter: string;
    BladeHeight: string;
    TotalLength: string;
    HandleDiameter: string;
  };
  SafetyStock: string;
  MaxLife: {
    ProcessCnt: string;
    ProcessTime: string;
    ProcessLength: string;
    RepairCnt: string;
  };
}

interface ToolSpecNewProps {
  toolTypeList: ToolTypeItem[];
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
  fetchNewToolSpecInfo: () => void;
}

const ToolSpecNew = ({
  toolTypeList,
  toolSpecInfo,
  setToolSpecInfo,
  fetchNewToolSpecInfo,
}: ToolSpecNewProps) => {
  return (
    <div className="flex flex-col justify-center w-full p-4 text-center bg-gray-900 rounded-xl">
      <p>新增刀具規格</p>
      <div className="text-black">
        <div>
          <p>●○○</p>
          <select
            value={toolSpecInfo.ToolType}
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({ ...toolSpecInfo, ToolType: e.target.value })
            }
          >
            <option value="" className="text-black" disabled>
              請選擇刀具類型
            </option>
            {toolTypeList.map((item, index) => (
              <option
                value={item.ToolTypeID}
                key={item.ToolTypeID}
                className="text-black"
              >
                {item.Name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="ID"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({ ...toolSpecInfo, ToolSpecID: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="名稱"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({ ...toolSpecInfo, Name: e.target.value })
            }
          />
          <button className="p-2 bg-blue-500 rounded-md min-w-72 ">
            下一步
          </button>
        </div>
        <div>
          <p>○●○</p>
          <input
            type="number"
            placeholder="Φ"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                Specification: {
                  ...toolSpecInfo.Specification,
                  BladeDiameter: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="刀具高度"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                Specification: {
                  ...toolSpecInfo.Specification,
                  BladeHeight: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="總長度"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                Specification: {
                  ...toolSpecInfo.Specification,
                  TotalLength: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="手柄Φ"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                Specification: {
                  ...toolSpecInfo.Specification,
                  HandleDiameter: e.target.value,
                },
              })
            }
          />
          <button className="p-2 mx-2 bg-gray-500 rounded-md min-w-32">
            上一步
          </button>
          <button className="p-2 mx-2 bg-blue-500 rounded-md min-w-32">
            下一步
          </button>
        </div>
        <div>
          <p>○○●</p>
          <input
            type="number"
            placeholder="安全庫存"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                SafetyStock: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="最大修整次數"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                MaxLife: {
                  ...toolSpecInfo.MaxLife,
                  ProcessCnt: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="最大加工次數"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                MaxLife: {
                  ...toolSpecInfo.MaxLife,
                  ProcessTime: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="最大加工長度"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                MaxLife: {
                  ...toolSpecInfo.MaxLife,
                  ProcessLength: e.target.value,
                },
              })
            }
          />
          <input
            type="number"
            placeholder="最大加工時間"
            className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
            onChange={(e) =>
              setToolSpecInfo({
                ...toolSpecInfo,
                MaxLife: {
                  ...toolSpecInfo.MaxLife,
                  RepairCnt: e.target.value,
                },
              })
            }
          />
          <button className="p-2 mx-2 bg-gray-500 rounded-md min-w-32">
            上一步
          </button>
          <button
            className="p-2 mx-2 bg-blue-500 rounded-md min-w-32"
            onClick={() => fetchNewToolSpecInfo()}
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolSpecNew;
