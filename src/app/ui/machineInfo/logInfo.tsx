interface LoadingLogItem {
  TooSN: string;
  Action: string;
  AtcNo: number;
  LogTime: string;
}

interface MahcineinfoItem {
  LoadingLogList: LoadingLogItem[];
}

interface MachineLogInfoProps {
  machineInfoItem: MahcineinfoItem;
}
export default function MachineLogInfo({
  machineInfoItem,
}: MachineLogInfoProps) {
  return (
    <div className="w-full p-2 my-2 ml-2 bg-gray-900 rounded-md">
      <p className="text-xl">刀具裝卸載日誌</p>
      <hr className="w-full my-4" />
      <div className="overflow-auto rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 text-black whitespace-nowrap">刀具序號</th>
              <th className="p-1 text-black whitespace-nowrap">動作</th>
              <th className="p-1 text-black whitespace-nowrap">刀庫號</th>
              <th className="p-1 text-black whitespace-nowrap">動作時間</th>
            </tr>
          </thead>
          <tbody>
            {machineInfoItem.LoadingLogList.length >= 1 ? (
              machineInfoItem.LoadingLogList.map((item, index) => (
                <tr className=" even:bg-gray-700" key={index}>
                  <td className="p-1 whitespace-nowrap">{item.TooSN}</td>
                  <td className="p-1 whitespace-nowrap">{item.Action}</td>
                  <td className="p-1 whitespace-nowrap">{item.AtcNo}</td>
                  <td className="p-1 whitespace-nowrap">{item.LogTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-xl text-center">
                  no data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
