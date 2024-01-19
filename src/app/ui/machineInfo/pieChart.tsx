import Image from "next/image";
interface MachineInfoPieChartProps {
  machineInfoItem: {
    ProductLine: string;
    MachineSN: string;
    MachineName: string;
    MachineStatus: string;
    MachineIP: string;
    TotalFeedRate: string;
    AtcNo: string;
    ToolSN: string;
  };
}
export default function MachineInfoPieChart({
  machineInfoItem,
}: MachineInfoPieChartProps) {
  return (
    <div className="w-full p-2 my-2 mr-2 bg-gray-900 rounded-md">
      <div>
        <div className="flex justify-between border-b-2">
          <div>
            <div>{machineInfoItem.ProductLine.split(":")[1]}</div>
            <div>{machineInfoItem.MachineSN}</div>
            <div>{machineInfoItem.MachineName}</div>
          </div>
          <div className="flex">
            <div>wifi</div>
            <div>{machineInfoItem.MachineIP}</div>
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
              <div>
                {machineInfoItem.AtcNo}/{machineInfoItem.ToolSN}
              </div>
            </div>
            <div className="p-2 bg-green-500 rounded-md w-fit">
              {machineInfoItem.MachineStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
