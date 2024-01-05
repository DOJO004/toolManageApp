"use client";
import MachineSpecIndex from "@/app/ui/machineInfo/machineSpec";
import { apiGetMachineInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [machineSpecList, setMachineSpecList] = useState([]);

  const fetchGetMachineSpecList = async () => {
    const res = await apiGetMachineInfoList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setMachineSpecList(res.data.Values.MachineSpecList);
    } else {
      console.log("get machine spec list false.");
    }
  };

  useEffect(() => {
    fetchGetMachineSpecList();
  }, []);

  return (
    <div>
      <MachineSpecIndex machineSpecList={machineSpecList} />
    </div>
  );
}
