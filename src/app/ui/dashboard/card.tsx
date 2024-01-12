import Image from "next/image";
import ToolChart from "./toolChart";

export default function DashboardCard() {
  return (
    <div className="p-2 bg-gray-900 rounded-md mx-auto max-w-[600px] md:h-[355px] mb-2">
      <div className="flex justify-between border-b-2">
        <div>
          <p className="">生產線</p>
          <p className="text-2xl font-bold md:text-4xl ">設備SN</p>
          <p className="text-sm text-gray-400 ">設備名稱</p>
        </div>
        <div>
          <div>
            <Image
              src="/wi-fi.png"
              alt="wi-fi"
              width={30}
              height={30}
              className="mx-auto scale-75"
            />
            <p>運行狀態/%</p>
          </div>
          <p className="text-center">站號</p>
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-10">
        <ToolChart />
        <ToolChart />
        <ToolChart />
      </div>
    </div>
  );
}
