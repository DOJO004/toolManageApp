interface ToolLifeItem {
  ToolSN: string;
  LifeStatus: string;
  LifePercentage: number;
  LifeData: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
}

interface ToolStockListItem {
  ToolSpecID: string;
  ToolType: string;
  SafetyStock: number;
  TotalQty: number;
  WarningCnt: number;
  AlarmCnt: number;
  NeedRepairCnt: number;
  RepairCnt: number;
  ToolLifeList: ToolLifeItem[];
}

interface repairAndScrapProps {
  toolStockList: ToolStockListItem[];
  toolTypeClass: string[];
  fetchRepairTool: (toolSN: string) => void;
  fetchScrapTool: (toolSN: string) => void;
  fetchRestoreTool: (toolSN: string) => void;
  handleShowSelectToolType: (toolType: string) => void;
  handleSelectToolTypeClass: (toolType: string) => void;
  selectToolTypeClass: string;
}

export default function RepairAndScrapIndex({
  toolStockList,
  toolTypeClass,
  fetchRepairTool,
  fetchScrapTool,
  fetchRestoreTool,
  handleShowSelectToolType,
  handleSelectToolTypeClass,
  selectToolTypeClass,
}: repairAndScrapProps) {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md">
      <p className="text-xl font-bold text-center">修整/報廢</p>
      <div className="flex mx-auto my-4 cursor-pointer w-fit">
        <button
          className={`mx-2  ${
            selectToolTypeClass === "ALL" ? "border-b-2" : ""
          }`}
          onClick={() => {
            handleShowSelectToolType("ALL"), handleSelectToolTypeClass("ALL");
          }}
        >
          ALL
        </button>
        {toolTypeClass.map((item, index) => (
          <button
            key={index}
            className={`mx-2  ${
              selectToolTypeClass === item ? "border-b-2" : ""
            }`}
            onClick={() => {
              handleShowSelectToolType(item), handleSelectToolTypeClass(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        {toolStockList.map(
          (tool, index) =>
            tool.ToolLifeList.length > 0 && (
              <div key={index} className="p-2 my-2 border rounded-md">
                <p>ToolSpecID: {tool.ToolSpecID}</p>
                <p>toolType: {tool.ToolType}</p>
                <div className="py-2 my-2 overflow-hidden border rounded-md">
                  <table className="w-full text-center ">
                    <thead>
                      <tr className="bg-indigo-300 ">
                        <th className="text-black">刀具SN</th>
                        <th className="text-black">壽命百分比</th>
                        <th className="text-black">壽命狀態</th>
                        <th className="text-black">送修/重新入庫</th>
                        <th className="text-black">報廢</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tool.ToolLifeList.map((lifeItem, lifeIndex) => (
                        <tr key={lifeIndex} className=" even:bg-gray-700">
                          <td>{lifeItem.ToolSN}</td>
                          <td>{lifeItem.LifePercentage}</td>
                          <td>{lifeItem.LifeStatus}</td>
                          {lifeItem.LifeStatus === "Normal" ? (
                            <td
                              className="cursor-pointer "
                              onClick={() => fetchRepairTool(lifeItem.ToolSN)}
                            >
                              送修
                            </td>
                          ) : (
                            <td
                              className="cursor-pointer "
                              onClick={() => fetchRestoreTool(lifeItem.ToolSN)}
                            >
                              重新入庫
                            </td>
                          )}
                          <td
                            className="cursor-pointer"
                            onClick={() => fetchScrapTool(lifeItem.ToolSN)}
                          >
                            報廢
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
