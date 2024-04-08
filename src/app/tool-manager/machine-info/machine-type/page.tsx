"use client";

import MachineTypeIndex from "@/app/ui/machineInfo/machineType";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full max-w-screen-2xl md:flex-row">
      <div className="w-full bg-gray-900 rounded-md h-fit">
        <MachineTypeIndex />
      </div>
    </div>
  );
}
