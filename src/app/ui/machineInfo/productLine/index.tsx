import React from "react";
import Link from "next/link";
import { AddBtn } from "../../buttons";

interface ProductLineItem {
  ProductLineID: string;
  ProductLineName: string;
}

interface ProductLineIndexProps {
  productLineList: ProductLineItem[];
  changeNewMode: () => void;
  changeEditMode: (index: number) => void;
  fetchGetProductLineList: (index: number) => void;
}
const ProductLineIndex = ({
  productLineList,
  changeNewMode,
  changeEditMode,
  fetchGetProductLineList,
}: ProductLineIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center">
      <p className="">產線類型</p>
      <hr className="my-4" />
      <div className="w-full mt-2 overflow-auto rounded-t-md">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 text-black whitespace-nowrap">產線ID</th>
              <th className="p-1 text-black whitespace-nowrap">產線名稱</th>
              <th className="p-1 text-black whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {productLineList.map((item, index) => (
              <tr key={item.ProductLineID} className=" even:bg-gray-700">
                <td className="p-1 whitespace-nowrap">{item.ProductLineID}</td>
                <td className="p-1 whitespace-nowrap">
                  {item.ProductLineName}
                </td>
                <td
                  className="p-1 cursor-pointer whitespace-nowrap"
                  onClick={() => {
                    changeEditMode(index), fetchGetProductLineList(index);
                  }}
                >
                  編輯
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-3 gap-2 bg-gray-800 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-2"></div>
      {productLineList.length < 1 ? (
        <p className="mt-6 text-xl text-center">沒有資料</p>
      ) : (
        ""
      )}
      <div className="absolute top-2 right-2">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};
export default ProductLineIndex;
