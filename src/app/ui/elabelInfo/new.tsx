"use client";

import { apiNewELabel } from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { FormEvent, useState } from "react";

interface NewELabelInfoProps {
  getELabelList: () => void;
}

export default function NewELabelInfo({ getELabelList }: NewELabelInfoProps) {
  const [newLabelInfo, setNewLabelInfo] = useState({
    LabelBrandId: "",
    LabelSn: "",
    LabelCode: "",
    NfcRecord: "",
    StationCode: "",
    ArticleID: "",
    ArticleName: "",
  });

  const postNewLabelInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewELabel(newLabelInfo);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      getELabelList();
      cleanNewLabelInfo();
    }
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

  return (
    <div>
      <h3>新增電子標籤</h3>
      <form
        action=""
        className="max-w-md p-2 mx-auto"
        onSubmit={(e) => postNewLabelInfo(e)}
      >
        <div className="my-4">
          <label htmlFor="LabelBrandID" className="block text-left">
            LabelBrandID
          </label>
          <input
            type="text"
            id="LabelBrandID"
            className="w-full p-2 text-black rounded-md "
            value={newLabelInfo.LabelBrandId}
            onChange={(e) => handleNewLabelInfo("LabelBrandId", e.target.value)}
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
            value={newLabelInfo.LabelSn}
            onChange={(e) => handleNewLabelInfo("LabelSn", e.target.value)}
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
            value={newLabelInfo.LabelCode}
            onChange={(e) => handleNewLabelInfo("LabelCode", e.target.value)}
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
            value={newLabelInfo.NfcRecord}
            onChange={(e) => handleNewLabelInfo("NfcRecord", e.target.value)}
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
            value={newLabelInfo.StationCode}
            onChange={(e) => handleNewLabelInfo("StationCode", e.target.value)}
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
            value={newLabelInfo.ArticleID}
            onChange={(e) => handleNewLabelInfo("ArticleID", e.target.value)}
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
            value={newLabelInfo.ArticleName}
            onChange={(e) => handleNewLabelInfo("ArticleName", e.target.value)}
          />
        </div>
        <button className="w-full p-2 bg-gray-600 rounded-md hover:bg-gray-500">
          新增
        </button>
      </form>
    </div>
  );
}
