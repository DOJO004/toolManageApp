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
      <div>
        <label htmlFor="tool-type">刀具類型</label>
        <select
          id="tool-type"
          value={toolSpecInfo?.ToolType}
          className="block w-full h-10 pl-2 mx-auto my-2 text-black rounded-md"
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
      </div>
      <div>
        <label htmlFor="tool-spec-id">刀具規格ID</label>
        <input
          id="tool-spec-id"
          type="text"
          placeholder="ID"
          className="block w-full h-10 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.ToolSpecID}
          onChange={(e) =>
            setToolSpecInfo({ ...toolSpecInfo, ToolSpecID: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="tool-spec-name">刀具規格名稱</label>
        <input
          id="tool-spec-name"
          type="text"
          placeholder="名稱"
          className="block w-full h-10 pl-2 mx-auto my-2 text-black rounded-md"
          value={toolSpecInfo?.Name}
          onChange={(e) =>
            setToolSpecInfo({ ...toolSpecInfo, Name: e.target.value })
          }
        />
      </div>
      <button
        className="w-full p-2 mt-6 bg-blue-500 rounded-md"
        onClick={() => nextPage()}
      >
        下一步
      </button>
    </div>
  );
};

export default NewStepOne;
