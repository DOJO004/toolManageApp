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
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A ${selectMachineInfo.ProcessTime}%, #B9E6B5 ${selectMachineInfo.ProcessTime}%, #B9E6B5)`;

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
          <div className="flex items-center gap-2">
            <Image src="/wi-fi.png" alt="wifi img" width={40} height={40} />
            <p>{selectMachineInfo.MachineIP}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2 ">
          <div className="relative w-full">
            <div
              className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full lg:w-40 lg:h-40 md:w-32 md:h-32 left-1/2 top-1/2"
              style={{ background: gradientColorsOutSide }}
            >
              <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full lg:w-32 lg:h-32 md:w-24 md:h-24 left-1/2 top-1/2">
                <p className="absolute -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2">
                  {selectMachineInfo.ProcessTime}%
                </p>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="p-2 my-2 bg-gray-800 rounded-md">
              <div>總稼動時數(當日)</div>
              <hr className="my-1" />
              <div>{selectMachineInfo.ProcessTime}</div>
            </div>
            <div className="p-2 my-2 bg-gray-800 rounded-md">
              <div>刀庫調用資訊</div>
              <hr className="my-1" />
              <div>AtcNo / ToolSN</div>
            </div>
            <div className="w-full p-2 my-2 text-center bg-green-500 rounded-md">
              {selectMachineInfo.Status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
