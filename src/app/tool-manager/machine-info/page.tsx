"use client";
import MachineInfoIndex from "@/app/ui/machineInfo";
import MachineLogInfo from "@/app/ui/machineInfo/logInfo";
import MachineInfoPieChart from "@/app/ui/machineInfo/pieChart";
import {
  apiGetMachineStatusInfoList,
  apiGetProductLineInfoList,
} from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [machineInfoList, setMachineInfoList] = useState([]);
  const [machineInfoItem, setMachineInfoItem] = useState({
    ProductLine: "",
    MachineSN: "",
    MachineName: "",
    MachineStatus: "",
    MachineIP: "",
    TotalFeedRate: "",
    AtcNo: "",
    ToolSN: "",
  });

  const fetchGetMachineInfoList = async () => {
    const res = await apiGetMachineStatusInfoList();
    console.log("machine info list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
    } else {
      console.log("get machine info list false.");
    }
  };

  const handleSelectMachineInfoItem = (item) => {
    setMachineInfoItem({
      ...machineInfoItem,
      ProductLine: item.ProductLine,
      MachineSN: item.MachineSN,
      MachineName: item.MachineName,
      MachineStatus: item.MachineStatus,
      MachineIP: item.MachineIP,
      TotalFeedRate: item.TotalFeedRate,
      AtcNo: item.AtcLoadingList[0]?.AtcNo,
      ToolSN: item.AtcLoadingList[0]?.ToolSN,
    });
  };

  useEffect(() => {
    fetchGetMachineInfoList();
  }, []);
  return (
    <div>
      <div className="flex">
        <MachineInfoPieChart machineInfoItem={machineInfoItem} />
        <MachineLogInfo />
      </div>
      <MachineInfoIndex
        machineInfoList={machineInfoList}
        handleSelectMachineInfoItem={handleSelectMachineInfoItem}
      />
    </div>
  );
}
