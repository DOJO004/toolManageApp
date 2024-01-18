import React, { FormEvent } from "react";
import { CloseBtn } from "../buttons";
interface ElabelInfoItem {
  LabelCode: string;
  eLabelSN: string;
  eLabelSpec: {
    StationCode: string;
    ArticleID: string;
    ArticleName: string;
  };
}

interface StationCodeItem {
  APsCode: string;
}

interface ELabelListItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
  LastModify: string;
}

interface ElabelInfoNewProps {
  selectArticleIDIndex: number;
  eLabelList: ELabelListItem[];
  stationCode: StationCodeItem[];
  newElabelInfo: ElabelInfoItem;
  setNewElabelInfo: React.Dispatch<React.SetStateAction<ElabelInfoItem>>;
  changeNewMode: () => void;
  fetchNewElabelInfo: (e: FormEvent) => void;
}

const ElabelInfoNew = ({
  selectArticleIDIndex,
  eLabelList,
  stationCode,
  newElabelInfo,
  setNewElabelInfo,
  changeNewMode,
  fetchNewElabelInfo,
}: ElabelInfoNewProps) => {
  console.log("new aps code ", stationCode);

  return (
    <div className="relative w-fit">
      <form
        className="w-full p-2 mx-auto mb-2 text-center bg-gray-900 border-2 md:w-fit rounded-xl"
        onSubmit={(e) => fetchNewElabelInfo(e)}
      >
        <p className="text-xl text-center ">新增電子標籤</p>
        <label htmlFor="LabelCode">標籤號碼</label>
        <input
          id="LabelCode"
          type="text"
          value={newElabelInfo.LabelCode}
          onChange={(e) =>
            setNewElabelInfo({ ...newElabelInfo, LabelCode: e.target.value })
          }
          placeholder="標籤號碼"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="eLabelSN">標籤SN</label>
        <input
          id="eLabelSN"
          type="text"
          value={newElabelInfo.eLabelSN}
          onChange={(e) =>
            setNewElabelInfo({ ...newElabelInfo, eLabelSN: e.target.value })
          }
          placeholder="標籤SN"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="StationCode">站號</label>
        <select
          defaultValue=""
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        >
          <option value="" className="text-black" disabled>
            請選擇站號
          </option>
          {stationCode.map((item, index) => (
            <option value={item.APsCode} key={index} className="text-black ">
              {item.APsCode}
            </option>
          ))}
        </select>

        <label htmlFor="ArticleID">ID</label>
        <select
          defaultValue=""
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        >
          <option value="" className="text-gray-500" disabled>
            請選擇 ArticleID
          </option>
          {eLabelList.map((item, index) => (
            <option value={item.ArticleID} key={index} className="text-black ">
              {item.ArticleID}
            </option>
          ))}
        </select>

        <label htmlFor="ArticleName">名稱</label>
        <input
          id="ArticleName"
          type="text"
          onChange={(e) =>
            setNewElabelInfo({
              ...newElabelInfo,
              eLabelSpec: {
                ...newElabelInfo.eLabelSpec,
                ArticleName: e.target.value,
              },
            })
          }
          placeholder="名稱"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
          readOnly
        />
        <button className="p-2 my-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-2 right-3 ">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ElabelInfoNew;
