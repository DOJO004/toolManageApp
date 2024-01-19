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
    <div className="relative w-full max-h-full p-2 overflow-auto text-center ">
      <p className="my-2 ">電子標籤列表</p>
      <hr className="my-4" />
      <div className="mt-2 overflow-auto rounded-t-xl">
        <table className="w-full ">
          <thead>
            <tr className="p-1 bg-indigo-500">
              <td className="p-1 text-black whitespace-nowrap">LabelCode</td>
              <td className="p-1 text-black whitespace-nowrap">eLabelSN</td>
              <td className="p-1 text-black whitespace-nowrap">StationCode</td>
              <td className="p-1 text-black whitespace-nowrap">ArticleID</td>
              <td className="p-1 text-black whitespace-nowrap">ArticleName</td>
              <td className="p-1 text-black whitespace-nowrap">LastModify</td>
              <td className="p-1 text-black whitespace-nowrap">編輯</td>
            </tr>
          </thead>
          <tbody>
            {eLabelList.map((item, index) => (
              <tr
                key={item.LabelCode}
                className=" even:bg-gray-700 hover:bg-indigo-500"
              >
                <td className="p-1 whitespace-nowrap">{item.LabelCode}</td>
                <td className="p-1 whitespace-nowrap">{item.eLabelSN}</td>
                <td className="p-1 whitespace-nowrap">{item.StationCode}</td>
                <td className="p-1 whitespace-nowrap">{item.ArticleID}</td>
                <td className="p-1 whitespace-nowrap">{item.ArticleName}</td>
                <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                <td className="p-1 whitespace-nowrap">
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
      </div>
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
