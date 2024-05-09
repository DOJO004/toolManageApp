"use client";

import {
  apiDeleteProductLineType,
  apiEditProductLineType,
  apiGetProductLineTypeList,
} from "@/scripts/Apis/productLineType/productLineType";
import { ApiGetDepartmentList } from "@/scripts/Apis/userInfo/departmentApi";
import { useEffect, useState } from "react";
import { DepartmentItem, DepartmentList } from "../../userInfo/department/type";
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
    DepartmentId: "",
  });
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);

  const getProductLineList = async () => {
    const data = await apiGetProductLineTypeList();
    const res = data as GetProductLineListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
      return res.data.Values.ProductLineList;
    }
  };

  const getDepartmentList = async () => {
    const data = await ApiGetDepartmentList();
    const res = data as DepartmentList;
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setDepartmentList(res.data.Values.DepartmentMenus);
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

  let timer: ReturnType<typeof setTimeout>;
  const searchProductLine = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const productLineList = await getProductLineList();
      if (productLineList) {
        const filterData = productLineList.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.Id.toLowerCase().includes(value.toLowerCase())
          );
        });
        setProductLineList(filterData);
      }
    }, 500);
  };

  const handleClickNewProductLine = () => {
    setEditProductLineMode(false);
    setNewProductLineMode(!newProductLineMode);
  };

  const handleClickEditProductLine = (data: ProductLineItem, index: number) => {
    setEditProductLineMode(true);
    setNewProductLineMode(false);
    setEditProductLine({
      Id: data.Id,
      Name: data.Name,
      DepartmentId: data.Department.Id,
    });
    setEditProductLineIndex(index);
  };

  const handelSetEditData = (name: string, value: string) => {
    setEditProductLine((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getProductLineList();
    getDepartmentList();
  }, []);
  return (
    <div className="relative flex w-full p-4 text-center">
      <div className="w-full mx-4">
        <div className="relative my-4 ">
          <button
            className="absolute top-0 right-0 p-2 border hover:bg-gray-700"
            onClick={() => handleClickNewProductLine()}
          >
            新增
          </button>
          <h2 className="my-4-">產線類型</h2>
          <input
            type="search"
            placeholder="搜尋 ID / 名稱"
            className="p-2 text-black rounded-md w-96"
            onChange={(e) => searchProductLine(e.target.value)}
          />
        </div>
        {/* new */}
        <div
          className={` overflow-hidden transition-all duration-300 easy-in-out ${
            newProductLineMode ? "h-52" : "h-0"
          }`}
        >
          <NewProductLine
            getProductLineList={getProductLineList}
            setNewProductLineMode={setNewProductLineMode}
            departmentList={departmentList}
          />
        </div>
        <div className="w-full mt-2 overflow-auto bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">產線ID</th>
                <th className="p-1 whitespace-nowrap">產線名稱</th>
                <th className="p-1 whitespace-nowrap">負責部門</th>
                <th className="p-1 whitespace-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              {productLineList.length > 0 ? (
                productLineList.map((item, index) =>
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
                        <input
                          type="text"
                          list="editDepartmentList"
                          className="p-1 text-center text-black rounded-md"
                          value={editProductLine.DepartmentId}
                          onChange={(e) =>
                            handelSetEditData("DepartmentId", e.target.value)
                          }
                        />
                        <datalist id="editDepartmentList">
                          {departmentList.map((item) => (
                            <option key={item.Id} value={item.Id}></option>
                          ))}
                        </datalist>
                      </td>
                      <td>
                        <button
                          className="p-1 bg-green-500 hover:bg-green-600"
                          onClick={() => patchProductLine()}
                        >
                          送出
                        </button>
                        <span> / </span>
                        <button
                          className="p-1 bg-red-500 hover:bg-red-600"
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
                        {item.Department.Name}
                      </td>

                      <td className="p-1 whitespace-nowrap">
                        <button
                          className="p-1 cursor-pointer hover:bg-indigo-600"
                          onClick={() =>
                            handleClickEditProductLine(item, index)
                          }
                        >
                          編輯
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={4}>no data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProductLineIndex;
