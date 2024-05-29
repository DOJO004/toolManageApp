import { AtcLoadingItem } from "./types";

interface selectMachineInfoItem {
  AtcLoadingList: AtcLoadingItem[];
}
interface MachineLogInfoProps {
  selectMachineInfo: selectMachineInfoItem;
}
export default function MachineLogInfo({
  selectMachineInfo,
}: MachineLogInfoProps) {
  return (
    <div className="w-full p-2 bg-gray-900 rounded-md">
      <h3 className="text-center ">裝載刀具</h3>
      <hr className="w-full my-4" />
      <div className="overflow-auto text-center rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 whitespace-nowrap">Atc No</th>
              <th className="p-1 whitespace-nowrap">刀具序號</th>
              <th className="p-1 whitespace-nowrap">生命指數</th>
              <th className="p-1 whitespace-nowrap">使用中</th>
            </tr>
          </thead>
          <tbody>
            {selectMachineInfo?.AtcLoadingList?.map((item) => (
              <tr key={item.ToolSn}>
                <td>{item.AtcNo}</td>
                <td>{item.ToolSn}</td>
                <td>{item.ToolLife.LifePercentage}</td>
                <td
                  className={item.IsUsing ? "text-green-500" : "text-gray-400"}
                >
                  {item.IsUsing ? "是" : "否"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
