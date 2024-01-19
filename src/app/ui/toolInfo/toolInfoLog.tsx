interface LoadingLogItem {
  MachineSN: string;
  Action: string;
  AtcNo: number;
  LogTime: string;
}

interface ToolInfoLogProps {
  toolStatusItem: {
    LoadingLogList: LoadingLogItem[];
  };
}
const ToolInfoLog = ({ toolStatusItem }: ToolInfoLogProps) => {
  return (
    <div className="w-full h-full p-2 mb-2 overflow-auto text-xs bg-gray-900 rounded-xl">
      <p className="mb-4 text-2xl font-bold border-b-2 ">刀具裝卸載日誌</p>
      <div className="overflow-auto rounded-md ">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 text-xl whitespace-nowrap">設備序號</th>
              <th className="p-1 text-xl whitespace-nowrap">動作</th>
              <th className="p-1 text-xl whitespace-nowrap">刀庫號</th>
              <th className="p-1 text-xl whitespace-nowrap">動作時間</th>
            </tr>
          </thead>
          <tbody>
            {toolStatusItem.LoadingLogList.length >= 1 ? (
              toolStatusItem.LoadingLogList.map((item, index) => (
                <tr key={index}>
                  <td>{item.MachineSN}</td>
                  <td>{item.Action}</td>
                  <td>{item.AtcNo}</td>
                  <td>{item.LogTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-2 text-xl">
                  no data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolInfoLog;
