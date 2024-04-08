"use client";
import MachineTypeNew from "@/app/ui/machineInfo/machineType/new";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiAddMachineTypeInfo } from ;

export default function Page() {
  const router = useRouter();
  const [machineTypeID, setMachineTypeID] = useState("");
  const [machineTypeName, setMachineTypeName] = useState("");
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAddMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddMachineTypeInfo(machineTypeID, machineTypeName);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      router.push("/tool-manager/machine-info/machine-type");
    } else {
      console.log("add machine type false.");
      setIsError(true);
    }
  };
  return (
    <MachineTypeNew
      machineTypeID={machineTypeID}
      setMachineTypeID={setMachineTypeID}
      machineTypeName={machineTypeName}
      setMachineTypeName={setMachineTypeName}
      fetchAddMachineType={fetchAddMachineType}
      notice={notice}
      isError={isError}
    />
  );
}
