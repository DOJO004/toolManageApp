"use client";
import ToolTypeIndex from "@/app/ui/toolInfo/toolType";
import ToolTypeEdit from "@/app/ui/toolInfo/toolType/edit";
import ToolTypeNew from "@/app/ui/toolInfo/toolType/new";
import {
  apiGetToolTypeInFoList,
  apiAddToolTypeInfo,
  apiModifyToolTypeInfo,
  confirmDisable,
  disabledToolTypeInfo,
} from "@/scripts/api";
import { useEffect, useState, FormEvent } from "react";

export default function Page() {
  // index
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetToolTypeList = async (index?: number) => {
    const res = await apiGetToolTypeInFoList();
    if (res.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        console.log(index);

        setEditToolType(res.data.Values.ToolTypeList[index]);
      } else {
        setToolTypeList(res.data.Values.ToolTypeList);
      }
    } else {
      console.log("get tool type list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
  };

  const changeEditMode = (index?: number) => {
    setEditIndex(index);
    if (index === editIndex) {
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
    fetchGetToolTypeList();
  }, []);

  // new
  const [toolTypeID, setToolTypeID] = useState("");
  const [toolTypeName, setToolTypeName] = useState("");

  const fetchNewToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolTypeInfo(toolTypeID, toolTypeName);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetToolTypeList();
      cleanFormData();
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const cleanFormData = () => {
    setToolTypeID("");
    setToolTypeName("");
  };

  // edit
  const [editToolType, setEditToolType] = useState({
    ToolTypeID: "",
    Name: "",
  });

  const fetchEditToolType = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyToolTypeInfo(
      editToolType.ToolTypeID,
      editToolType.Name
    );
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetToolTypeList();
      setIsError(false);
    } else {
      setIsError(true);
    }
    console.log(res);
  };

  const fetchDisableToolType = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await disabledToolTypeInfo(editToolType.ToolTypeID);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetToolTypeList();
        setEditMode(false);
        setEditIndex(-1);
      } else {
        console.log("disable tool type false.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center ">
      {newMode && (
        <ToolTypeNew
          toolTypeID={toolTypeID}
          setToolTypeID={setToolTypeID}
          toolTypeName={toolTypeName}
          setToolTypeName={setToolTypeName}
          fetchNewToolType={fetchNewToolType}
          notice={notice}
          isError={isError}
          changeNewMode={changeNewMode}
        />
      )}
      {editMode && (
        <ToolTypeEdit
          editToolType={editToolType}
          setEditToolType={setEditToolType}
          fetchEditToolType={fetchEditToolType}
          fetchDisableToolType={fetchDisableToolType}
          changeEditMode={changeEditMode}
          notice={notice}
          isError={isError}
        />
      )}
      <div className="relative">
        <ToolTypeIndex
          toolTypeList={toolTypeList}
          changeEditMode={changeEditMode}
          fetchGetToolTypeList={fetchGetToolTypeList}
        />
        <button
          className="absolute p-1 bg-indigo-500 rounded-md top-1 right-3 hover:bg-indigo-600 "
          onClick={() => changeNewMode()}
        >
          新增
        </button>
      </div>
    </div>
  );
}
