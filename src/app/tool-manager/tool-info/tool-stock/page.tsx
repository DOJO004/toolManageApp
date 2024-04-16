"use client";

import ToolStockIndex from "@/app/ui/toolInfo/toolStock";
export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen overflow-auto bg-gray-900 md:flex-row">
      <ToolStockIndex />
    </div>
  );
}
