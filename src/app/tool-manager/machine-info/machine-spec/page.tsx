"use client";

import MachineSpecIndex from "@/app/components/machineInfo/machineSpec";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full md:flex-row">
      <div className="w-full  bg-gray-900 rounded-xl">
        <MachineSpecIndex />
      </div>
    </div>
  );
}
