import { ToolStatusItem, ToolStockItem } from "./types";

interface Props {
  toolStockList: ToolStockItem[];
  sortToolStockList: (toolList: ToolStatusItem[]) => ToolStatusItem[];
  getToolStatusClass: (status: string) => void;
  translateToolStatus: (status: string) => string;
}

export default function ToolStockIndex({
  toolStockList,
  sortToolStockList,
  getToolStatusClass,
  translateToolStatus,
}: Props) {
  return (
    <>
      {toolStockList?.length > 0
        ? toolStockList.map((item: ToolStockItem, index: number) => (
            <div className="relative mt-8 " key={item.ToolSpecId}>
              <div className="sticky grid items-center grid-cols-12 p-2 bg-gray-900 rounded-md top-2">
                <h3 className="p-1 my-2 font-bold text-left ">
                  {item.ToolSpecName}
                </h3>
                <div className="flex items-center justify-between w-full col-span-11">
                  <div className="flex items-center gap-2">
                    <h4>
                      現有庫存 :
                      <span className="text-green-500">
                        {item.CurrentStock +
                          item.WarningCount +
                          item.AlarmCount}
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
                  <div>
                    <p className="text-gray-400 ">
                      安全庫存 :{item.SafetyStock}
                    </p>
                  </div>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-500">
                    <th className="p-1 ">刀具 SN</th>
                    <th className="p-1 ">狀態</th>
                    <th className="p-1 ">生命指數</th>
                    <th className="p-1 ">最後更新</th>
                    <th className="p-1 ">設備 SN</th>
                    <th className="p-1 ">所在位置</th>
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
                          <td className="p-1"> - </td>
                          <td className="p-1"> - </td>
                          <td className="p-1"> - </td>
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
        : null}
    </>
  );
}
