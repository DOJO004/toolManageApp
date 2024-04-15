"use client";
import { ToolTypeIndex } from "@/app/ui/toolInfo/toolType";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full h-screen p-4 overflow-auto bg-gray-900 rounded-lg md:flex-row">
      <ToolTypeIndex />
    </div>
  );
}
