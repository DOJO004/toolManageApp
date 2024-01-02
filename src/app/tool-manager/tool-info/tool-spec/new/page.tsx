"use client";
import ToolSpecNew from "@/app/ui/toolInfo/toolSpec/new";
import { apiAddToolSpecInfo, apiGetToolTypeInFoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolSpecInfo, setToolSpecInfo] = useState({
    ToolSpecID: "",
    Name: "",
    ToolType: "",
    Specification: {
      BladeDiameter: "0",
      BladeHeight: "0",
      TotalLength: "0",
      HandleDiameter: "0",
    },
    SafetyStock: "0",
    MaxLife: {
      ProcessCnt: "0",
      ProcessTime: "0",
      ProcessLength: "0",
      RepairCnt: "0",
    },
  });

  const fetchToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeList);
    } else {
      console.log("get tool type list false.");
    }
  };

  const fetchNewToolSpecInfo = async () => {
    const res = await apiAddToolSpecInfo(toolSpecInfo);
    if (res?.data?.Values?.ReqInt === 0) {
    } else {
      console.log(" add tool spec info false.");
    }
  };

  useEffect(() => {
    fetchToolTypeList();
  }, []);

  return (
    <div>
      <ToolSpecNew
        toolTypeList={toolTypeList}
        toolSpecInfo={toolSpecInfo}
        setToolSpecInfo={setToolSpecInfo}
        fetchNewToolSpecInfo={fetchNewToolSpecInfo}
      />
    </div>
  );
}
