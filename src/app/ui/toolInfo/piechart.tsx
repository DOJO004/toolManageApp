import Image from "next/image";

interface toolInfoDataItem {
  ToolSn: string;
  ToolSpecId: string;
  ToolSpecName: string;
  ToolTypeData: {
    Id: string;
    Name: string;
  };
  LifeStatus: string;
  LifePercentage: number;
  SpecData: {
    BladeDiameter: number;
    BladeHeight: number;
    TotalLength: number;
    HandleDiameter: number;
  };
  LifeData: {
    ProcessCnt: number;
    ProcessTime: number;
    ProcessLength: number;
    RepairCnt: number;
  };
  LoadingData: {
    IsLoading: false;
    MachineId: string;
    AtcNo: number;
  };
  LastModify: string;
}

interface PieChartProps {
  toolInfoData: toolInfoDataItem;
}
const PieChart = ({ toolInfoData }: PieChartProps) => {
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A 30%, #B9E6B5 30%, #B9E6B5)`;
  const gradientColorsInSide = `conic-gradient(#FACC15 0, #FACC15 50%, #F5ECB5 50%, #F5ECB5)`;

  return (
    <div className="flex flex-col w-full p-2 mb-2 bg-gray-700 rounded-xl md:mr-4">
      <div className="flex justify-between mb-4 border-b-2 ">
        <div className="">
          <div className="text-2xl font-bold">{toolInfoData?.ToolSn} </div>
          <div className="mb-4 text-gray-300">{toolInfoData?.ToolSpecName}</div>
        </div>
        <div className="flex items-start">
          <Image
            src={"/hammer.png"}
            alt="hammer"
            width={20}
            height={20}
            className="mx-2"
          />
          <div>2/7</div>
        </div>
      </div>
      <div className="w-full h-full md:flex">
        <div className="relative w-full h-24 md:h-32 lg:h-48">
          <div
            className="w-24 h-24 mx-auto rounded-full md:absolute md:-translate-x-1/2 md:-translate-y-1/2 lg:w-40 lg:h-40 md:w-32 md:h-32 md:left-1/2 md:top-1/2"
            style={{ background: gradientColorsOutSide }}
          >
            <div
              className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full lg:w-32 lg:h-32 md:w-24 md:h-24 left-1/2 top-1/2"
              style={{ background: gradientColorsInSide }}
            >
              <div className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full lg:w-20 lg:h-20 md:w-12 md:h-12 top-1/2 left-1/2"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:mt-4 lg:mt-12 xl:mt-16 md:block">
          <div className="flex items-center mx-2">
            <div className="my-2 border-l-4 border-green-600 md:whitespace-nowrap">
              累積加工長度：
            </div>
            <div>{toolInfoData?.LifeData?.ProcessLength}</div>
          </div>
          <div className="flex items-center mx-2">
            <div className="my-2 border-l-4 border-yellow-600 md:whitespace-nowrap">
              累積加工時間：
            </div>
            <div>{toolInfoData?.LifeData?.ProcessTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
