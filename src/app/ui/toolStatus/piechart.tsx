const PieChart = () => {
  const gradientColorsOutSide = `conic-gradient(#16A34A 0, #16A34A 30%, #B9E6B5 30%, #B9E6B5)`;
  const gradientColorsInSide = `conic-gradient(#FACC15 0, #FACC15 50%, #F5ECB5 50%, #F5ECB5)`;

  return (
    <div className="flex">
      <div className="text-sm">
        <p className="text-xl">tittle</p>
        <p>tool name</p>
        <p className="text-xs">累積加工時間</p>
        <p className="text-xs">累積加工長度</p>
      </div>
      <div>
        <div
          className=" rounded-full w-[100px] h-[100px] relative"
          style={{ background: gradientColorsOutSide }}
        >
          <div
            className=" rounded-full w-[50px] h-[50px] absolute top-6 left-6"
            style={{ background: gradientColorsInSide }}
          >
            <div className="bg-gray-900 rounded-full w-[25px] h-[25px] absolute top-3 left-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
