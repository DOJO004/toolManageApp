"use client";
import MachineSpecIndex from "@/app/ui/machineInfo/machineSpec";
import MachineSpecEdit from "@/app/ui/machineInfo/machineSpec/edit";
import MachineSpecNew from "@/app/ui/machineInfo/machineSpec/new";
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";
import {
  apiGetMachineInfoList,
  apiAddMachineSpecInfo,
  apiGetProductLineInfoList,
  apiGetMachineTypeInfoList,
  apiGetMachineInfoByID,
  apiEditMachineInfo,
  disabledMachineInfo,
  confirmDisable,
} from "@/scripts/api";
import { PostAddMachineSpecInfo } from "@/scripts/seed";
import { useEffect, useState } from "react";

export default function Page() {
  // index
  const [machineSpecList, setMachineSpecList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchGetMachineSpecList = async (index?: number) => {
    const res = await apiGetMachineInfoList();

    if (res?.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        console.log(res.data.Values.MachineSpecList[index]);
        setMachineSpec(res.data.Values.MachineSpecList[index]);
      } else {
        setMachineSpecList(res.data.Values.MachineSpecList);
      }
    } else {
      console.log("get machine spec list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
    setCurrentPage(1);
    cleanNewMachineSpecInput();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeEditMode = (index?: number) => {
    setEditModeIndex(index);
    if (index === editModeIndex) {
      setEditMode(!editMode);
    } else {
      setEditMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (index === undefined) {
      setEditMode(false);
    }
    setCurrentPage(1);
    setNewMode(false);
    setNotice(false);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchGetMachineSpecList();
  }, []);

  // new
  const [productLineList, setProductLineList] = useState([]);
  const [machineTypeList, setMachineTypeList] = useState([]);
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

  const fetchAddMachineSpecInfo = async () => {
    const res = await apiAddMachineSpecInfo(machineSpec);
    setNotice(true);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetMachineSpecList();
      cleanNewMachineSpecInput();
      setCurrentPage(1);
      setIsError(false);
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

  const cleanNewMachineSpecInput = () => {
    setMachineSpec({
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
  };

  useEffect(() => {
    fetchGetProductLineList();
    fetchGetMachineTypeList();
  }, []);

  // edit
  const fetchEditMachineSpec = async () => {
    const res = await apiEditMachineInfo(machineSpec);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
    } else {
      setIsError(true);
      console.log("edit machine spec false.");
    }
  };

  const fetchDeleteMachineSpec = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disabledMachineInfo(machineSpec.MachineID);
      console.log("delete", res);

      if (res?.data?.Values?.ReqInt === 0) {
        setEditMode(false);
        fetchGetMachineSpecList();
      } else {
        console.log("disable machine spec false.");
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center md:flex-row">
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
      <MachineSpecIndex
        machineSpecList={machineSpecList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetMachineSpecList={fetchGetMachineSpecList}
      />

      <div
        className={`absolute top-0 transition-all duration-300 ease-in-out ${
          newMode ? "translate-y-0" : "-translate-y-[32rem]"
        }`}
      >
        <MachineSpecNew
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          productLineList={productLineList}
          machineTypeList={machineTypeList}
          fetchAddMachineSpecInfo={fetchAddMachineSpecInfo}
          changeNewMode={changeNewMode}
        />
      </div>
      <div
        className={`absolute top-0 transition-all duration-300 ease-in-out ${
          editMode ? "translate-y-0" : "-translate-y-[32rem]"
        }`}
      >
        <MachineSpecEdit
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          machineSpec={machineSpec}
          setMachineSpec={setMachineSpec}
          fetchEditMachineSpec={fetchEditMachineSpec}
          changeEditMode={changeEditMode}
          fetchDeleteMachineSpec={fetchDeleteMachineSpec}
          notice={notice}
          isError={isError}
        />
      </div>
    </div>
  );
}
