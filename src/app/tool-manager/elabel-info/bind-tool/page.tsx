"use client";
import BindToolIndex from "@/app/ui/elabelInfo/bindTool/bindToolIndex";
import {
  apiBindToolToELabel,
  apiGetElabelSpecInfoList,
  apiGetToolStockStatusInfoList,
} from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [eLabelSpecInfoList, setELabelSpecInfoList] = useState([]);
  const [toolSNList, setToolSNList] = useState([]);
  const [bindToolInfo, setBindToolInfo] = useState({});

  const fetchBindToolSN = async () => {
    const res = await apiBindToolToELabel(bindToolInfo);
    console.log("bind tool to eLabel", res);
    if (res?.data?.Values?.ReqInt === 0) {
      console.log("bind tool to eLabel success.");
    } else {
      console.log("bind tool to eLabel false.");
    }
  };

  const fetchGetToolSNList = async () => {
    const res = await apiGetToolStockStatusInfoList(999);
    console.log("toolSN list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSNList(res.data.Values.ToolStockList);
    } else {
      console.log("get tool spec list false.");
    }
  };

  const fetchGetElabelSpecInfoList = async () => {
    const res = await apiGetElabelSpecInfoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setELabelSpecInfoList(res.data.Values.eLabelList);
    } else {
      console.log("get elabel spec list false.");
    }
  };

  useEffect(() => {
    fetchGetElabelSpecInfoList();
    fetchGetToolSNList();
  }, []);
  return (
    <div>
      <BindToolIndex
        eLabelSpecInfoList={eLabelSpecInfoList}
        toolSNList={toolSNList}
      />
    </div>
  );
}
