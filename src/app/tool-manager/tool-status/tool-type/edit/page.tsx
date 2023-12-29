"use client";
import ToolTypeEdit from "@/app/ui/toolStatus/toolType/edit";
import { useState } from "react";

export default function Page() {
  const [toolTypeID, setToolTypeID] = useState("");
  return <ToolTypeEdit />;
}
