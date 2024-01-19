export default function ToolChart() {
  const chartColor =
    "conic-gradient(from 0deg at 50% 50%, #2bfc4e 0deg 50deg, gray 50deg 360deg)";
  return (
    <div className="flex flex-col justify-center md:w-[120px] overflow-hidden">
      <div
        className="flex items-center justify-center w-20 h-20 mx-auto rounded-full md:w-28 md:h-28"
        style={{
          background: chartColor,
        }}
      >
        <div className="w-16 h-16 bg-gray-900 rounded-full md:w-24 md:h-24"></div>
      </div>
      <div className="w-full p-2 mx-auto -translate-y-5 bg-green-500 border-2 border-gray-900 rounded-md">
        <div className="text-center xl:text-xl ">刀庫編號</div>
        <div className="text-center xl:text-xl ">刀具SN</div>
      </div>
    </div>
  );
}
