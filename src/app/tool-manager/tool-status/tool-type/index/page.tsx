"use client";
import ToolTypeIndex from "@/app/ui/toolStatus/toolType";
import { apiGetToolTypeInFoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolTypeList, setToolTypeList] = useState([]);

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    console.log(res);
    if (res.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeList);
    }
  };

  useEffect(() => {
    fetchGetToolTypeList();
  }, []);

  useEffect(() => {
    console.log("6666", toolTypeList);
  }, [toolTypeList]);
  return (
    <div className="flex justify-center ">
      <ToolTypeIndex toolTypeList={toolTypeList} />
    </div>
  );
}
