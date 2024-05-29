"use client";

import {
  apiDeleteELabel,
  apiEditELabel,
} from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { FormEvent } from "react";
import { DeleteELabelInfoResponse, PatchELabelInfoResponse } from "./types";

interface editLabelDataItem {
  LabelBrandId: string;
  BindStatus: string;
  LToolCode: number;
  ToolSn: string;
  LastModify: string;
  LabelId: string;
  LabelSn: string;
  Brand: string;
  LabelCode: string;
  NfcRecord: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
}
interface EditELabelInfoProps {
  editLabelData: editLabelDataItem;
  setEditLabelData: React.Dispatch<React.SetStateAction<editLabelDataItem>>;
  getELabelList: () => void;
  setEditLabelMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditELabelInfo({
  editLabelData,
  setEditLabelData,
  getELabelList,
  setEditLabelMode,
}: EditELabelInfoProps) {
  const handleEditLabelInfo = (key: string, value: string) => {
    setEditLabelData((prev) => ({ ...prev, [key]: value }));
  };
  const patchELabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiEditELabel(editLabelData);
    const res = data as PatchELabelInfoResponse;
  };

  const deleteELabelInfo = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const data = await apiDeleteELabel(editLabelData);
      const res = data as DeleteELabelInfoResponse;
      if (res?.data?.Values?.ReqInt === 0) {
        getELabelList();
        setEditLabelMode(false);
      }
    }
  };
  return (
    <div className="p-4 bg-gray-700 rounded-xl">
      <div className="relative">
        <button
          className="absolute top-0 left-0 p-2 border rounded-md hover:bg-gray-500 "
          onClick={() => deleteELabelInfo()}
        >
          刪除
        </button>{" "}
        <button
          className="absolute top-0 right-0 "
          onClick={() => setEditLabelMode(false)}
        >
          X
        </button>
        <h3>編輯電子標籤</h3>
      </div>

      <form
        action=""
        className="max-w-md p-2 mx-auto"
        onSubmit={(e) => patchELabelInfo(e)}
      >
        <div className="my-4">
          <label htmlFor="LabelBrandID" className="block text-left">
            LabelBrandID
          </label>
          <input
            type="text"
            id="LabelBrandID"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.LabelBrandId}
            onChange={(e) =>
              handleEditLabelInfo("LabelBrandId", e.target.value)
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="LabelSn" className="block text-left">
            LabelSN
          </label>
          <input
            type="text"
            id="LabelSn"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.LabelSn}
            onChange={(e) => handleEditLabelInfo("LabelSn", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="LabelCode" className="block text-left">
            LabelCode
          </label>
          <input
            type="text"
            id="LabelCode"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.LabelCode}
            onChange={(e) => handleEditLabelInfo("LabelCode", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="NfcRecord" className="block text-left">
            NfcRecord
          </label>
          <input
            type="text"
            id="NfcRecord"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.NfcRecord}
            onChange={(e) => handleEditLabelInfo("NfcRecord", e.target.value)}
          />
        </div>

        <div className="my-4">
          <label htmlFor="StationCode" className="block text-left">
            StationCode
          </label>
          <input
            type="text"
            id="StationCode"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.StationCode}
            onChange={(e) => handleEditLabelInfo("StationCode", e.target.value)}
          />
        </div>

        <div className="my-4">
          <label htmlFor="ArticleID" className="block text-left">
            ArticleID
          </label>
          <input
            type="text"
            id="ArticleID"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.ArticleID}
            onChange={(e) => handleEditLabelInfo("ArticleID", e.target.value)}
          />
        </div>

        <div className="my-4">
          <label htmlFor="ArticleName" className="block text-left">
            ArticleName
          </label>
          <input
            type="text"
            id="ArticleName"
            className="w-full p-2 text-black rounded-md "
            value={editLabelData.ArticleName}
            onChange={(e) => handleEditLabelInfo("ArticleName", e.target.value)}
          />
        </div>
        <button className="w-full p-2 bg-gray-600 rounded-md hover:bg-gray-500">
          編輯
        </button>
      </form>
    </div>
  );
}
