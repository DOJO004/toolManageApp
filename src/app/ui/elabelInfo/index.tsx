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
    <div className="relative w-full max-h-full p-2 overflow-auto text-center bg-gray-900 rounded-xl">
      <p className="my-2 text-xl">電子標籤列表</p>
      <div className="mt-2 overflow-hidden rounded-t-xl">
        <table className="w-full ">
          <thead>
            <tr className="p-1 bg-indigo-300">
              <td className="p-1 text-black">LabelCode</td>
              <td className="p-1 text-black">eLabelSN</td>
              <td className="p-1 text-black">StationCode</td>
              <td className="p-1 text-black">ArticleID</td>
              <td className="p-1 text-black">ArticleName</td>
              <td className="p-1 text-black">LastModify</td>
              <td className="p-1 text-black">編輯</td>
            </tr>
          </thead>
          <tbody>
            {eLabelList.map((item, index) => (
              <tr
                key={item.LabelCode}
                className=" even:bg-gray-700 hover:bg-indigo-500"
              >
                <td className="p-1 ">{item.LabelCode}</td>
                <td className="p-1 ">{item.eLabelSN}</td>
                <td className="p-1 ">{item.StationCode}</td>
                <td className="p-1 ">{item.ArticleID}</td>
                <td className="p-1 ">{item.ArticleName}</td>
                <td className="p-1 ">{item.LastModify}</td>
                <td className="p-1 ">
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
