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
      <div>
        <label htmlFor="phi">Φ</label>
        <input
          id="phi"
          type="number"
          placeholder="Φ"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.Specification?.BladeDiameter}
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
      </div>
      <div>
        <label htmlFor="tool-height">刀具高度</label>
        <input
          id="tool-height"
          type="number"
          placeholder="刀具高度"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.Specification?.BladeHeight}
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
      </div>
      <div>
        <label htmlFor="total-height">總長度</label>
        <input
          id="total-height"
          type="number"
          placeholder="總長度"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.Specification?.TotalLength}
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
      </div>
      <div>
        <label htmlFor="handle-phi">手柄Φ</label>
        <input
          id="handle-phi"
          type="number"
          placeholder="手柄Φ"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.Specification?.HandleDiameter}
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
      </div>
      <div className="mt-6">
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
    </div>
  );
};
export default NewStepTwo;
