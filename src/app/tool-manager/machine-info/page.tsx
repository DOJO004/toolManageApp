"use client";
import MachineInfoIndex from "@/app/ui/machineInfo";
import MachineLogInfo from "@/app/ui/machineInfo/logInfo";
import MachineInfoPieChart from "@/app/ui/machineInfo/pieChart";
import {
  MachineInfoPieChartSkeletons,
  MachineInfoTableSkeletons,
  MachineLogInfoSkeletons,
} from "@/app/ui/skeletons";
import { apiGetMachineStatusInfoList } from "@/scripts/api";
import { Suspense, useEffect, useState } from "react";

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
    LoadingLogList: [],
  });

  const fetchGetMachineInfoList = async () => {
    const res = await apiGetMachineStatusInfoList();
    console.log("machine info list", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineInfoList(res.data.Values.MachineStatusList);
      handleSelectMachineInfoItem(res.data.Values.MachineStatusList[0]);
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
      LoadingLogList: item.LoadingLogList,
    });
  };

  useEffect(() => {
    fetchGetMachineInfoList();
  }, []);
  return (
    <div className="w-full max-w-7xl">
      <div className="md:flex">
        <Suspense fallback={<MachineInfoPieChartSkeletons />}>
          <MachineInfoPieChart machineInfoItem={machineInfoItem} />
        </Suspense>
        <Suspense fallback={<MachineLogInfoSkeletons />}>
          <MachineLogInfo machineInfoItem={machineInfoItem} />
        </Suspense>
      </div>
      <Suspense fallback={<MachineInfoTableSkeletons />}>
        <MachineInfoIndex
          machineInfoList={machineInfoList}
          handleSelectMachineInfoItem={handleSelectMachineInfoItem}
        />
      </Suspense>
    </div>
  );
}
