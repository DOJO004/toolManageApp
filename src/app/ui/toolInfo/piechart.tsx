import Image from "next/image";
const PieChart = () => {
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A 30%, #B9E6B5 30%, #B9E6B5)`;
  const gradientColorsInSide = `conic-gradient(#FACC15 0, #FACC15 50%, #F5ECB5 50%, #F5ECB5)`;

  return (
    <div className="flex flex-col w-full p-2 bg-gray-900 rounded-xl min-w-[345px] mb-2 md:mr-4">
      <div className="relative flex items-center justify-between mb-4 border-b-2">
        <div>
          <p className="text-4xl font-bold">DR-D1700002</p>
          <p className="mb-4 text-gray-300">銑刀_p02312313</p>
        </div>
        <div className="absolute flex top-1 right-2">
          <Image
            src={"/hammer.png"}
            alt="hammer"
            width={20}
            height={20}
            className="mx-2"
          />
          <p>2/7</p>
        </div>
      </div>
      <div className="flex">
        <div
          className=" rounded-full w-[100px] h-[100px] relative ml-4"
          style={{ background: gradientColorsOutSide }}
        >
          <div
            className=" rounded-full w-[50px] h-[50px] absolute top-6 left-6"
            style={{ background: gradientColorsInSide }}
          >
            <div className="bg-gray-900 rounded-full w-[25px] h-[25px] absolute top-3 left-3"></div>
          </div>
        </div>
        <div className="mt-8 ml-28">
          <p className="my-2 border-l-4 border-green-600">累積加工長度</p>
          <p className="my-2 border-l-4 border-yellow-600">累積加工時間</p>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
