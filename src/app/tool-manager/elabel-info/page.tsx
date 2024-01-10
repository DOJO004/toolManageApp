"use client";
import ElabelInfoIndex from "@/app/ui/elabelInfo";
import ElabelInfoEdit from "@/app/ui/elabelInfo/edit";
import ElabelInfoNew from "@/app/ui/elabelInfo/new";
import {
  apiAddElabelInfo,
  apiEditElabelInfo,
  apiGetElabelInfoByLabelCode,
  apiGetElabelSpecInfoList,
} from "@/scripts/api";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  // index
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [elabelList, setElabelList] = useState([
    {
      LabelCode: "",
      eLabelSN: "",
      StationCode: "",
      ArticleID: "",
      ArticleName: "",
      LastModify: "",
    },
  ]);

  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeNewMode = () => {
    cleanNewElabelInput();
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
    setNewMode(false);
    setNotice(false);
  };

  const fetchGetElabelSpecInfoList = async () => {
    const res = await apiGetElabelSpecInfoList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setElabelList(res.data.Values.eLabelList);
    } else {
      console.log("get elabel spec info list false.");
    }
  };

  useEffect(() => {
    fetchGetElabelSpecInfoList();
  }, []);

  //new
  const [newElabelInfo, setNewElabelInfo] = useState({
    LabelCode: "",
    eLabelSN: "",
    eLabelSpec: {
      StationCode: "",
      ArticleID: "",
      ArticleName: "",
    },
  });

  const fetchNewElabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddElabelInfo(newElabelInfo);
    console.log("new elabel info", res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanNewElabelInput();
      fetchGetElabelSpecInfoList();
      setIsError(false);
    } else {
      setIsError(true);
      console.log("add new elabel info false.");
    }
  };

  const cleanNewElabelInput = () => {
    setNewElabelInfo({
      LabelCode: "",
      eLabelSN: "",
      eLabelSpec: {
        StationCode: "",
        ArticleID: "",
        ArticleName: "",
      },
    });
  };

  // edit
  const [editElabelInfo, setEditElabelInfo] = useState({
    LabelCode: "",
    eLabelSN: "",
    StationCode: "",
    ArticleID: "",
    ArticleName: "",
    LastModify: "",
  });
  const fetchEditElabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiEditElabelInfo(editElabelInfo);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      fetchGetElabelSpecInfoList();
    } else {
      setIsError(true);
      console.log("edit elabel info false.");
    }
  };

  const fetchGetElabelInfoByLabelCode = async (
    labelCode: string,
    labelSN: string
  ) => {
    const res = await apiGetElabelInfoByLabelCode(labelCode, labelSN);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setEditElabelInfo(res.data.Values.eLabelData);
    } else {
      console.log("get elabel info by label code false.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mx-2">
        {newMode && (
          <ElabelInfoNew
            newElabelInfo={newElabelInfo}
            setNewElabelInfo={setNewElabelInfo}
            changeNewMode={changeNewMode}
            fetchNewElabelInfo={fetchNewElabelInfo}
            notice={notice}
            isError={isError}
          />
        )}
        {editMode && (
          <ElabelInfoEdit
            editElabelInfo={editElabelInfo}
            setEditElabelInfo={setEditElabelInfo}
            changeEditMode={changeEditMode}
            fetchEditElabelInfo={fetchEditElabelInfo}
            notice={notice}
            isError={isError}
          />
        )}
      </div>
      <ElabelInfoIndex
        elabelList={elabelList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetElabelInfoByLabelCode={fetchGetElabelInfoByLabelCode}
      />
    </div>
  );
}
