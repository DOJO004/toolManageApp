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
      <table className="w-full ">
        <thead>
          <tr className="p-1 bg-gray-800">
            <td className="p-1 truncate">LabelCode</td>
            <td className="p-1 truncate">eLabelSN</td>
            <td className="p-1 truncate">StationCode</td>
            <td className="p-1 truncate">ArticleID</td>
            <td className="p-1 truncate">ArticleName</td>
            <td className="p-1 truncate">LastModify</td>
            <td className="p-1 truncate">編輯</td>
          </tr>
        </thead>
        <tbody>
          {elabelList.map((item, index) => (
            <tr key={item.LabelCode}>
              <td className="p-1 truncate">{item.LabelCode}</td>
              <td className="p-1 truncate">{item.eLabelSN}</td>
              <td className="p-1 truncate">{item.StationCode}</td>
              <td className="p-1 truncate">{item.ArticleID}</td>
              <td className="p-1 truncate">{item.ArticleName}</td>
              <td className="p-1 truncate">{item.LastModify}</td>
              <td className="p-1 truncate">
                <button
                  onClick={() => {
                    changeEditMode(),
                      fetchGetElabelInfoByLabelCode(
                        item.LabelCode,
                        item.eLabelSN
                      );
                  }}
                >
                  編輯
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute top-3 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default ElabelInfoIndex;
