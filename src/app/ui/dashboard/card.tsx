import Image from "next/image";
import ToolChart from "./toolChart";

export default function DashboardCard() {
  return (
    <div className="w-full max-w-xl p-2 mx-auto mb-2 bg-gray-900 rounded-md">
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
