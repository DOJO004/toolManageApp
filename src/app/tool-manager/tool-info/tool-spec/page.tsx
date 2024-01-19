"use client";
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";
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
  // pageController
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // index
  const [toolSpecList, setToolSpecList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const [newCurrentPage, setNewCurrentPage] = useState(1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    console.log("tool spec list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setTotalPage(res.data.Values.TotalPages);
      setTotalRecords(res.data.Values.ToolsSpecList.length);
      setToolSpecList(res.data.Values.ToolsSpecList);
    } else {
      console.log("get tool spec list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNewCurrentPage(1);
  };

  const changeEditMode = (index?: number) => {
    setEditModeIndex(index);
    setNewCurrentPage(1);
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

  const newNextPage = () => {
    setNewCurrentPage((prev) => prev + 1);
  };

  const newPrevPage = () => {
    setNewCurrentPage((prev) => prev - 1);
  };

  const resetPage = () => {
    setNewCurrentPage(1);
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
      setEditMode(false);
      fetchToolSpecList();
      setNewCurrentPage(1);
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
      console.log("delete", res);

      if (res?.data?.Values?.ReqInt === 0) {
        fetchToolSpecList();
        setEditMode(false);
      } else {
        console.log("disable tool spec info false.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-screen-2xl md:flex-row">
      <Notice notice={notice} setNotice={setNotice} isError={isError} />

      <div className="relative w-full bg-gray-900 rounded-md md:mx-2 h-fit">
        <ToolSpecIndex
          toolSpecList={toolSpecList}
          changeNewMode={changeNewMode}
          changeEditMode={changeEditMode}
          fetchGetToolInfoByID={fetchGetToolInfoByID}
        />
        <div className="my-2">
          <PageController
            totalRecords={totalRecords}
            nextPage={nextPage}
            exPage={exPage}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      </div>

      <div
        className={`fixed  transition-all top-0 left-0 duration-300 bg-black/70 w-screen h-screen ease-in-out ${
          newMode ? " translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="mt-48">
          <ToolSpecNew
            toolTypeList={toolTypeList}
            toolSpecInfo={toolSpecInfo}
            setToolSpecInfo={setToolSpecInfo}
            fetchNewToolSpecInfo={fetchNewToolSpecInfo}
            changeNewMode={changeNewMode}
            currentPage={newCurrentPage}
            nextPage={newNextPage}
            prevPage={newPrevPage}
          />
        </div>
      </div>
      <div
        className={`fixed  transition-all top-0 left-0 duration-300 bg-black/70 w-screen h-screen ease-in-out ${
          editMode ? " translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="mt-48">
          <ToolSpecEdit
            toolTypeList={toolTypeList}
            editToolSpec={editToolSpec}
            setEditToolSpec={setEditToolSpec}
            fetchEditToolInfo={fetchEditToolInfo}
            fetchDisableToolSpecInfo={fetchDisableToolSpecInfo}
            currentPage={newCurrentPage}
            nextPage={newNextPage}
            prevPage={newPrevPage}
            changeMode={changeEditMode}
          />
        </div>
      </div>
    </div>
  );
}
