import Image from "next/image";
import ToolChart from "./toolChart";

export default function DashboardCard() {
  return (
    <div className="w-full p-2 mx-auto mb-2 bg-gray-900 rounded-md">
      <div className="flex justify-between w-full border-b-2">
        <div>
          <p className="xl:text-xl">生產線</p>
          <p className="text-2xl font-bold md:text-3xl ">設備SN</p>
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
            <p className=" xl:text-xl">運行狀態/%</p>
          </div>
          <p className="text-center xl:text-xl">站號</p>
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-4">
        <ToolChart />
        <ToolChart />
        <ToolChart />
      </div>
    </div>
  );
}
