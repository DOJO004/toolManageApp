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

interface NewStepThreeProps {
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
  fetchNewToolSpecInfo: () => void;
  prevPage: () => void;
}
const NewStepThree = ({
  setToolSpecInfo,
  toolSpecInfo,
  fetchNewToolSpecInfo,
  prevPage,
}: NewStepThreeProps) => {
  return (
    <div>
      <p>○○●</p>
      <input
        type="number"
        placeholder="安全庫存"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.SafetyStock}
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
        value={toolSpecInfo.MaxLife.RepairCnt}
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
      <input
        type="number"
        placeholder="最大加工次數"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.MaxLife.ProcessCnt}
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
        placeholder="最大加工長度"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.MaxLife.ProcessLength}
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
        value={toolSpecInfo.MaxLife.ProcessTime}
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
      <button
        className="p-2 mx-2 bg-gray-500 rounded-md min-w-32"
        onClick={() => prevPage()}
      >
        上一步
      </button>
      <button
        className="p-2 mx-2 bg-blue-500 rounded-md min-w-32"
        onClick={() => fetchNewToolSpecInfo()}
      >
        完成
      </button>
    </div>
  );
};

export default NewStepThree;
