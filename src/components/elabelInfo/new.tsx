import { NewLabelItem } from "@/scripts/Apis/eLabelInfo/types";
import { FormEvent } from "react";
import SubmitButton from "../buttons";

interface Props {
  setNewLabelMode: (value: boolean) => void;
  postNewLabelInfo: (e: FormEvent) => void;
  newLabelInfo: NewLabelItem;
  handleNewLabelInfo: (key: string, value: string) => void;
  isPending: boolean;
}
export default function NewELabelInfo({
  setNewLabelMode,
  postNewLabelInfo,
  newLabelInfo,
  handleNewLabelInfo,
  isPending,
}: Props) {
  return (
    <div className="p-4 bg-gray-700 rounded-xl">
      <div className="relative ">
        <h3>新增電子標籤</h3>
        <button
          className="absolute top-0 right-0 p-1 rounded-full hover:bg-gray-900 "
          onClick={() => setNewLabelMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postNewLabelInfo(e)}>
        <div className="grid items-center grid-cols-7 gap-2 my-4">
          <div className="relative ">
            <label htmlFor="LabelBrandID" className="absolute left-0 -top-6 ">
              標籤品牌 ID
            </label>
            <input
              type="text"
              id="LabelBrandID"
              className="w-full p-2 text-black rounded-md "
              placeholder="LabelBrandID"
              value={newLabelInfo.LabelBrandId}
              onChange={(e) =>
                handleNewLabelInfo("LabelBrandId", e.target.value)
              }
            />
          </div>
          <div className="relative ">
            <label htmlFor="LabelSn" className="absolute left-0 -top-6 ">
              標籤 SN
            </label>
            <input
              type="text"
              id="LabelSn"
              placeholder="LabelSN"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.LabelSn}
              onChange={(e) => handleNewLabelInfo("LabelSn", e.target.value)}
            />
          </div>
          <div className="relative ">
            <label htmlFor="LabelCode" className="absolute left-0 -top-6 ">
              標籤號碼
            </label>
            <input
              type="text"
              id="LabelCode"
              placeholder="LabelCode"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.LabelCode}
              onChange={(e) => handleNewLabelInfo("LabelCode", e.target.value)}
            />
          </div>
          <div className="relative ">
            <label htmlFor="NfcRecord" className="absolute left-0 -top-6 ">
              NfcRecord
            </label>
            <input
              type="text"
              id="NfcRecord"
              placeholder="NfcRecord"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.NfcRecord}
              onChange={(e) => handleNewLabelInfo("NfcRecord", e.target.value)}
            />
          </div>

          <div className="relative ">
            <label htmlFor="StationCode" className="absolute left-0 -top-6 ">
              站號
            </label>
            <input
              type="text"
              id="StationCode"
              placeholder="StationCode"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.StationCode}
              onChange={(e) =>
                handleNewLabelInfo("StationCode", e.target.value)
              }
            />
          </div>

          <div className="relative ">
            <label htmlFor="ArticleID" className="absolute left-0 -top-6 ">
              ArticleID
            </label>
            <input
              type="text"
              id="ArticleID"
              placeholder="ArticleID"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.ArticleID}
              onChange={(e) => handleNewLabelInfo("ArticleID", e.target.value)}
            />
          </div>

          <div className="relative ">
            <label htmlFor="ArticleName" className="absolute left-0 -top-6 ">
              ArticleName
            </label>
            <input
              type="text"
              id="ArticleName"
              placeholder="ArticleName"
              className="w-full p-2 text-black rounded-md "
              value={newLabelInfo.ArticleName}
              onChange={(e) =>
                handleNewLabelInfo("ArticleName", e.target.value)
              }
            />
          </div>
        </div>
        <SubmitButton
          name="新增"
          classNames="w-full p-2 bg-indigo-500 rounded-md hover:bg-indigo-600"
          onclick={() => {}}
          isPending={isPending}
        />
      </form>
    </div>
  );
}
