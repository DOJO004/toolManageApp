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
interface ElabelInfoNewProps {
  elabelInfo: ElabelInfoItem;
  setElabelInfo: React.Dispatch<React.SetStateAction<ElabelInfoItem>>;
  changeNewMode: () => void;
  fetchNewElabelInfo: (e: FormEvent) => void;
}

const ElabelInfoNew = ({
  elabelInfo,
  setElabelInfo,
  changeNewMode,
  fetchNewElabelInfo,
}: ElabelInfoNewProps) => {
  return (
    <div className="relative ">
      <form
        className="w-full p-2 mx-auto mb-2 text-center bg-gray-900 md:w-fit rounded-xl"
        onSubmit={(e) => fetchNewElabelInfo(e)}
      >
        <p className="text-xl text-center ">新增電子標籤</p>
        <label htmlFor="LabelCode">標籤號碼</label>
        <input
          id="LabelCode"
          type="text"
          value={elabelInfo.LabelCode}
          onChange={(e) =>
            setElabelInfo({ ...elabelInfo, LabelCode: e.target.value })
          }
          placeholder="標籤號碼"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="eLabelSN">標籤SN</label>
        <input
          id="eLabelSN"
          type="text"
          value={elabelInfo.eLabelSN}
          onChange={(e) =>
            setElabelInfo({ ...elabelInfo, eLabelSN: e.target.value })
          }
          placeholder="標籤SN"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="StationCode">站號</label>
        <input
          id="StationCode"
          type="text"
          value={elabelInfo.eLabelSpec.StationCode}
          onChange={(e) =>
            setElabelInfo({
              ...elabelInfo,
              eLabelSpec: {
                ...elabelInfo.eLabelSpec,
                StationCode: e.target.value,
              },
            })
          }
          placeholder="站號"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="ArticleID">ID</label>
        <input
          id="ArticleID"
          type="text"
          value={elabelInfo.eLabelSpec.ArticleID}
          onChange={(e) =>
            setElabelInfo({
              ...elabelInfo,
              eLabelSpec: {
                ...elabelInfo.eLabelSpec,
                ArticleID: e.target.value,
              },
            })
          }
          placeholder="ID"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="ArticleName">名稱</label>
        <input
          id="ArticleName"
          type="text"
          value={elabelInfo.eLabelSpec.ArticleName}
          onChange={(e) =>
            setElabelInfo({
              ...elabelInfo,
              eLabelSpec: {
                ...elabelInfo.eLabelSpec,
                ArticleName: e.target.value,
              },
            })
          }
          placeholder="名稱"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <button className="p-2 my-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ElabelInfoNew;
