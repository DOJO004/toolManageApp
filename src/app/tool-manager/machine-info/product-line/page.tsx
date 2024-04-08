"use client";

import ProductLineIndex from "@/app/ui/machineInfo/productLine";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full max-w-screen-2xl md:flex-row">
      <div className="w-full h-full bg-gray-900 rounded-md">
        <ProductLineIndex />
      </div>
    </div>
  );
}
