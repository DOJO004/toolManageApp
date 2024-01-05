import React from "react";
import Link from "next/link";
import { AddBtn } from "../../buttons";
import DeleteBtn from "../../deleteBtn";

interface ProductLineItem {
  ProductLineID: string;
  ProductLineName: string;
}

interface ProductLineIndexProps {
  productLineList: ProductLineItem[];
}
const ProductLineIndex = ({ productLineList }: ProductLineIndexProps) => {
  return (
    <div className="relative w-full p-2 text-center bg-gray-900 rounded-xl md:min-w-96">
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
            <div className="truncate">
              <Link
                href={`/tool-manager/machine-info/product-line/${index}/edit`}
              >
                編輯
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
      <button className="absolute top-3 right-2">
        <AddBtn link={"/tool-manager/machine-info/product-line/new"} />
      </button>
    </div>
  );
};
export default ProductLineIndex;
