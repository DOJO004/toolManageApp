"use client";

import ProductLineIndex from "@/components/machineInfo/productLine";
import NewProductLine from "@/components/machineInfo/productLine/new";
import {
  DeleteProductLineResponse,
  EditProductLineItem,
  GetProductLineListResponse,
  NewProductLineItem,
  PatchProductLineResponse,
  PostProductLineResponse,
  ProductLineItem,
} from "@/components/machineInfo/productLine/types";
import {
  DepartmentItem,
  DepartmentList,
} from "@/components/userInfo/department/type";
import {
  apiDeleteProductLineType,
  apiEditProductLineType,
  apiGetProductLineTypeList,
  apiNewProductLineType,
} from "@/scripts/Apis/productLineType/productLineType";
import { ApiGetDepartmentList } from "@/scripts/Apis/userInfo/departmentApi";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const [newProductLineMode, setNewProductLineMode] = useState(false);
  const [editProductLineMode, setEditProductLineMode] = useState(false);
  const [editProductLineIndex, setEditProductLineIndex] = useState(-1);
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);
  const [newProductLine, setNewProductLine] = useState<NewProductLineItem>({
    Id: "",
    Name: "",
    DepartmentId: "",
  });
  const [editProductLine, setEditProductLine] = useState<EditProductLineItem>({
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

  const postProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewProductLineType(newProductLine);
    const res = data as PostProductLineResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log("post product line", res);
    if (reqInt === 0) {
      getProductLineList();
      cleanProductLine();
    } else {
      log(reqInt);
    }
  };

  const cleanProductLine = () => {
    setNewProductLine({
      Id: "",
      Name: "",
      DepartmentId: "",
    });
  };

  const handleNewProductLine = (key: string, value: string) => {
    setNewProductLine((prev) => ({ ...prev, [key]: value }));
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
            postProductLine={postProductLine}
            newProductLine={newProductLine}
            handleNewProductLine={handleNewProductLine}
          />
        </div>
        <div className="w-full mt-2 overflow-auto bg-gray-900 rounded-md">
          <ProductLineIndex
            productLineList={productLineList}
            editProductLineMode={editProductLineMode}
            editProductLineIndex={editProductLineIndex}
            editProductLine={editProductLine}
            handelSetEditData={handelSetEditData}
            departmentList={departmentList}
            patchProductLine={patchProductLine}
            deleteProductLine={deleteProductLine}
            handleClickEditProductLine={handleClickEditProductLine}
          />
        </div>
      </div>
    </div>
  );
}
