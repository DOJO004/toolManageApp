"use client";
import ToolSpecNew from "@/app/ui/toolInfo/toolSpec/new";
import { apiAddToolSpecInfo, apiGetToolTypeInFoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
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
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

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
      cleanFormData();
      resetPage();
      setIsError(false);
    } else {
      console.log(" add tool spec info false.");
      setIsError(true);
      resetPage();
    }
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

  return (
    <div>
      <ToolSpecNew
        toolTypeList={toolTypeList}
        toolSpecInfo={toolSpecInfo}
        setToolSpecInfo={setToolSpecInfo}
        fetchNewToolSpecInfo={fetchNewToolSpecInfo}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        notice={notice}
        isError={isError}
      />
    </div>
  );
}
