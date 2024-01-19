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
  editToolSpec: ToolInfoItem;
  setEditToolSpec: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  nextPage: () => void;
  prevPage: () => void;
}

const EditStepTwo = ({
  editToolSpec,
  setEditToolSpec,
  nextPage,
  prevPage,
}: EditStepTwoProps) => {
  return (
    <div>
      <p>○●○</p>
      <label htmlFor="BladeDiameter">Φ</label>
      <input
        id="BladeDiameter"
        type="number"
        placeholder="Φ"
        className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
        value={editToolSpec?.Specification?.BladeDiameter}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            Specification: {
              ...editToolSpec.Specification,
              BladeDiameter: e.target.value,
            },
          })
        }
      />
      <label htmlFor="BladeHeight">刀具高度</label>
      <input
        id="BladeHeight"
        type="number"
        placeholder="刀具高度"
        className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
        value={editToolSpec?.Specification?.BladeHeight}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            Specification: {
              ...editToolSpec.Specification,
              BladeHeight: e.target.value,
            },
          })
        }
      />
      <label htmlFor="TotalLength">總長度</label>
      <input
        id="TotalLength"
        type="number"
        placeholder="總長度"
        className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
        value={editToolSpec?.Specification?.TotalLength}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            Specification: {
              ...editToolSpec.Specification,
              TotalLength: e.target.value,
            },
          })
        }
      />
      <label htmlFor="HandleDiameter">手柄Φ</label>
      <input
        id="HandleDiameter"
        type="number"
        placeholder="手柄Φ"
        className="block w-full pl-2 mx-auto mb-2 text-black rounded-md min-h-10"
        value={editToolSpec?.Specification?.HandleDiameter}
        onChange={(e) =>
          setEditToolSpec({
            ...editToolSpec,
            Specification: {
              ...editToolSpec.Specification,
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
