"use client";
import ToolSpecIndex from "@/app/ui/toolInfo/toolSpec";
import { apiGetToolSpecList } from "@/scripts/api";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [toolSpecList, setToolSpecList] = useState([]);

  const fetchToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolsSpecList);
    } else {
      console.log("get tool spec list false.");
    }
  };

  useEffect(() => {
    fetchToolSpecList();
  }, []);

  return (
    <div>
      <ToolSpecIndex toolSpecList={toolSpecList} />
    </div>
  );
}
