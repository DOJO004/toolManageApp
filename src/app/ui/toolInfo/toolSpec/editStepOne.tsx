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
  editToolSpec: ToolInfoItem;
  setEditToolSpec: React.Dispatch<React.SetStateAction<ToolInfoItem>>;
  toolTypeList: ToolTypeListItem[];
  nextPage: () => void;
}

const EditStepOne = ({
  editToolSpec,
  setEditToolSpec,
  toolTypeList,
  nextPage,
}: EditStepOneProps) => {
  return (
    <div>
      <p>●○○</p>
      <label htmlFor="ToolType">刀具類型</label>
      <select
        id="ToolType"
        value={editToolSpec?.ToolType.split("/")[0]}
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        onChange={(e) =>
          setEditToolSpec({ ...editToolSpec, ToolType: e.target.value })
        }
      >
        <option value="" className="text-black" disabled>
          請選擇刀具類型
        </option>
        {toolTypeList?.map((item, index) => (
          <option
            value={item.ToolTypeID}
            key={item.ToolTypeID}
            className="text-black"
          >
            {item.Name}
          </option>
        ))}
      </select>
      <label htmlFor="ToolSpecID">刀具規格ID</label>
      <input
        id="ToolSpecID"
        type="text"
        placeholder="ID"
        className="block pl-2 mx-auto mb-2 text-gray-300 rounded-md min-h-10 min-w-72"
        value={editToolSpec?.ToolSpecID}
        readOnly
      />
      <label htmlFor="Name">刀具名稱</label>
      <input
        id="Name"
        type="text"
        placeholder="名稱"
        className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        value={editToolSpec?.Name}
        onChange={(e) =>
          setEditToolSpec({ ...editToolSpec, Name: e.target.value })
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

export default EditStepOne;
