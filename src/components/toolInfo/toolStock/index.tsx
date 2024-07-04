import {
  toolLifeStatusTextColor,
  translateLifeStatus,
} from "@/scripts/Apis/toolInfo/functions";
import {
  StockToolCountItem,
  ToolStatusItem,
} from "@/scripts/Apis/toolInfo/types";

interface Props {
  toolStockList: StockToolCountItem[];
  sortToolStockList: (toolList: ToolStatusItem[]) => ToolStatusItem[];
  getToolStatusClass: (status: string) => void;
  toolPositionInfo: (status: number) => string;
}

export default function ToolStockIndex({
  toolStockList,
  sortToolStockList,
  getToolStatusClass,
  toolPositionInfo,
}: Props) {
  return (
    <div className="overflow-auto h-svh">
      {toolStockList.length > 0 ? (
        toolStockList.map((item) => (
          <div key={item.ToolSpecId} className="p-4 bg-gray-900 rounded-md">
            <div className="sticky top-0 bg-gray-900 rounded-md ">
              <div className="flex items-center justify-between">
                <h3 className="p-1 my-2 font-bold text-left">
                  {item.ToolSpecName}
                </h3>
                <div className="flex items-center gap-2">
                  <p>
                    現有庫存：
                    <span className="text-green-500">{item.CurrentStock}</span>
                  </p>
                  <p>
                    警告：
                    <span className="text-yellow-300">{item.WarningCount}</span>
                  </p>
                  <p>
                    警報：
                    <span className="text-red-500">{item.AlarmCount}</span>
                  </p>
                </div>
              </div>
              <p className="text-right text-gray-400">
                安全庫存 :{item.SafetyStock}
              </p>
              <div className="grid items-center grid-cols-6 bg-indigo-500 rounded-md">
                <p className="p-1 font-bold">刀具 SN</p>
                <p className="p-1 font-bold">狀態</p>
                <p className="p-1 font-bold">生命指數</p>
                <p className="p-1 font-bold">最後更新</p>
                <p className="p-1 font-bold">設備 SN / 所在位置</p>
                <p className="p-1 font-bold">領用人 / 歸還人</p>
              </div>
            </div>
            <div>
              {item.ToolStatusList.length > 0 ? (
                sortToolStockList(item.ToolStatusList).map((toolStatus) => (
                  <div
                    key={toolStatus.ToolSn}
                    className="grid items-center grid-cols-6 even:bg-gray-700"
                  >
                    <p className="p-1">{toolStatus.ToolSn}</p>
                    <p
                      className={`p-1 ${toolLifeStatusTextColor(toolStatus.LifeStatus)}`}
                    >
                      {translateLifeStatus(toolStatus.LifeStatus)}
                    </p>
                    <p className="p-1">{toolStatus.LifePercentage}</p>
                    <p className="p-1">{toolStatus.LastModify}</p>
                    <p className="p-1">
                      {toolPositionInfo(toolStatus.PositionInfo.PositionStatus)}
                      {toolStatus.PositionInfo.MachineSn &&
                        ` / ${toolStatus.PositionInfo.MachineSn}`}
                      {toolStatus.PositionInfo.StorageId !== -1 &&
                        ` ${toolStatus.PositionInfo.StorageName}`}
                    </p>
                    <p className="p-1">{toolStatus.LastOperator.UserName}</p>
                  </div>
                ))
              ) : (
                <p className="p-1 text-center">暫無數據</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="my-4 text-center">no data...</p>
      )}
    </div>
  );
}
