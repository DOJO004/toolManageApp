import React from "react";
import { AddBtn } from "../buttons";

interface ELabelListItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  ArticleID: string;
  ArticleName: string;
  LastModify: string;
}

interface ElabelInfoIndexProps {
  eLabelList: ELabelListItem[];
  changeNewMode: () => void;
  changeEditMode: () => void;
  fetchSyncAimsData: () => void;
  fetchGetElabelInfoByLabelCode: (labelCode: string, labelSN: string) => void;
}
const ElabelInfoIndex = ({
  eLabelList,
  changeNewMode,
  changeEditMode,
  fetchGetElabelInfoByLabelCode,
  fetchSyncAimsData,
}: ElabelInfoIndexProps) => {
  return (
    <div className="relative w-full p-2 overflow-auto text-center bg-gray-900 rounded-xl">
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
          {eLabelList.map((item, index) => (
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
      <div className="mt-4">
        <button
          className="p-1 text-white bg-gray-500 rounded-md hover:bg-gray-600 "
          onClick={() => fetchSyncAimsData()}
        >
          同步AIMS電子標籤
        </button>
      </div>
    </div>
  );
};

export default ElabelInfoIndex;
