"use client";
import MachineSpecEdit from "@/app/ui/machineInfo/machineSpec/edit";
import { apiEditMachineInfo, apiGetMachineInfoByID } from "@/scripts/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const machineID = useParams().id;
  const [machineSpec, setMachineSpec] = useState({
    MachineID: "",
    ProductLineID: "",
    MachineTypeID: "",
    MachineSN: "",
    MachineName: "",
    MachineIP: "",
    ReaderID: "",
    SystemInfo: {
      Brand: "",
      Series: "",
      MT: "",
    },
    AxisInfos: [
      {
        AxisIndex: "",
        AxisName: "",
        IsSpindle: false,
      },
    ],
  });

  const fetchGetMachineSpec = async () => {
    const res = await apiGetMachineInfoByID(machineID);
    console.log("get machinespec", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setMachineSpec(res.data.Values.MachineSpecData);
    } else {
      console.log("get machine spec info by id false.");
    }
  };

  const fetchEditMachineSpec = async () => {
    const res = await apiEditMachineInfo(machineSpec);
    console.log(res);
  };

  useEffect(() => {
    fetchGetMachineSpec();
  }, []);

  useEffect(() => {
    console.log("machine spec look", machineSpec);
  }, [machineSpec]);
  return (
    <div>
      <MachineSpecEdit
        machineSpec={machineSpec}
        setMachineSpec={setMachineSpec}
        fetchEditMachineSpec={fetchEditMachineSpec}
      />
    </div>
  );
}
