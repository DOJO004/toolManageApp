"use client";

import SubmitButton from "@/components/buttons";
import NewELabelInfo from "@/components/elabelInfo/new";
import {
  apiDeleteELabel,
  apiEditELabel,
  apiGetELabelList,
  apiNewELabel,
  syncELabelDataFromAims,
} from "@/scripts/Apis/eLabelInfo/eLabelInfoApis";
import {
  EditLabelItem,
  LabelItem,
  NewLabelItem,
} from "@/scripts/Apis/eLabelInfo/types";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [eLabelList, setELabelList] = useState<LabelItem[]>([]);
  const [newLabelInfo, setNewLabelInfo] = useState<NewLabelItem>(
    {} as NewLabelItem
  );
  const [editLabelData, setEditLabelData] = useState<EditLabelItem>(
    {} as EditLabelItem
  );

  const [newLabelMode, setNewLabelMode] = useState(false);
  const [editLabelMode, setEditLabelMode] = useState(false);
  const [editLabelModeIndex, setEditLabelModeIndex] = useState(-1);
  const [isPending, setIsPending] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const getELabelList = async () => {
    setELabelList(await apiGetELabelList());
  };

  const postNewLabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const reqInt = await apiNewELabel(newLabelInfo);
    if (reqInt === 0) {
      getELabelList();
      cleanNewLabelInfo();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗。errorCode = ${reqInt}`);
    }
    setIsPending(false);
  };

  const cleanNewLabelInfo = () => {
    setNewLabelInfo({
      LabelBrandId: "",
      LabelSn: "",
      LabelCode: "",
      NfcRecord: "",
      StationCode: "",
      ArticleID: "",
      ArticleName: "",
    });
  };

  const handleNewLabelInfo = (key: string, value: string) => {
    setNewLabelInfo((prev) => ({ ...prev, [key]: value }));
  };

  const patchELabelInfo = async () => {
    setIsPending(true);
    const reqInt = await apiEditELabel(editLabelData);
    if (reqInt === 0) {
      getELabelList();
      cleanEditELabelData();
      handleNotice("success", true, "編輯成功");
    } else {
      handleNotice("error", true, `編輯失敗。errorCode = ${reqInt}`);
    }
    setIsPending(false);
  };

  const deleteELabelInfo = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (!confirm) return;
    try {
      const reqInt = await apiDeleteELabel(editLabelData);
      if (reqInt === 0) {
        getELabelList();
        cleanEditELabelData();
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  const cleanEditELabelData = () => {
    setEditLabelData({
      LabelId: "",
      LabelSn: "",
      LabelCode: "",
      NfcRecord: "",
      StationCode: "",
      ArticleId: "",
      ArticleName: "",
    });
    setEditLabelMode(false);
  };

  const handleNewLabelMode = () => {
    setNewLabelMode(!newLabelMode);
    setEditLabelMode(false);
  };

  const handleEditLabeMode = (data: LabelItem, index: number) => {
    setEditLabelMode(true);
    setNewLabelMode(false);
    setEditLabelModeIndex(index);
    setEditLabelData({
      LabelId: data.LabelId,
      LabelSn: data.LabelSn,
      LabelCode: data.AimsSpec?.LabelCode || "",
      NfcRecord: data.AimsSpec?.NfcRecord || "",
      StationCode: data.AimsSpec?.StationCode || "",
      ArticleId: data.AimsSpec?.ArticleInfo.ArticleId || "",
      ArticleName: data.AimsSpec?.ArticleInfo.ArticleName || "",
    });
  };

  const postAsyncELabelInfoFromAims = async () => {
    setIsSyncing(true);
    const reqInt = await syncELabelDataFromAims();
    if (reqInt === 0) {
      handleNotice("success", true, "同步成功");
    } else {
      handleNotice("error", true, `同步失敗。errorCode = ${reqInt}`);
    }
    setIsSyncing(false);
  };

  const showBindToolData = (data: LabelItem) => {
    switch (data.BindStatus) {
      case "Unbinding":
        return "未綁定";
      case "Standby":
        return `已綁定 / ${data.LabelBind.ToolSn}`;
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchLabel = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const data = await apiGetELabelList();
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
    <div className="relative flex flex-col justify-center w-full md:flex-row">
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
              postNewLabelInfo={postNewLabelInfo}
              newLabelInfo={newLabelInfo}
              handleNewLabelInfo={handleNewLabelInfo}
              isPending={isPending}
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
                          <td>{item.AimsSpec?.LabelCode}</td>
                          <td>
                            <input
                              type="text"
                              className="text-center text-black rounded-md"
                              value={editLabelData.LabelSn}
                              onChange={(e) =>
                                setEditLabelData((prev) => ({
                                  ...prev,
                                  LabelSn: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="text-center text-black rounded-md"
                              value={editLabelData.StationCode}
                              onChange={(e) =>
                                setEditLabelData((prev) => ({
                                  ...prev,
                                  StationCode: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>{showBindToolData(item)}</td>
                          <td>-</td>
                          <td>
                            <SubmitButton
                              name="確認"
                              classNames="p-1 rounded-md hover:bg-indigo-600"
                              onclick={() => patchELabelInfo()}
                              isPending={isPending}
                            />
                            <span> / </span>
                            <button
                              className="p-1 hover:bg-red-500"
                              onClick={() => deleteELabelInfo()}
                            >
                              刪除
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.LabelId} className=" hover:bg-gray-600">
                          <td className="p-1 ">{item.AimsSpec?.LabelCode}</td>
                          <td className="p-1 ">{item.LabelSn}</td>
                          <td className="p-1 ">{item.AimsSpec?.StationCode}</td>
                          <td className="p-1 ">{showBindToolData(item)}</td>
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
              <SubmitButton
                name="同步AIMS電子標籤"
                classNames="p-1 bg-indigo-500 rounded-md hover:bg-indigo-600"
                onclick={() => postAsyncELabelInfoFromAims()}
                isPending={isSyncing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
