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
    <div className="w-full p-2 bg-gray-700 rounded-md">
      <h3 className="text-center ">裝載刀具</h3>
      <hr className="w-full my-4" />
      <div className="overflow-auto text-center rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 whitespace-nowrap">Atc No</th>
              <th className="p-1 whitespace-nowrap">刀具序號</th>
            </tr>
          </thead>
          <tbody>
            {selectMachineInfo.AtcLoadingList?.map((item) => (
              <tr key={item.ToolSn}>
                <td>{item.AtcNo}</td>
                <td>{item.ToolSn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
