import next from "next";

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

interface NewStepOneProps {
  toolTypeList: ToolTypeItem[];
  toolSpecInfo: ToolSpecItem;
  setToolSpecInfo: React.Dispatch<React.SetStateAction<ToolSpecItem>>;
  nextPage: () => void;
}
const NewStepOne = ({
  toolSpecInfo,
  setToolSpecInfo,
  toolTypeList,
  nextPage,
}: NewStepOneProps) => {
  return (
    <div>
      <p>●○○</p>
      <select
        value={toolSpecInfo.ToolType}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setToolSpecInfo({ ...toolSpecInfo, ToolType: e.target.value })
        }
      >
        <option value="" className="text-gray-300" disabled>
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
        className="block pl-2 mx-auto my-2 text-gray-300 rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.ToolSpecID}
        onChange={(e) =>
          setToolSpecInfo({ ...toolSpecInfo, ToolSpecID: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="名稱"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolSpecInfo.Name}
        onChange={(e) =>
          setToolSpecInfo({ ...toolSpecInfo, Name: e.target.value })
        }
      />
      <button
        className="p-2 bg-blue-500 rounded-md min-w-72"
        onClick={() => nextPage()}
      >
        下一步
      </button>
    </div>
  );
};

export default NewStepOne;
