"use client";
import ToolSpecIndex from "@/app/ui/toolInfo/toolSpec";
import ToolSpecEdit from "@/app/ui/toolInfo/toolSpec/edit";
import ToolSpecNew from "@/app/ui/toolInfo/toolSpec/new";
import {
  apiGetToolSpecList,
  apiGetToolTypeInFoList,
  apiAddToolSpecInfo,
  apiGetToolInfo,
  apiModifyToolSpecInfo,
  disabledToolInfo,
  confirmDisable,
} from "@/scripts/api";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  // index
  const [toolSpecList, setToolSpecList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolsSpecList);
    } else {
      console.log("get tool spec list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setCurrentPage(1);
  };

  const changeEditMode = (index?: number) => {
    setEditModeIndex(index);
    setCurrentPage(1);
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
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchToolSpecList();
  }, []);

  // new
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolSpecInfo, setToolSpecInfo] = useState({
    ToolSpecID: "",
    Name: "",
    ToolType: "",
    Specification: {
      BladeDiameter: "",
      BladeHeight: "",
      TotalLength: "",
      HandleDiameter: "",
    },
    SafetyStock: "",
    MaxLife: {
      ProcessCnt: "",
      ProcessTime: "",
      ProcessLength: "",
      RepairCnt: "",
    },
  });

  const fetchToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeList);
    } else {
      console.log("get tool type list false.");
    }
  };

  const fetchNewToolSpecInfo = async () => {
    const res = await apiAddToolSpecInfo(toolSpecInfo);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchToolSpecList();
      cleanFormData();
      resetPage();
      setIsError(false);
    } else {
      console.log(" add tool spec info false.");
      setIsError(true);
      resetPage();
    }
  };

  const cleanFormData = () => {
    setToolSpecInfo({
      ToolSpecID: "",
      Name: "",
      ToolType: "",
      Specification: {
        BladeDiameter: "",
        BladeHeight: "",
        TotalLength: "",
        HandleDiameter: "",
      },
      SafetyStock: "",
      MaxLife: {
        ProcessCnt: "",
        ProcessTime: "",
        ProcessLength: "",
        RepairCnt: "",
      },
    });
  };

  useEffect(() => {
    fetchToolTypeList();
  }, []);

  // edit
  const [editToolSpec, setEditToolSpec] = useState({
    ToolSpecID: "",
    Name: "",
    ToolType: "",
    Specification: {
      BladeDiameter: "",
      BladeHeight: "",
      TotalLength: "",
      HandleDiameter: "",
    },
    SafetyStock: "",
    MaxLife: {
      ProcessCnt: "",
      ProcessTime: "",
      ProcessLength: "",
      RepairCnt: "",
    },
  });

  const fetchGetToolInfoByID = async (id: string) => {
    const res = await apiGetToolInfo(id);
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setEditToolSpec(res.data.Values.ToolSpecData);
    } else {
      console.log("get tool info by id false.");
    }
  };

  const fetchEditToolInfo = async () => {
    const res = await apiModifyToolSpecInfo(editToolSpec);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchToolSpecList();
      setCurrentPage(1);
      setIsError(false);
    } else {
      console.log("edit tool spec info false.");
      resetPage();
      setIsError(true);
    }
  };

  const fetchDisableToolSpecInfo = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disabledToolInfo(editToolSpec.ToolSpecID);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchToolSpecList();
        setEditMode(false);
      } else {
        console.log("disable tool spec info false.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:mx-2">
        {newMode && (
          <ToolSpecNew
            toolTypeList={toolTypeList}
            toolSpecInfo={toolSpecInfo}
            setToolSpecInfo={setToolSpecInfo}
            fetchNewToolSpecInfo={fetchNewToolSpecInfo}
            changeNewMode={changeNewMode}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            notice={notice}
            isError={isError}
          />
        )}
        {editMode && (
          <ToolSpecEdit
            toolTypeList={toolTypeList}
            editToolSpec={editToolSpec}
            setEditToolSpec={setEditToolSpec}
            fetchEditToolInfo={fetchEditToolInfo}
            fetchDisableToolSpecInfo={fetchDisableToolSpecInfo}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
            notice={notice}
            isError={isError}
            changeMode={changeEditMode}
          />
        )}
      </div>
      <ToolSpecIndex
        toolSpecList={toolSpecList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetToolInfoByID={fetchGetToolInfoByID}
      />
    </div>
  );
}
