"use client";
import MachineTypeEdit from "@/app/ui/machineInfo/machineType/edit";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const machineTypeIndex = useParams().id;
  const [machineType, setMachineType] = useState({
    MachineTypeID: "",
    MachineTypeName: "",
  });
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetMachineTypeList = async () => {
    const res = await apiGetMachineTypeInfoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineType(res.data.Values.MachineTypeList[machineTypeIndex]);
    } else {
      console.log("get machine type list false.");
    }
  };

  const fetchEditMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyMachineTypeInfo(
      machineType.MachineTypeID,
      machineType.MachineTypeName
    );
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      router.push("/tool-manager/machine-info/machine-type");
    } else {
      console.log("edit machine type false.");
    }
  };

  const fetchDeleteMachineType = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disableMachineTypeInfo(machineType.MachineTypeID);
      if (res?.data?.Values?.ReqInt === 0) {
        router.push("/tool-manager/machine-info/machine-type");
      } else {
        console.log("delete machine type false.");
      }
    }
  };

  useEffect(() => {
    fetchGetMachineTypeList();
  }, []);

  useEffect(() => {
    console.log(machineType);
  }, []);
  return (
    <div>
      <MachineTypeEdit
        machineType={machineType}
        setMachineType={setMachineType}
        fetchEditMachineType={fetchEditMachineType}
        fetchDeleteMachineType={fetchDeleteMachineType}
      />
    </div>
  );
}
