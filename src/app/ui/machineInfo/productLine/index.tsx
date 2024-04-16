"use client";

import {
  apiDeleteProductLineType,
  apiEditProductLineType,
  apiGetProductLineTypeList,
} from "@/scripts/Apis/productLineType/productLineType";
import { useEffect, useState } from "react";
import NewProductLine from "./new";
import {
  DeleteProductLineResponse,
  GetProductLineListResponse,
  PatchProductLineResponse,
  ProductLineItem,
} from "./types";

const ProductLineIndex = () => {
  const [newProductLineMode, setNewProductLineMode] = useState(false);
  const [editProductLineMode, setEditProductLineMode] = useState(false);
  const [editProductLineIndex, setEditProductLineIndex] = useState(-1);
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);

  const [editProductLine, setEditProductLine] = useState({
    Id: "",
    Name: "",
  });

  const getProductLineList = async () => {
    const data = await apiGetProductLineTypeList();
    const res = data as GetProductLineListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const patchProductLine = async () => {
    const data = await apiEditProductLineType(editProductLine);
    const res = data as PatchProductLineResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      getProductLineList();
      setEditProductLineMode(false);
    }
  };

  const deleteProductLine = async () => {
    const confirm = window.confirm(`確定刪除 ${editProductLine.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteProductLineType(editProductLine);
      const res = data as DeleteProductLineResponse;
      if (res?.data?.Values?.ReqInt === 0) {
        getProductLineList();
        setEditProductLineMode(false);
      }
    }
  };

  const handleClickNewProductLine = () => {
    setEditProductLineMode(false);
    setNewProductLineMode(!newProductLineMode);
  };

  const handleClickEditProductLine = (data: ProductLineItem, index: number) => {
    setEditProductLineMode(true);
    setNewProductLineMode(false);
    setEditProductLine(data);
    setEditProductLineIndex(index);
  };

  const handelSetEditData = (name: string, value: string) => {
    setEditProductLine((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getProductLineList();
  }, []);
  return (
    <div className="relative flex w-full p-4 text-center">
      <div className="w-full mx-4">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-2 border hover:bg-gray-700"
            onClick={() => handleClickNewProductLine()}
          >
            新增
          </button>
          <h2 className="my-4-">產線類型</h2>
        </div>
        {/* new */}
        <div
          className={` overflow-hidden transition-all duration-300 easy-in-out ${
            newProductLineMode ? "h-40" : "h-0"
          }`}
        >
          <NewProductLine
            getProductLineList={getProductLineList}
            setNewProductLineMode={setNewProductLineMode}
          />
        </div>
        <div className="w-full mt-2 overflow-auto bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">產線ID</th>
                <th className="p-1 whitespace-nowrap">產線名稱</th>
                <th className="p-1 whitespace-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              {productLineList.map((item, index) =>
                // edit
                editProductLineMode && editProductLineIndex === index ? (
                  <tr key={item.Id}>
                    <td>{editProductLine.Id}</td>
                    <td>
                      <input
                        type="text"
                        value={editProductLine.Name}
                        className="p-1 text-center text-black rounded-md"
                        autoFocus
                        onChange={(e) =>
                          handelSetEditData("Name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="p-1 cursor-pointer hover:bg-gray-900"
                        onClick={() => patchProductLine()}
                      >
                        送出
                      </button>
                      <span> / </span>
                      <button
                        className="p-1 bg-red-500 hover:bg-red-900"
                        onClick={() => deleteProductLine()}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ) : (
                  // index
                  <tr key={item.Id} className=" hover:bg-gray-600">
                    <td className="p-1 whitespace-nowrap">{item.Id}</td>
                    <td className="p-1 whitespace-nowrap">{item.Name}</td>
                    <td className="p-1 whitespace-nowrap">
                      <button
                        className="p-1 cursor-pointer hover:bg-gray-900"
                        onClick={() => handleClickEditProductLine(item, index)}
                      >
                        編輯
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductLineIndex;
