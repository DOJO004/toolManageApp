import {
  StockToolCountItem,
  ToolStatusItem,
} from "@/scripts/Apis/toolInfo/types";

interface Props {
  toolStockList: StockToolCountItem[];
  sortToolStockList: (toolList: ToolStatusItem[]) => ToolStatusItem[];
  getToolStatusClass: (status: string) => void;
  translateToolStatus: (status: string) => string;
  toolPositionInfo: (status: number) => string;
}

export default function ToolStockIndex({
  toolStockList,
  sortToolStockList,
  getToolStatusClass,
  translateToolStatus,
  toolPositionInfo,
}: Props) {
  return (
    <>
      {toolStockList?.length > 0 ? (
        toolStockList.map((item: StockToolCountItem, index: number) => (
          <div className="relative h-full mt-8 " key={item.ToolSpecId}>
            <div className="sticky top-0 w-full px-4 bg-gray-900 rounded-md">
              <div className="flex justify-between ">
                <h3 className="p-1 my-2 font-bold text-left ">
                  {item.ToolSpecName}
                </h3>
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <h4>
                      現有庫存 :
                      <span className="text-green-500">
                        {item.CurrentStock}
                      </span>
                    </h4>
                    <p>
                      危險 :
                      <span className="text-amber-500">
                        {item.WarningCount}
                      </span>
                    </p>
                    <p>
                      警告 :
                      <span className="text-red-500">{item.AlarmCount}</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-right text-gray-400 ">
                安全庫存 :{item.SafetyStock}
              </p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-500">
                  <th className="p-1 ">刀具 SN</th>
                  <th className="p-1 ">狀態</th>
                  <th className="p-1 ">生命指數</th>
                  <th className="p-1 ">最後更新</th>
                  <th className="p-1 ">設備 SN / 所在位置</th>
                  <th className="p-1 ">領用人 / 歸還人</th>
                </tr>
              </thead>
              <tbody>
                {item.ToolStatusList.length > 0 ? (
                  sortToolStockList(item.ToolStatusList).map(
                    (item: ToolStatusItem) => (
                      <tr key={item.ToolSn} className="even:bg-gray-700">
                        <td className="p-1 ">{item.ToolSn}</td>
                        <td
                          className={`p-1 ${getToolStatusClass(item.LifeStatus)}`}
                        >
                          {translateToolStatus(item.LifeStatus)}
                        </td>
                        <td className="p-1">{item.LifePercentage}</td>
                        <td className="p-1">{item.LastModify}</td>
                        <td className="p-1">
                          {toolPositionInfo(item.PositionInfo.PositionStatus)}
                          <span> / </span>
                          {item.PositionInfo.MachineSn}
                          {item.PositionInfo.StorageId === -1
                            ? ""
                            : item.PositionInfo.StorageName}
                        </td>
                        <td className="p-1">{item.LastOperator.UserName}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={7} className="p-1 text-center">
                      暫無數據
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p className="my-4 text-center">no data...</p>
      )}
    </>
  );
}
