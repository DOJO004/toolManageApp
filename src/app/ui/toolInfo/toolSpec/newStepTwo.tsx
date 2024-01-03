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

interface NewStepTwoProps {
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
  nextPage: () => void;
  prevPage: () => void;
}
const NewStepTwo = ({
  setToolSpecInfo,
  toolSpecInfo,
  nextPage,
  prevPage,
}: NewStepTwoProps) => {
  return (
    <div>
      <p>○●○</p>
      <input
        type="number"
        placeholder="Φ"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.Specification.BladeDiameter}
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
        value={toolSpecInfo.Specification.BladeHeight}
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
        value={toolSpecInfo.Specification.TotalLength}
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
        value={toolSpecInfo.Specification.HandleDiameter}
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
export default NewStepTwo;
