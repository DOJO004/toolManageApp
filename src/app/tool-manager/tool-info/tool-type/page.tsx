"use client";
import { ToolTypeIndex } from "@/app/ui/toolInfo/toolType";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full bg-gray-900 h-fit md:flex-row">
      <div className="w-full h-screen rounded-md">
        <ToolTypeIndex />
      </div>
    </div>
  );
}
