"use client";
import PageController from "@/app/ui/pageController/pageController";
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
import { useEffect, useState, FormEvent, Suspense } from "react";

export default function Page() {
  // index
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalCountItem, setTotalCountItem] = useState(-1);
  const prePageItem = 20;

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleToolTypeListData = (data: {}, index: number) => {
    setTotalCountItem(data.Values.TotalRecords);
    setTotalPageNumberFunction(data.Values.TotalRecords);

    if (index || index === 0) {
      setEditToolType(data.Values.ToolTypeList[index]);
    } else {
      setToolTypeList(
        data.Values.ToolTypeList.slice(
          prePageItem * currentPage - 20,
          prePageItem * currentPage
        )
      );
    }
  };

  const fetchGetToolTypeList = async (index?: number) => {
    const res = await apiGetToolTypeInFoList();
    console.log("tool type info list", res);

    if (res.data?.Values?.ReqInt === 0) {
      handleToolTypeListData(res.data, index);
    } else {
      console.log("get tool type list false.");
    }
  };

  const setTotalPageNumberFunction = (TotalRecords: number) => {
    setTotalPage(Math.ceil(TotalRecords / prePageItem));
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
  }, [currentPage]);

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
    <div className="flex flex-col justify-center md:flex-row">
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
      <div className="relative ">
        <ToolTypeIndex
          toolTypeList={toolTypeList}
          changeEditMode={changeEditMode}
          fetchGetToolTypeList={fetchGetToolTypeList}
          changeNewMode={changeNewMode}
        />
        <PageController
          totalCountItem={totalCountItem}
          currentPage={currentPage}
          totalPage={totalPage}
          nextPage={nextPage}
          exPage={exPage}
        />
      </div>
    </div>
  );
}
