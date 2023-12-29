const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export default function PieChartSkeletons() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-900 p-2 shadow-sm flex`}
    >
      <div className="">
        <div className="w-16 h-5 my-2 bg-gray-800 rounded-xl" />
        <div className="w-16 h-6 my-2 text-sm font-medium bg-gray-800 rounded-xl" />
        <div className="w-24 h-6 my-2 text-sm font-medium bg-gray-800 rounded-xl" />
        <div className="w-24 h-6 my-2 text-sm font-medium bg-gray-800 rounded-xl" />
      </div>
      <div className="w-[100px] h-[100px] truncate bg-gray-800 rounded-full"></div>
    </div>
  );
}
