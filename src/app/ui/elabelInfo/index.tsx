"use client";

import {
  apiGetELabelList,
  syncELabelDataFromAims,
} from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { useEffect, useState } from "react";
import EditELabelInfo from "./edit";
import NewELabelInfo from "./new";

export default function ELabelInfoIndex() {
  const [eLabelList, setELabelList] = useState([]);
  const [newLabelMode, setNewLabelMode] = useState(false);
  const [editLabelMode, setEditLabelMode] = useState(false);
  const [editLabelData, setEditLabelData] = useState({
    BindStatus: "",
    LToolCode: 0,
    ToolSn: "",
    LastModify: "",
    LabelId: "",
    LabelSn: "",
    Brand: "",
    LabelCode: "",
    NfcRecord: "",
    StationCode: "",
    ArticleID: "",
    ArticleName: "",
  });

  const getELabelList = async () => {
    const res = await apiGetELabelList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelList(res.data.Values.LabelList);
    }
  };

  const handleNewLabelMode = () => {
    setNewLabelMode(!newLabelMode);
    setEditLabelMode(false);
  };

  const handleEditLabeMode = (labeData: any) => {
    console.log(labeData);

    setEditLabelMode(true);
    setNewLabelMode(false);
    setEditLabelData({
      BindStatus: labeData.BindStatus,
      LToolCode: labeData.LabelBind?.LToolCode,
      ToolSn: labeData.LabelBind?.ToolSn,
      LastModify: labeData.LastModify,
      LabelId: labeData.LabelId,
      LabelSn: labeData.LabelSn,
      Brand: labeData.Brand,
      LabelCode: labeData.AimsSpec?.LabelCode,
      NfcRecord: labeData.AimsSpec?.NfcRecord,
      StationCode: labeData.AimsSpec?.StationCode,
      ArticleID: labeData.AimsSpec?.ArticleInfo.ArticleID,
      ArticleName: labeData.AimsSpec?.ArticleInfo.ArticleName,
    });
  };

  const postAsyncELabelInfoFromAims = async () => {
    const res = await syncELabelDataFromAims();
    console.log(res);
  };

  useEffect(() => {
    getELabelList();
  }, []);
  return (
    <div className="relative w-full max-h-full p-2 overflow-auto text-center ">
      <div className="relative">
        <button
          className=" absolute top-0 left-[80%] md:left-[70%] lg:left-[65%] p-2 border rounded-md hover:bg-gray-600"
          onClick={() => handleNewLabelMode()}
        >
          新增
        </button>
        <h2 className="my-4 ">電子標籤列表</h2>
      </div>
      <div
        className={`transition-all overflow-hidden duration-300 ease-in-out ${
          newLabelMode ? "h-[46em]" : "h-0"
        }`}
      >
        <NewELabelInfo getELabelList={getELabelList} />
      </div>
      <div
        className={`transition-all overflow-hidden duration-300 ease-in-out ${
          editLabelMode ? "h-[46em]" : "h-0"
        }`}
      >
        <EditELabelInfo
          editLabelData={editLabelData}
          setEditLabelData={setEditLabelData}
          getELabelList={getELabelList}
          setEditLabelMode={setEditLabelMode}
        />
      </div>
      <div className="mt-2 overflow-auto rounded-t-xl">
        <table className="w-full ">
          <thead>
            <tr className="p-1 bg-indigo-500">
              <td className="p-1 whitespace-nowrap">LabelCode</td>
              <td className="p-1 whitespace-nowrap">eLabelSN</td>
              <td className="p-1 whitespace-nowrap">StationCode</td>
              <td className="p-1 whitespace-nowrap">ArticleID</td>
              <td className="p-1 whitespace-nowrap">ArticleName</td>
              <td className="p-1 whitespace-nowrap">LastModify</td>
            </tr>
          </thead>
          <tbody>
            {eLabelList
              ? eLabelList.map((item) => (
                  <tr
                    key={item.LabelId}
                    className="cursor-pointer hover:bg-gray-600"
                    onClick={() => handleEditLabeMode(item)}
                  >
                    <td className="p-1 whitespace-nowrap">
                      {item.AimsSpec?.LabelCode}
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.LabelSn}</td>
                    <td className="p-1 whitespace-nowrap">
                      {item.AimsSpec?.StationCode}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.AimsSpec?.ArticleInfo.ArticleID}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.AimsSpec?.ArticleInfo.ArticleName}
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          className="p-1 text-white bg-gray-500 rounded-md hover:bg-gray-600 "
          onClick={() => postAsyncELabelInfoFromAims()}
        >
          同步AIMS電子標籤
        </button>
      </div>
    </div>
  );
}
