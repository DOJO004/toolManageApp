"use client";
import ToolTypeIndex from "@/app/ui/toolInfo/toolType";
import { apiGetToolTypeInFoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolTypeList, setToolTypeList] = useState([]);

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    if (res.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeList);
    }
  };

  const getEditItem = () => {};

  useEffect(() => {
    fetchGetToolTypeList();
  }, []);

  useEffect(() => {}, [toolTypeList]);
  return (
    <div className="flex justify-center ">
      <ToolTypeIndex toolTypeList={toolTypeList} />
    </div>
  );
}
