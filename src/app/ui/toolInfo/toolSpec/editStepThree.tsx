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
  editToolSpec: ToolInfoItem;
  setEditToolSpec: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  prevPage: () => void;
  fetchEditToolInfo: () => void;
}

const EditStepThree = ({
  editToolSpec,
  setEditToolSpec,
  prevPage,
  fetchEditToolInfo,
}: EditStepThreeProps) => {
  return (
    <div>
      <p>○○●</p>
      <label htmlFor="SafetyStock">安全庫存</label>
      <input
        id="SafetyStock"
        type="number"
        placeholder="安全庫存"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.SafetyStock}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            SafetyStock: e.target.value,
          })
        }
      />
      <label htmlFor="RepairCnt">最大修整次數</label>
      <input
        id="RepairCnt"
        type="number"
        placeholder="最大修整次數"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.MaxLife?.RepairCnt}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            MaxLife: {
              ...editToolSpec.MaxLife,
              RepairCnt: e.target.value,
            },
          })
        }
      />
      <label htmlFor="ProcessCnt">最大加工次數</label>
      <input
        id="ProcessCnt"
        type="number"
        placeholder="最大加工次數"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.MaxLife?.ProcessCnt}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            MaxLife: {
              ...editToolSpec.MaxLife,
              ProcessCnt: e.target.value,
            },
          })
        }
      />
      <label htmlFor="ProcessLength">最大加工長度</label>
      <input
        id="ProcessLength"
        type="number"
        placeholder="最大加工長度"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.MaxLife?.ProcessLength}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            MaxLife: {
              ...editToolSpec.MaxLife,
              ProcessLength: e.target.value,
            },
          })
        }
      />
      <label htmlFor="ProcessTime">最大加工時間</label>
      <input
        id="ProcessTime"
        type="number"
        placeholder="最大加工時間"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.MaxLife?.ProcessTime}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            MaxLife: {
              ...editToolSpec.MaxLife,
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
