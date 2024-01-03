"use client";
import NewToolType from "@/app/ui/toolInfo/toolType/new";
import { apiAddToolTypeInfo } from "@/scripts/api";
import { FormEvent, useState } from "react";

export default function Page() {
  const [toolTypeID, setToolTypeID] = useState("");
  const [toolTypeName, setToolTypeName] = useState("");
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchNewToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolTypeInfo(toolTypeID, toolTypeName);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanFormData();
      setIsError(false);
    } else {
      setIsError(true);
    }
    console.log(res);
  };

  const cleanFormData = () => {
    setToolTypeID("");
    setToolTypeName("");
  };

  return (
    <NewToolType
      toolTypeID={toolTypeID}
      setToolTypeID={setToolTypeID}
      toolTypeName={toolTypeName}
      setToolTypeName={setToolTypeName}
      fetchNewToolType={fetchNewToolType}
      notice={notice}
      isError={isError}
    />
  );
}
