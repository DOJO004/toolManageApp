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

  const changeNewMode = () => {
    setNewMode(!newMode);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
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
  const [elabelInfo, setElabelInfo] = useState({
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
    const res = await apiAddElabelInfo(elabelInfo);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      cleanNewElabelInput();
      fetchGetElabelSpecInfoList();
    } else {
      console.log("add new elabel info false.");
    }
  };

  const cleanNewElabelInput = () => {
    setElabelInfo({
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
  const fetchEditElabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiEditElabelInfo(elabelInfo);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetElabelSpecInfoList();
    } else {
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
      set;
    } else {
      console.log("get elabel info by label code false.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mx-2">
        {newMode && (
          <ElabelInfoNew
            elabelInfo={elabelInfo}
            setElabelInfo={setElabelInfo}
            changeNewMode={changeNewMode}
            fetchNewElabelInfo={fetchNewElabelInfo}
          />
        )}
        {editMode && (
          <ElabelInfoEdit
            elabelInfo={elabelInfo}
            setElabelInfo={setElabelInfo}
            changeEditMode={changeEditMode}
            fetchEditElabelInfo={fetchEditElabelInfo}
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
