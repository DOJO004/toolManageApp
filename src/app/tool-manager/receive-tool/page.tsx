"use client";
import ReceiveToolIndex from "@/app/ui/navbar/receiveToolMenu";
import { apiGetELabelBindStatusInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [bindingToolList, setBindingToolList] = useState([]);
  const fetchGetELabeBindStatusInfoList = async () => {
    const res = await apiGetELabelBindStatusInfoList();
    console.log("eLabel bind status", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setBindingToolList(res.data.Values.eLabelBindStatusList);
    } else {
      console.log("get eLabel binding status false.");
    }
  };

  useEffect(() => {
    fetchGetELabeBindStatusInfoList();
  }, []);
  return (
    <div>
      <ReceiveToolIndex bindingToolList={bindingToolList} />
    </div>
  );
}
