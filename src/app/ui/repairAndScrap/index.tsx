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
    <div>
      <p className="text-center ">修整/報廢</p>
      <div className="flex mx-auto my-4 cursor-pointer w-fit lg:text-xl">
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
      <div className="border-t-2 ">
        {toolStockList.map(
          (tool, index) =>
            tool.ToolLifeList.length > 0 && (
              <div key={index} className="p-2 my-2 border-b-2 rounded-md">
                <div>
                  ToolSpecID:
                  <span className="text-xl font-bold ">{tool.ToolSpecID}</span>
                </div>
                <div>
                  toolType:{" "}
                  <span className="text-xl font-bold ">{tool.ToolType}</span>
                </div>
                <div className="my-2 overflow-auto rounded-t-md">
                  <table className="w-full text-center shadow-md ">
                    <thead>
                      <tr className="bg-indigo-300 ">
                        <th className="p-1 text-black whitespace-nowrap">
                          刀具SN
                        </th>
                        <th className="p-1 text-black whitespace-nowrap">
                          壽命百分比
                        </th>
                        <th className="p-1 text-black whitespace-nowrap">
                          壽命狀態
                        </th>
                        <th className="p-1 text-black whitespace-nowrap">
                          送修/重新入庫
                        </th>
                        <th className="p-1 text-black whitespace-nowrap">
                          報廢
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tool.ToolLifeList.map((lifeItem, lifeIndex) => (
                        <tr key={lifeIndex} className=" even:bg-gray-600">
                          <td className="p-1 whitespace-nowrap">
                            {lifeItem.ToolSN}
                          </td>
                          <td className="p-1 whitespace-nowrap">
                            {lifeItem.LifePercentage}
                          </td>
                          <td className="p-1 whitespace-nowrap">
                            {lifeItem.LifeStatus}
                          </td>
                          {lifeItem.LifeStatus === "Normal" ? (
                            <td
                              className="p-1 cursor-pointer whitespace-nowrap"
                              onClick={() => fetchRepairTool(lifeItem.ToolSN)}
                            >
                              送修
                            </td>
                          ) : (
                            <td
                              className="p-1 cursor-pointer whitespace-nowrap"
                              onClick={() => fetchRestoreTool(lifeItem.ToolSN)}
                            >
                              重新入庫
                            </td>
                          )}
                          <td
                            className="p-1 cursor-pointer whitespace-nowrap"
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