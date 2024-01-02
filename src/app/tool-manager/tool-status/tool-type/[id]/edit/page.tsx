"use client";
import ToolTypeEdit from "@/app/ui/toolStatus/toolType/edit";
import {
  apiGetToolTypeInFoList,
  apiModifyToolTypeInfo,
  confirmDisable,
  disabledToolTypeInfo,
} from "@/scripts/api";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [toolTypeID, setToolTypeID] = useState("");
  const [toolTypeName, setToolTypeName] = useState("");
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const fetchEditToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyToolTypeInfo(toolTypeID, toolTypeName);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanInput();
      router.push("/tool-manager/tool-status/tool-type");
    } else {
      setIsError(true);
    }
    console.log(res);
  };

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      const id = params.id;
      setToolTypeID(res.data.Values.ToolTypeList[id].ToolTypeID);
      setToolTypeName(res.data.Values.ToolTypeList[id].Name);
    } else {
      console.log("get tool type list false.");
    }
  };

  const fetchDisableToolType = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disabledToolTypeInfo(toolTypeID);
      if (res?.data?.Values?.ReqInt === 0) {
        router.push("/tool-manager/tool-status/tool-type");
      } else {
        console.log("disable tool type false.");
      }
    }
  };

  const cleanInput = () => {
    setToolTypeID("");
    setToolTypeName("");
  };

  useEffect(() => {
    fetchGetToolTypeList();
  }, []);
  return (
    <ToolTypeEdit
      toolTypeID={toolTypeID}
      toolTypeName={toolTypeName}
      setToolTypeName={setToolTypeName}
      fetchEditToolType={fetchEditToolType}
      notice={notice}
      isError={isError}
      fetchDisableToolType={fetchDisableToolType}
    />
  );
}
