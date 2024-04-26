"use client";

import MachineTypeIndex from "@/app/components/machineInfo/machineType";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full md:flex-row">
      <div className="w-full h-full bg-gray-900 rounded-xl">
        <MachineTypeIndex />
      </div>
    </div>
  );
}
