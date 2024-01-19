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
      <div>
        <label htmlFor="safety-stock">安全庫存</label>
        <input
          id="safety-stock"
          type="number"
          placeholder="安全庫存"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.SafetyStock}
          onChange={(e) =>
            setToolSpecInfo({
              ...toolSpecInfo,
              SafetyStock: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="process-repair-cnt">最大修整次數</label>
        <input
          id="process-repair-cnt"
          type="number"
          placeholder="最大修整次數"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.MaxLife?.RepairCnt}
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
      </div>
      <div>
        <label htmlFor="process-account">最大加工次數</label>
        <input
          id="process-account"
          type="number"
          placeholder="最大加工次數"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.MaxLife?.ProcessCnt}
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
      </div>
      <div>
        <label htmlFor="process-length">最大加工長度</label>
        <input
          id="process-length"
          type="number"
          placeholder="最大加工長度"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.MaxLife?.ProcessLength}
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
      </div>
      <div>
        <label htmlFor="process-time">最大加工時間</label>
        <input
          id="process-time"
          type="number"
          placeholder="最大加工時間"
          className="block w-full h-8 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.MaxLife?.ProcessTime}
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
          onClick={() => fetchNewToolSpecInfo()}
        >
          完成
        </button>
      </div>
    </div>
  );
};

export default NewStepThree;
