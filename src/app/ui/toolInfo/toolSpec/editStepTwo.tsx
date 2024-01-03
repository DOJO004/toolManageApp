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

interface EditStepTwoProps {
  toolInfo: ToolInfoItem;
  setToolInfo: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  nextPage: () => void;
  prevPage: () => void;
}

const EditStepTwo = ({
  toolInfo,
  setToolInfo,
  nextPage,
  prevPage,
}: EditStepTwoProps) => {
  return (
    <div>
      <p>○●○</p>
      <input
        type="number"
        placeholder="Φ"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.Specification.BladeDiameter}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            Specification: {
              ...toolInfo.Specification,
              BladeDiameter: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="刀具高度"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.Specification.BladeHeight}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            Specification: {
              ...toolInfo.Specification,
              BladeHeight: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="總長度"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.Specification.TotalLength}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            Specification: {
              ...toolInfo.Specification,
              TotalLength: e.target.value,
            },
          })
        }
      />
      <input
        type="number"
        placeholder="手柄Φ"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.Specification.HandleDiameter}
        onChange={(e) =>
          setToolInfo({
            ...toolInfo,
            Specification: {
              ...toolInfo.Specification,
              HandleDiameter: e.target.value,
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
        onClick={() => nextPage()}
      >
        下一步
      </button>
    </div>
  );
};

export default EditStepTwo;
