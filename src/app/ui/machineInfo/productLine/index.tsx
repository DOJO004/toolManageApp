"use client";

import { apiGetProductLineTypeList } from "@/scripts/Apis/productLineType/productLineType";
import { useEffect, useState } from "react";
import EditProductLine from "./edit";
import NewProductLine from "./new";

const ProductLineIndex = () => {
  const [newProductListMode, setNewProductLineMode] = useState(false);
  const [editProductListMode, setEditProductLineMode] = useState(false);
  const [productLineList, setProductLineList] = useState([]);

  const [editProductLine, setEditProductLine] = useState({
    Id: "",
    Name: "",
  });

  const getProductLineList = async () => {
    const res: any = await apiGetProductLineTypeList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
  };

  const handleClickNewProductLine = () => {
    setEditProductLineMode(false);
    setNewProductLineMode(!newProductListMode);
  };

  const handleClickEditProductLine = (data: any) => {
    setEditProductLineMode(true);
    setNewProductLineMode(false);
    setEditProductLine(data);
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
        <div className="w-full mt-2 overflow-auto bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">產線ID</th>
                <th className="p-1 whitespace-nowrap">產線名稱</th>
              </tr>
            </thead>
            <tbody>
              {productLineList.map((item: any) => (
                <tr
                  key={item.Id}
                  className="cursor-pointer hover:bg-gray-600"
                  onClick={() => handleClickEditProductLine(item)}
                >
                  <td className="p-1 whitespace-nowrap">{item.Id}</td>
                  <td className="p-1 whitespace-nowrap">{item.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* new */}
      <div
        className={` overflow-hidden transition-all duration-300 easy-in-out ${
          newProductListMode ? "w-1/2" : "w-0"
        }`}
      >
        <NewProductLine
          getProductLineList={getProductLineList}
          setNewProductLineMode={setNewProductLineMode}
        />
      </div>

      {/* edit */}
      <div
        className={` overflow-hidden transition-all duration-300 easy-in-out ${
          editProductListMode ? "w-1/2" : "w-0"
        }`}
      >
        <EditProductLine
          editProductLine={editProductLine}
          setEditProductLine={setEditProductLine}
          getProductLineList={getProductLineList}
          setEditProductLineMode={setEditProductLineMode}
        />
      </div>
    </div>
  );
};
export default ProductLineIndex;
