import Image from "next/image";

interface selectMachineInfoItem {
  MachineId: string;
  ProductLineData: {
    Id: string;
    Name: string;
  };
  MacTypeData: {
    Id: string;
    Name: string;
  };
  SerialNumber: string;
  MachineIP: string;
  SystemData: {
    Brand: string;
    Series: string;
    MT: string;
  };
  Status: string;
  Activation: number;
  CurrentParameter: {
    CurrentGcd: number;
    TotalFeedRate: number;
    SpindleRPM: number;
    SpindleLoading: number;
    SpindleSpeed: number;
    CurrentProgram: string;
  };
  AtcLoadingList: [
    {
      AtcNo: number;
      ToolSn: string;
    },
    {
      AtcNo: number;
      ToolSn: string;
    },
  ];
  LoadingLogList: [];
  LastModify: string;
}
interface MachineInfoPieChartProps {
  selectMachineInfo: selectMachineInfoItem;
}
export default function MachineInfoPieChart({
  selectMachineInfo,
}: MachineInfoPieChartProps) {
  return (
    <div className="w-full p-2 bg-gray-700 rounded-md">
      <div>
        <div className="flex justify-between border-b-2">
          <div>
            <p className="text-gray-300">
              {selectMachineInfo.ProductLineData.Name}
            </p>
            <h3>{selectMachineInfo.SerialNumber}</h3>
            <p className="text-gray-300">
              {selectMachineInfo.MacTypeData.Name}
            </p>
          </div>
          <div>
            <p>wifi</p>
            <p>{selectMachineInfo.MachineIP}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="my-4">
            <div className="relative w-24 h-24 bg-green-500 rounded-full">
              <div className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full top-1/2 left-1/2"></div>
              <div className="absolute w-16 h-16 text-center -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full top-24 left-1/2">
                <Image
                  src="/settings.png"
                  alt="setting img"
                  width={40}
                  height={40}
                  className="absolute -translate-x-1/2 -translate-y-1/2 -top-1/4 left-1/2"
                />
                <p className="relative -translate-y-1/2 top-1/4 ">%</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>process time</div>
              <div>precess time value</div>
            </div>
            <div>
              <div>tool change info</div>
              <div>AtcNo / ToolSN</div>
            </div>
            <div className="p-2 bg-green-500 rounded-md w-fit">
              {selectMachineInfo.Status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
