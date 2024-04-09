"use client";

import MachineSpecIndex from "@/app/ui/machineInfo/machineSpec";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full max-w-screen-2xl md:flex-row">
      <div className="w-full h-full bg-gray-900 rounded-md">
        <MachineSpecIndex />
      </div>
    </div>
  );
}
