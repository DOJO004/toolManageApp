"use client";
import { ToolTypeIndex } from "@/components/toolInfo/toolType";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center w-full h-full p-4 overflow-auto bg-gray-700 rounded-lg md:flex-row">
      <ToolTypeIndex />
    </div>
  );
}
