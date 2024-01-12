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
    <div className="relative p-2 mx-2 text-center bg-gray-900 rounded-xl md:min-w-96">
      <p className="text-xl">產線類型</p>
      <div className="grid grid-cols-3 gap-2 bg-gray-800 rounded-xl">
        <div className="truncate ">產線ID</div>
        <div className="truncate ">產線名稱</div>
        <div className="truncate ">編輯</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {productLineList.map((item, index) => (
          <React.Fragment key={item.ProductLineID}>
            <div className="truncate">{item.ProductLineID}</div>
            <div className="truncate">{item.ProductLineName}</div>
            <button
              className="truncate"
              onClick={() => {
                changeEditMode(index), fetchGetProductLineList(index);
              }}
            >
              編輯
            </button>
          </React.Fragment>
        ))}
      </div>
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
