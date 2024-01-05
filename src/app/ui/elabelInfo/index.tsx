import React from "react";
import { AddBtn } from "../buttons";

interface ElabelListItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
  LastModify: string;
}

interface ElabelInfoIndexProps {
  elabelList: ElabelListItem[];
  changeNewMode: () => void;
  changeEditMode: () => void;
  fetchGetElabelInfoByLabelCode: (labelCode: string, labelSN: string) => void;
}
const ElabelInfoIndex = ({
  elabelList,
  changeNewMode,
  changeEditMode,
  fetchGetElabelInfoByLabelCode,
}: ElabelInfoIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 rounded-xl">
      <p className="my-2 text-xl">電子標籤列表</p>
      <div className="grid grid-cols-7 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">LabelCode</div>
        <div className="truncate ">eLabelSN</div>
        <div className="truncate ">StationCode</div>
        <div className="truncate ">ArticleID</div>
        <div className="truncate ">ArticleName</div>
        <div className="truncate ">LastModify</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-7 gap-2 ">
        {elabelList.map((item, index) => (
          <React.Fragment key={item.LabelCode}>
            <div className="truncate ">{item.LabelCode}</div>
            <div className="truncate ">{item.eLabelSN}</div>
            <div className="truncate ">{item.StationCode}</div>
            <div className="truncate ">{item.ArticleID}</div>
            <div className="truncate ">{item.ArticleName}</div>
            <div className="truncate ">{item.LastModify}</div>
            <button
              className="truncate "
              onClick={() => {
                changeEditMode(),
                  fetchGetElabelInfoByLabelCode(item.LabelCode, item.eLabelSN);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-3 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ElabelInfoIndex;
