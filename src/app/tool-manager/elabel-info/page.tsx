"use client";
import ElabelInfoIndex from "@/app/ui/elabelInfo";
import ElabelInfoEdit from "@/app/ui/elabelInfo/edit";
import ElabelInfoNew from "@/app/ui/elabelInfo/new";
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";
import {
  apiAddElabelInfo,
  apiEditElabelInfo,
  apiGetAimsAPsConnectInfoList,
  apiGetAimsArticlesList,
  apiGetElabelInfoByLabelCode,
  apiGetElabelSpecInfoList,
  apiSyncELabelFromAims,
} from "@/scripts/api";
import { FormEvent, use, useEffect, useState } from "react";

export default function Page() {
  // index
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eLabelList, setELabelList] = useState([
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(-1);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const fetchSyncAimsData = async () => {
    const res = await apiSyncELabelFromAims();
    console.log("sync", res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetElabelSpecInfoList();
    } else {
      console.log("sync aims data false.");
    }
  };

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
    console.log("get eLabel spec list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelList(res.data.Values.eLabelList);
      setTotalPage(res.data.Values.TotalPages);
      setTotalRecords(res.data.Values.TotalRecords);
    } else {
      console.log("get elabel spec info list false.");
    }
  };

  useEffect(() => {
    fetchGetElabelSpecInfoList();
  }, []);

  //new
  const [stationCode, setStationCode] = useState([]);
  const [selectArticleIDIndex, setSelectArticleIDIndex] = useState(0);
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

  const fetchGetAimsAPsConnectInfoList = async () => {
    const res = await apiGetAimsAPsConnectInfoList();
    console.log("AimsAps", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setStationCode(res.data.Values.AccessPointList);
    } else {
      console.log("get aims aps false.");
    }
  };

  const fetchGetAimsArticlesList = async () => {
    const res = await apiGetAimsArticlesList();
    if (res?.data?.Values.ReqInt === 0) {
      console.log("ok");
    } else {
      console.log("get aims articles list false.");
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

  useEffect(() => {
    fetchGetAimsAPsConnectInfoList();
  }, []);

  useEffect(() => {
    console.log(stationCode);
  }, [stationCode]);

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
    setNotice(true);
    console.log(res);

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
    if (res?.data?.Values?.ReqInt === 0) {
      setEditElabelInfo(res.data.Values.eLabelData);
    } else {
      console.log("get elabel info by label code false.");
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row">
      <div className="mx-2">
        <Notice notice={notice} isError={isError} setNotice={setNotice} />
        <ElabelInfoIndex
          eLabelList={eLabelList}
          changeNewMode={changeNewMode}
          changeEditMode={changeEditMode}
          fetchGetElabelInfoByLabelCode={fetchGetElabelInfoByLabelCode}
          fetchSyncAimsData={fetchSyncAimsData}
        />
        <div>
          <PageController
            currentPage={currentPage}
            totalPage={totalPage}
            totalRecords={totalRecords}
            nextPage={nextPage}
            exPage={exPage}
          />
        </div>

        <div
          className={`fixed left-0 top-0 bg-black/70 w-screen h-screen transition-all duration-300 ease-in-out ${
            newMode ? " translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-center mt-48">
            <ElabelInfoNew
              selectArticleIDIndex={selectArticleIDIndex}
              eLabelList={eLabelList}
              stationCode={stationCode}
              newElabelInfo={newElabelInfo}
              setNewElabelInfo={setNewElabelInfo}
              changeNewMode={changeNewMode}
              fetchNewElabelInfo={fetchNewElabelInfo}
            />
          </div>
        </div>

        <div
          className={`absolute top-0 left-1/4 transition-all duration-300 ease-in-out ${
            editMode ? " translate-y-0" : "-translate-y-[32rem]"
          }`}
        >
          <ElabelInfoEdit
            editElabelInfo={editElabelInfo}
            setEditElabelInfo={setEditElabelInfo}
            changeEditMode={changeEditMode}
            fetchEditElabelInfo={fetchEditElabelInfo}
          />
        </div>
      </div>
    </div>
  );
}
