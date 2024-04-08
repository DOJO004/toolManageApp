"use client";
import MachineSpecNew from "@/app/ui/machineInfo/machineSpec/new";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const [productLineList, setProductLineList] = useState([]);
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [machineSpec, setMachineSpec] = useState({
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
    AxisInfos: {
      AxisIndex: "",
      AxisName: "",
      IsSpindle: false,
    },
  });
  const router = useRouter();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const fetchAddMachineSpecInfo = async () => {
    const res = await apiAddMachineSpecInfo(machineSpec);
    setNotice(true);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      router.push("/tool-manager/machine-info/machine-spec");
    } else {
      setIsError(true);
      setCurrentPage(1);
      console.log("add machine spec info false.");
    }
  };

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineInfoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    } else {
      console.log("get product line list false.");
    }
  };

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
    fetchGetProductLineList();
    fetchGetMachineTypeList();
  }, []);

  return (
    <div>
      <MachineSpecNew
        machineSpec={machineSpec}
        setMachineSpec={setMachineSpec}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        productLineList={productLineList}
        machineTypeList={machineTypeList}
        fetchAddMachineSpecInfo={fetchAddMachineSpecInfo}
        notice={notice}
        isError={isError}
      />
    </div>
  );
}
