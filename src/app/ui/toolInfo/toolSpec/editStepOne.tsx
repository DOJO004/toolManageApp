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

interface ToolTypeListItem {
  ToolTypeID: string;
  Name: string;
}

interface EditStepOneProps {
  toolInfo: ToolInfoItem;
  setToolInfo: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  toolTypeList: ToolTypeListItem[];
  nextPage: () => void;
}

const EditStepOne = ({
  toolInfo,
  setToolInfo,
  toolTypeList,
  nextPage,
}: EditStepOneProps) => {
  return (
    <div>
      <p>●○○</p>
      <select
        value={toolInfo.ToolType.split("/")[0]}
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) => setToolInfo({ ...toolInfo, ToolType: e.target.value })}
      >
        <option value="" className="text-black" disabled>
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
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.ToolSpecID}
        readOnly
      />
      <input
        type="text"
        placeholder="名稱"
        className="block pl-2 mx-auto my-2 text-black rounded-md min-h-10 min-w-72"
        value={toolInfo.Name}
        onChange={(e) => setToolInfo({ ...toolInfo, Name: e.target.value })}
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

export default EditStepOne;
