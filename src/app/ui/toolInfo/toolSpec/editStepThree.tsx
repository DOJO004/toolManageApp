interface ToolInfoItem {
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
interface EditStepThreeProps {
  toolInfo: ToolInfoItem;
  setToolInfo: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  prevPage: () => void;
  fetchEditToolInfo: () => void;
}

const EditStepThree = ({
  toolInfo,
  setToolInfo,
  prevPage,
  fetchEditToolInfo,
}: EditStepThreeProps) => {
  return (
    <div>
      <p>○○●</p>
      <input
        type="number"
        placeholder="安全庫存"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.SafetyStock}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            SafetyStock: e.target.value,
          })
        }
      />
      <input
        type="number"
        placeholder="最大修整次數"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.MaxLife.RepairCnt}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            MaxLife: {
              ...toolInfo.MaxLife,
              RepairCnt: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="最大加工次數"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.MaxLife.ProcessCnt}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            MaxLife: {
              ...toolInfo.MaxLife,
              ProcessCnt: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="最大加工長度"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.MaxLife.ProcessLength}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            MaxLife: {
              ...toolInfo.MaxLife,
              ProcessLength: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="最大加工時間"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.MaxLife.ProcessTime}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            MaxLife: {
              ...toolInfo.MaxLife,
              ProcessTime: e.target.value,
            },
          })
        }
      />
      <button
        className="p-2 mx-2 bg-gray-500 rounded-md min-w-32"
        onClick={() => prevPage()}
      >
        上一步
      </button>
      <button
        className="p-2 mx-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => fetchEditToolInfo()}
      >
        完成
      </button>
    </div>
  );
};

export default EditStepThree;
