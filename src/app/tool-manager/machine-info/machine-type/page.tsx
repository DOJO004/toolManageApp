"use client";
import MachineTypeIndex from "@/app/ui/machineInfo/machineType";
import { apiGetMachineTypeInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [machineTypeList, setMachineTypeList] = useState([]);
  const fetchGetMachineTypeList = async () => {
    const res = await apiGetMachineTypeInfoList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    } else {
      console.log("get machine type list false.");
    }
  };
  useEffect(() => {
    fetchGetMachineTypeList();
  }, []);
  return (
    <div>
      <MachineTypeIndex machineTypeList={machineTypeList} />
    </div>
  );
}
