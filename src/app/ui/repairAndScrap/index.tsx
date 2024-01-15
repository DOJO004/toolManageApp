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
  classificationToolType: string[];
  fetchRepairTool: (toolSN: string) => void;
  fetchScrapTool: (toolSN: string) => void;
  fetchRestoreTool: (toolSN: string) => void;
}

export default function RepairAndScrapIndex({
  toolStockList,
  classificationToolType,
  fetchRepairTool,
  fetchScrapTool,
  fetchRestoreTool,
}: repairAndScrapProps) {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md">
      <p className="text-xl font-bold text-center">修整/報廢</p>
      <div className="flex mx-auto my-4 cursor-pointer w-fit">
        {classificationToolType.map((item, index) => (
          <div key={index} className="mx-2 hover:border-b-2">
            {item}
          </div>
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
                        <th className="text-black">ToolSN</th>
                        <th className="text-black">LifePercentage</th>
                        <th className="text-black">Repair/Restore</th>
                        <th className="text-black">Scrap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tool.ToolLifeList.map((lifeItem, lifeIndex) => (
                        <tr key={lifeIndex} className=" even:bg-gray-700">
                          <td>{lifeItem.ToolSN}</td>
                          <td>{lifeItem.LifePercentage}</td>
                          {lifeItem.LifeStatus === "Normal" ? (
                            <td
                              className="cursor-pointer "
                              onClick={() => fetchRepairTool(lifeItem.ToolSN)}
                            >
                              Repair
                            </td>
                          ) : (
                            <td
                              className="cursor-pointer "
                              onClick={() => fetchRestoreTool(lifeItem.ToolSN)}
                            >
                              Restore
                            </td>
                          )}
                          <td
                            className="cursor-pointer"
                            onClick={() => fetchScrapTool(lifeItem.ToolSN)}
                          >
                            Scrap
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
