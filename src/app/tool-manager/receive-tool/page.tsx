"use client";
import BindToolIndex from "@/app/ui/elabelInfo/bindTool/bindToolIndex";
import Notice from "@/app/ui/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const [eLabelSpecInfoList, setELabelSpecInfoList] = useState([]);
  const [toolSNList, setToolSNList] = useState([]);
  const [bindToolInfo, setBindToolInfo] = useState({
    eLabelSN: "",
    LabelCode: "",
    ToolSN: "",
  });
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchBindToolSN = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiBindToolToELabel(bindToolInfo);
    console.log("bind tool to eLabel", res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanInput();
      console.log("bind tool to eLabel success.");
      setIsError(false);
    } else {
      setIsError(true);
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

  const fetchGetELabelSpecInfoList = async () => {
    const res = await apiGetElabelSpecInfoList();
    console.log("spec info", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelSpecInfoList(res.data.Values.eLabelList);
    } else {
      console.log("get elabel spec list false.");
    }
  };

  const cleanInput = () => {
    setBindToolInfo({
      eLabelSN: "",
      LabelCode: "",
      ToolSN: "",
    });
  };

  useEffect(() => {
    fetchGetELabelSpecInfoList();
    fetchGetToolSNList();
  }, []);

  return (
    <div className="w-full">
      <BindToolIndex
        bindToolInfo={bindToolInfo}
        setBindToolInfo={setBindToolInfo}
        eLabelSpecInfoList={eLabelSpecInfoList}
        toolSNList={toolSNList}
        fetchBindToolSN={fetchBindToolSN}
      />
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
    </div>
  );
}
