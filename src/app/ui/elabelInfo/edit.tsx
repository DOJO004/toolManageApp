import { FormEvent } from "react";
import { CloseBtn } from "../buttons";

interface ElabelInfoItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
  LastModify: string;
}

interface ElabelInfoEditProps {
  editElabelInfo: ElabelInfoItem;
  setEditElabelInfo: React.Dispatch<React.SetStateAction<ElabelInfoItem>>;
  fetchEditElabelInfo: (e: FormEvent) => void;
  changeEditMode: () => void;
}

const ElabelInfoEdit = ({
  editElabelInfo,
  setEditElabelInfo,
  fetchEditElabelInfo,
  changeEditMode,
}: ElabelInfoEditProps) => {
  return (
    <div className="relative ">
      <form
        className="w-full p-2 mx-auto mb-2 text-center bg-gray-900 border md:w-fit rounded-xl"
        onSubmit={(e) => fetchEditElabelInfo(e)}
      >
        <p className="my-2 text-xl text-center ">編輯電子標籤</p>
        <hr className="my-2" />
        <label htmlFor="LabelCode">標籤號碼</label>
        <input
          id="LabelCode"
          type="text"
          value={editElabelInfo.LabelCode}
          onChange={(e) =>
            setEditElabelInfo({ ...editElabelInfo, LabelCode: e.target.value })
          }
          placeholder="標籤號碼"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
          disabled
        />
        <label htmlFor="eLabelSN">標籤SN</label>
        <input
          id="eLabelSN"
          type="text"
          value={editElabelInfo.eLabelSN}
          onChange={(e) =>
            setEditElabelInfo({ ...editElabelInfo, eLabelSN: e.target.value })
          }
          placeholder="標籤SN"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
        />
        <label htmlFor="StationCode">站號</label>
        <input
          id="StationCode"
          type="text"
          value={editElabelInfo.StationCode}
          onChange={(e) =>
            setEditElabelInfo({
              ...editElabelInfo,
              StationCode: e.target.value,
            })
          }
          placeholder="站號"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
          disabled
        />
        <label htmlFor="ArticleID">ID</label>
        <input
          id="ArticleID"
          type="text"
          value={editElabelInfo.ArticleID}
          onChange={(e) =>
            setEditElabelInfo({
              ...editElabelInfo,
              ArticleID: e.target.value,
            })
          }
          placeholder="ID"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
          disabled
        />
        <label htmlFor="ArticleName">名稱</label>
        <input
          id="ArticleName"
          type="text"
          value={editElabelInfo.ArticleName}
          onChange={(e) =>
            setEditElabelInfo({
              ...editElabelInfo,
              ArticleName: e.target.value,
            })
          }
          placeholder="名稱"
          className="block pl-2 mx-auto mb-2 text-black rounded-md min-h-10 min-w-72"
          disabled
        />
        <button className="p-2 my-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeEditMode} />
      </div>
    </div>
  );
};

export default ElabelInfoEdit;
