"use client";

import ELabelInfoIndex from "@/app/components/elabelInfo";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full md:flex-row">
      <div className="w-full h-full bg-gray-900 rounded-xl ">
        <ELabelInfoIndex />
      </div>
    </div>
  );
}
