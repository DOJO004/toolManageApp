import { formatTime } from "@/scripts/Apis/toolInfo/functions";
import { ToolSpecItem, editToolSpecItem } from "@/scripts/Apis/toolInfo/types";

interface Props {
  toolSpecList: ToolSpecItem[];
  editToolSpecMode: boolean;
  editToolSpecModeIndex: number;
  editToolSpec: editToolSpecItem;
  handleEditToolSpec: (key: string, value: string) => void;
  patchToolSpec: () => void;
  deleteToolSpec: () => void;
  handleEditToolSpecMode: (item: ToolSpecItem, index: number) => void;
}

export default function ToolSpecIndex({
  toolSpecList,
  editToolSpecMode,
  editToolSpecModeIndex,
  editToolSpec,
  handleEditToolSpec,
  patchToolSpec,
  deleteToolSpec,
  handleEditToolSpecMode,
}: Props) {
  return (
    <table className="w-full ">
      <thead className="bg-indigo-500 border-b-2">
        <tr>
          <td className="p-1 whitespace-nowrap ">刀具類型</td>
          <td className="p-1 whitespace-nowrap ">ID</td>
          <td className="p-1 whitespace-nowrap ">名稱</td>
          <td className="p-1 whitespace-nowrap ">Φ</td>
          <td className="p-1 whitespace-nowrap ">高度</td>
          <td className="p-1 whitespace-nowrap ">總長度</td>
          <td className="p-1 whitespace-nowrap ">手柄Φ</td>
          <td className="p-1 whitespace-nowrap ">安全庫存</td>
          <td className="p-1 whitespace-nowrap ">最大修整次數</td>
          <td className="p-1 whitespace-nowrap ">最大加工次數</td>
          <td className="p-1 whitespace-nowrap ">
            最大加工長度 <span className="text-xs">mm</span>
          </td>
          <td className="p-1 whitespace-nowrap ">
            最大加工時間 <span className="text-xs">sec</span>
          </td>
          <td className="p-1 whitespace-nowrap ">編輯</td>
        </tr>
      </thead>
      <tbody>
        {toolSpecList?.length > 0 ? (
          toolSpecList.map((item, index) => (
            <tr key={item.ToolSpecId} className="text-center hover:bg-gray-700">
              {editToolSpecMode && editToolSpecModeIndex === index ? (
                <>
                  <td className="p-1 ">{item.ToolTypeData.Name}</td>
                  <td className="p-1 ">{item.ToolSpecId}</td>
                  <td className="p-1 ">
                    <input
                      type="text"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.Name}
                      onChange={(e) =>
                        handleEditToolSpec("Name", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.BladeDiameter}
                      onChange={(e) =>
                        handleEditToolSpec("BladeDiameter", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.BladeHeight}
                      onChange={(e) =>
                        handleEditToolSpec("BladeHeight", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.TotalLength}
                      onChange={(e) =>
                        handleEditToolSpec("TotalLength", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.HandleDiameter}
                      onChange={(e) =>
                        handleEditToolSpec("HandleDiameter", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.SafetyStock}
                      onChange={(e) =>
                        handleEditToolSpec("SafetyStock", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.RepairCnt}
                      onChange={(e) =>
                        handleEditToolSpec("RepairCnt", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.ProcessCnt}
                      onChange={(e) =>
                        handleEditToolSpec("ProcessCnt", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="number"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.ProcessLength}
                      onChange={(e) =>
                        handleEditToolSpec("ProcessLength", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 ">
                    <input
                      type="text"
                      className="w-24 text-center text-black rounded-md"
                      value={editToolSpec.ProcessTime}
                      placeholder="hh:mm:ss"
                      onChange={(e) =>
                        handleEditToolSpec("ProcessTime", e.target.value)
                      }
                    />
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    <span
                      className="p-1 bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
                      onClick={() => patchToolSpec()}
                    >
                      完成
                    </span>
                    <span> / </span>
                    <span
                      className="p-1 bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteToolSpec()}
                    >
                      刪除
                    </span>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-1 whitespace-nowrap">
                    {item.ToolTypeData.Name}
                  </td>
                  <td className="p-1 whitespace-nowrap ">{item.ToolSpecId}</td>
                  <td className="p-1 whitespace-nowrap ">{item.Name}</td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SpecData.BladeDiameter}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SpecData.BladeHeight}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SpecData.TotalLength}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.SpecData.HandleDiameter}
                  </td>
                  <td className="p-1 whitespace-nowrap ">{item.SafetyStock}</td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.MaxLife.RepairCnt}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.MaxLife.ProcessCnt}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {item.MaxLife.ProcessLength}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    {formatTime(item.MaxLife.ProcessTime)}
                  </td>
                  <td className="p-1 whitespace-nowrap ">
                    <button
                      className="p-2 rounded-md hover:bg-indigo-600"
                      onClick={() => handleEditToolSpecMode(item, index)}
                    >
                      編輯
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={12}>no data...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
