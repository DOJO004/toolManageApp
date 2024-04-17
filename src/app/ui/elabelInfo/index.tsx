"use client";

import {
  apiGetELabelList,
  syncELabelDataFromAims,
} from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { useEffect, useState } from "react";
import NewELabelInfo from "./new";
import {
  GetELabelListResponse,
  LabelItem,
  SyncLabelDataFromAimsResponse,
} from "./types";

export default function ELabelInfoIndex() {
  const [eLabelList, setELabelList] = useState<LabelItem[]>([]);
  const [newLabelMode, setNewLabelMode] = useState(false);
  const [editLabelMode, setEditLabelMode] = useState(false);
  const [editLabelModeIndex, setEditLabelModeIndex] = useState(-1);
  const [editLabelData, setEditLabelData] = useState({
    LabelBrandId: "",
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
    const data = await apiGetELabelList();
    const res = data as GetELabelListResponse;
    console.log("get eLabelList", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelList(res.data.Values.LabelList);
    }
  };

  const handleNewLabelMode = () => {
    setNewLabelMode(!newLabelMode);
    setEditLabelMode(false);
  };

  const handleEditLabeMode = (labeData: LabelItem, index: number) => {
    console.log(labeData);

    setEditLabelMode(true);
    setNewLabelMode(false);
    setEditLabelModeIndex(index);
    setEditLabelData({
      LabelBrandId: "",
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
    const data = await syncELabelDataFromAims();
    const res = data as SyncLabelDataFromAimsResponse;
    console.log(res);
  };

  useEffect(() => {
    getELabelList();
  }, []);
  return (
    <div className="relative flex w-full p-2 overflow-auto text-center ">
      <div className="w-full mx-4">
        <div className="relative">
          <button
            className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewLabelMode()}
          >
            新增
          </button>
          <h2 className="my-4 ">電子標籤列表</h2>
        </div>
        {/* new */}
        <div
          className={`transition-all overflow-hidden duration-300 ease-in-out ${
            newLabelMode ? "h-40" : "h-0"
          }`}
        >
          <NewELabelInfo
            setNewLabelMode={setNewLabelMode}
            getELabelList={getELabelList}
          />
        </div>
        <div className="p-4 mt-2 overflow-auto bg-gray-700 rounded-xl">
          <table className="w-full ">
            <thead>
              <tr className="p-1 bg-indigo-500">
                <td className="p-1 ">LabelCode</td>
                <td className="p-1 ">eLabelSN</td>
                <td className="p-1 ">StationCode</td>
                <td className="p-1 ">Status</td>
                <td className="p-1 ">LastModify</td>
                <td className="p-1 ">編輯</td>
              </tr>
            </thead>
            <tbody>
              {eLabelList.length > 0
                ? eLabelList.map((item, index) =>
                    editLabelMode && editLabelModeIndex === index ? (
                      <tr key={item.LabelId}>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                    ) : (
                      <tr key={item.LabelId} className=" hover:bg-gray-600">
                        <td className="p-1 ">{item.AimsSpec?.LabelCode}</td>
                        <td className="p-1 ">{item.LabelSn}</td>
                        <td className="p-1 ">{item.AimsSpec?.StationCode}</td>
                        <td className="p-1 ">
                          {item.BindStatus === "Standby"
                            ? `已綁定 / ${item.LabelBind.ToolSn}`
                            : "未綁定"}{" "}
                        </td>
                        <td className="p-1 ">{item.LastModify}</td>
                        <td className="p-1 ">
                          <button
                            className="p-1 rounded-md hover:bg-indigo-600"
                            onClick={() => handleEditLabeMode(item, index)}
                          >
                            編輯
                          </button>
                        </td>
                      </tr>
                    )
                  )
                : null}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className="p-1 bg-indigo-500 rounded-md hover:bg-indigo-600"
              onClick={() => postAsyncELabelInfoFromAims()}
            >
              同步AIMS電子標籤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
