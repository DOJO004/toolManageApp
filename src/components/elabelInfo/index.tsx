"use client";

import {
  apiGetELabelList,
  syncELabelDataFromAims,
} from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import { useNotice } from "../context/NoticeContext";
import SweetAlert from "../sweetAlert";
import NewELabelInfo from "./new";
import {
  GetELabelListResponse,
  LabelItem,
  SyncLabelDataFromAimsResponse,
} from "./types";

export default function ELabelInfoIndex() {
  const { setShowNotice } = useNotice();
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

  const getELabelList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      return;
    }
    try {
      const data = await apiGetELabelList();
      const res = data as GetELabelListResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("get eLabelList", res);

      if (reqInt === 0) {
        setELabelList(res.data.Values.LabelList);
        return res.data.Values.LabelList;
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      getELabelList(count + 1);
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
    const reqInt = res.data?.Values?.ReqInt;
    if (reqInt === 0) {
      handleNotice("success", true, "同步成功");
    } else {
      handleNotice("error", true, `同步失敗，errorCode = ${reqInt}`);
    }
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchLabel = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const data = await getELabelList();
      if (data) {
        const filterData = data.filter((item) => {
          return (
            item.LabelSn.toLowerCase().includes(value.toLowerCase()) ||
            item.LabelId.toLowerCase().includes(value.toLowerCase())
          );
        });
        setELabelList(filterData);
      }
    }, 500);
  };

  useEffect(() => {
    getELabelList();
  }, []);
  return (
    <div className="relative flex w-full p-2 overflow-auto text-center ">
      <div className="w-full mx-4">
        <div className="relative my-4">
          <button
            className="absolute top-0 right-0 p-1 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewLabelMode()}
          >
            新增
          </button>
          <h2 className="my-4 ">電子標籤列表</h2>
          <input
            type="search"
            placeholder="搜尋標籤"
            className="p-2 text-black rounded-md w-96"
            onChange={(e) => searchLabel(e.target.value)}
          />
        </div>
        {/* new */}
        <div
          className={`transition-all overflow-hidden duration-300 ease-in-out ${
            newLabelMode ? "h-52" : "h-0"
          }`}
        >
          <NewELabelInfo
            setNewLabelMode={setNewLabelMode}
            getELabelList={getELabelList}
          />
        </div>
        <div className="p-4 mt-2 overflow-auto bg-gray-900 rounded-xl">
          <table className="w-full ">
            <thead>
              <tr className="p-1 bg-indigo-500">
                <td className="p-1 ">標籤號碼</td>
                <td className="p-1 ">標籤 SN</td>
                <td className="p-1 ">站號</td>
                <td className="p-1 ">狀態 / 綁定刀具 SN</td>
                <td className="p-1 ">最後更新</td>
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
