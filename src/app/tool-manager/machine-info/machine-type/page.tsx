"use client";
import MachineTypeIndex from "@/app/ui/machineInfo/machineType";
import MachineTypeEdit from "@/app/ui/machineInfo/machineType/edit";
import MachineTypeNew from "@/app/ui/machineInfo/machineType/new";
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

  const fetchGetMachineTypeList = async (index?: number) => {
    const res = await apiGetMachineTypeInfoList();

    if (res?.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        setMachineType(res.data.Values.MachineTypeList[index]);
      } else {
        setMachineTypeList(res.data.Values.MachineTypeList);
      }
    } else {
      console.log("get machine type list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeEditMode = (index: number) => {
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
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetMachineTypeList();
        setEditMode(false);
      } else {
        console.log("delete machine type false.");
      }
    }
  };
  return (
    <div className="flex flex-col justify-center md:flex-row">
      {newMode && (
        <MachineTypeNew
          machineTypeID={machineTypeID}
          setMachineTypeID={setMachineTypeID}
          machineTypeName={machineTypeName}
          setMachineTypeName={setMachineTypeName}
          fetchAddMachineType={fetchAddMachineType}
          changeNewMode={changeNewMode}
          notice={notice}
          isError={isError}
        />
      )}

      {editMode && (
        <MachineTypeEdit
          machineType={machineType}
          setMachineType={setMachineType}
          fetchEditMachineType={fetchEditMachineType}
          fetchDeleteMachineType={fetchDeleteMachineType}
          changeEditMode={changeEditMode}
          notice={notice}
          isError={isError}
        />
      )}

      <MachineTypeIndex
        machineTypeList={machineTypeList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetMachineTypeList={fetchGetMachineTypeList}
      />
    </div>
  );
}
