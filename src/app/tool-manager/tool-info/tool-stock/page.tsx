import ToolStockIndex from "@/app/components/toolInfo/toolStock";
export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full  overflow-auto bg-gray-800 rounded-lg md:flex-row">
      <ToolStockIndex />
    </div>
  );
}
