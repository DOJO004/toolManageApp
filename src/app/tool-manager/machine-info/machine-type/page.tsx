"use client";
import MachineTypeIndex from "@/app/ui/machineInfo/machineType";
import MachineTypeEdit from "@/app/ui/machineInfo/machineType/edit";
import MachineTypeNew from "@/app/ui/machineInfo/machineType/new";
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";
import {
  apiGetMachineTypeInfoList,
  apiAddMachineTypeInfo,
  apiModifyMachineTypeInfo,
  disableMachineTypeInfo,
  confirmDisable,
} from "@/scripts/api";
import { useEffect, useState, FormEvent } from "react";

export default function Page() {
  // index
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(-1);

  const fetchGetMachineTypeList = async (index?: number) => {
    const res = await apiGetMachineTypeInfoList();
    console.log("get machine type list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        setMachineType(res.data.Values.MachineTypeList[index]);
      } else {
        setMachineTypeList(res.data.Values.MachineTypeList);
        setTotalRecords(res.data.Values.TotalRecords);
      }
    } else {
      console.log("get machine type list false.");
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
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
    setNewMode(false);
    setNotice(false);
  };

  useEffect(() => {
    fetchGetMachineTypeList();
  }, []);

  // new
  const [machineTypeID, setMachineTypeID] = useState("");
  const [machineTypeName, setMachineTypeName] = useState("");

  const fetchAddMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddMachineTypeInfo(machineTypeID, machineTypeName);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanNewMachineTypeInput();
      fetchGetMachineTypeList();
      setIsError(false);
    } else {
      console.log("add machine type false.");
      setIsError(true);
    }
  };

  const cleanNewMachineTypeInput = () => {
    setMachineTypeID("");
    setMachineTypeName("");
  };

  // edit
  const [machineType, setMachineType] = useState({
    MachineTypeID: "",
    MachineTypeName: "",
  });

  const fetchEditMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyMachineTypeInfo(
      machineType.MachineTypeID,
      machineType.MachineTypeName
    );
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setEditMode(false);
      fetchGetMachineTypeList();
      setIsError(false);
    } else {
      setIsError(true);
      console.log("edit machine type false.");
    }
  };

  const fetchDeleteMachineType = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disableMachineTypeInfo(machineType.MachineTypeID);
      setNotice(true);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetMachineTypeList();
        setEditMode(false);
        setIsError(false);
      } else {
        console.log("delete machine type false.");
        setIsError(true);
      }
    }
  };
  return (
    <div className="relative flex flex-col justify-center md:flex-row">
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
      <MachineTypeIndex
        machineTypeList={machineTypeList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetMachineTypeList={fetchGetMachineTypeList}
      />
      <div className="absolute -bottom-10">
        <PageController
          totalPage={totalPage}
          totalRecords={totalRecords}
          nextPage={nextPage}
          exPage={exPage}
          currentPage={currentPage}
        />
      </div>
      <div
        className={` absolute transition-all duration-300 ease-in-out ${
          newMode ? "translate-y-0" : " -translate-y-96"
        }`}
      >
        <MachineTypeNew
          machineTypeID={machineTypeID}
          setMachineTypeID={setMachineTypeID}
          machineTypeName={machineTypeName}
          setMachineTypeName={setMachineTypeName}
          fetchAddMachineType={fetchAddMachineType}
          changeNewMode={changeNewMode}
        />
      </div>
      <div
        className={` absolute transition-all duration-300 ease-in-out ${
          editMode ? "translate-y-0" : " -translate-y-96"
        }`}
      >
        <MachineTypeEdit
          machineType={machineType}
          setMachineType={setMachineType}
          fetchEditMachineType={fetchEditMachineType}
          fetchDeleteMachineType={fetchDeleteMachineType}
          changeEditMode={changeEditMode}
        />
      </div>
    </div>
  );
}
