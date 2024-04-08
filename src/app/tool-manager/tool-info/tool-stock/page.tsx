"use client";

import ToolStockIndex from "@/app/ui/toolInfo/toolStock";
export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full max-w-screen-2xl md:flex-row">
      <div className="w-full bg-gray-900 rounded-md h-fit">
        <ToolStockIndex />
      </div>
    </div>
  );
}
