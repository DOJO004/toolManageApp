"use client";
import MachineInfoIndex from "@/app/ui/machineInfo";
import {
  apiGetMachineStatusInfoList,
  apiGetProductLineInfoList,
} from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [productLine, setProductLine] = useState([
    { ProductLineID: "", ProductLineName: "" },
  ]);
  const fetchGetMachineInfoList = async () => {
    const res = await apiGetMachineStatusInfoList(productLine[0].ProductLineID);
    console.log(res);
  };

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineInfoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLine(res.data.Values.ProductLineList);
    }
    console.log("product", res);
  };

  useEffect(() => {
    fetchGetMachineInfoList();
    fetchGetProductLineList();
  }, []);
  return (
    <div>
      <MachineInfoIndex />
    </div>
  );
}
