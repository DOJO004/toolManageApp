interface AtcLoadingItem {
  AtcNo: number;
  ToolSN: string;
}

interface MachineInfoItem {
  AtcLoadingList: AtcLoadingItem[];
  LoadingLogList: [];
  MachineID: string;
  MachineSN: string;
  MachineName: string;
  ProductLine: string;
  MachineType: string;
  MachineIP: string;
  SystemInfo: {
    Brand: number;
    Series: string;
    MT: string;
  };
  MachineStatus: string;
  Activation: number;
  Current: {
    CurrentGcd: number;
    TotalFeedRate: number;
    SpindleRPM: number;
    SpindleLoading: number;
    SpindleSpeed: number;
    CurrentProgram: string;
  };
  LastModify: string;
}

interface MachineInfoIndexProps {
  machineInfoList: MachineInfoItem[];
  handleSelectMachineInfoItem: (item: object) => void;
}
const MachineInfoIndex = ({
  machineInfoList,
  handleSelectMachineInfoItem,
}: MachineInfoIndexProps) => {
  return (
    <div className="p-2 bg-gray-900 rounded-md">
      <p className="text-xl text-center ">設備資訊</p>
      <div className="overflow-hidden rounded-t-md">
        <table>
          <thead className="bg-indigo-500 ">
            <tr>
              <th className="p-1 text-black">設備序號</th>
              <th className="p-1 text-black">產線別</th>
              <th className="p-1 text-black">運行狀態</th>
              <th className="p-1 text-black">刀庫資訊</th>
              <th className="p-1 text-black">轉速/進給倍率</th>
              <th className="p-1 text-black">更新時間</th>
            </tr>
          </thead>

          <tbody>
            {machineInfoList.map((item, index) => (
              <tr
                key={index}
                className="text-center cursor-pointer even:bg-gray-600"
                onClick={() => handleSelectMachineInfoItem(item)}
              >
                <td className="p-1">{item.MachineSN}</td>
                <td className="p-1">{item.ProductLine.split(":")[1]}</td>
                <td className="p-1">{item.MachineStatus}</td>
                <td className="p-1">
                  {item.AtcLoadingList.map((item, index) => (
                    <div key={index}>{item.ToolSN}</div>
                  ))}
                </td>
                <td className="p-1">
                  {item.Current.SpindleSpeed}/{item.Current.TotalFeedRate}
                </td>
                <td className="p-1">{item.LastModify}</td>
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineInfoIndex;
