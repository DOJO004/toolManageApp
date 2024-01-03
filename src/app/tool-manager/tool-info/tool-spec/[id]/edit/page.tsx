"use client";
import ToolSpecEdit from "@/app/ui/toolInfo/toolSpec/edit";
import {
  apiGetToolInfo,
  apiGetToolTypeInFoList,
  apiModifyToolSpecInfo,
  confirmDisable,
  disabledToolInfo,
} from "@/scripts/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const params = useParams();
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolInfo, setToolInfo] = useState({
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
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeList);
    } else {
      console.log("get tool type list false.");
    }
  };

  const fetchGetToolInfoByID = async () => {
    const res = await apiGetToolInfo(params.id);
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolInfo(res.data.Values.ToolSpecData);
    } else {
      console.log("get tool info by id false.");
    }
  };

  const fetchEditToolInfo = async () => {
    const res = await apiModifyToolSpecInfo(toolInfo);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      console.log("edit tool spec success.");
      setIsError(false);
      router.push("/tool-manager/tool-info/tool-spec");
    } else {
      console.log("edit tool spec info false.");
      resetPage();
      setIsError(true);
    }
  };

  const fetchDisableToolSpecInfo = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disabledToolInfo(toolInfo.ToolSpecID);
      console.log(res);

      if (res?.data?.Values?.ReqInt === 0) {
        router.push("/tool-manager/tool-info/tool-spec");
      } else {
        console.log("disable tool spec info false.");
      }
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

  useEffect(() => {
    fetchGetToolTypeList();
    fetchGetToolInfoByID();
  }, []);

  return (
    <div>
      <ToolSpecEdit
        toolInfo={toolInfo}
        setToolInfo={setToolInfo}
        toolTypeList={toolTypeList}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        fetchEditToolInfo={fetchEditToolInfo}
        notice={notice}
        isError={isError}
        fetchDisableToolSpecInfo={fetchDisableToolSpecInfo}
      />
    </div>
  );
}
