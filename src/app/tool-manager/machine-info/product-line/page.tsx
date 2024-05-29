"use client";

import ProductLineIndex from "@/components/machineInfo/productLine";
import NewProductLine from "@/components/machineInfo/productLine/new";
import {
  DepartmentItem,
  DepartmentList,
} from "@/components/userInfo/department/type";
import {
  apiDeleteProductLineType,
  apiEditProductLineType,
  apiGetProductLineTypeList,
  apiNewProductLineType,
} from "@/scripts/Apis/machineInfo/machineInfo";
import {
  EditProductLineItem,
  NewProductLineItem,
  ProductLineItem,
} from "@/scripts/Apis/machineInfo/types";
import { ApiGetDepartmentList } from "@/scripts/Apis/userInfo/departmentApi";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [newProductLineMode, setNewProductLineMode] = useState(false);
  const [editProductLineMode, setEditProductLineMode] = useState(false);
  const [editProductLineIndex, setEditProductLineIndex] = useState(-1);
  const [productLineList, setProductLineList] = useState<ProductLineItem[]>([]);
  const [newProductLine, setNewProductLine] = useState<NewProductLineItem>(
    {} as NewProductLineItem
  );
  const [editProductLine, setEditProductLine] = useState<EditProductLineItem>(
    {} as NewProductLineItem
  );
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);

  const getProductLineList = async () => {
    setProductLineList(await apiGetProductLineTypeList());
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
    const reqInt = await apiNewProductLineType(newProductLine);
    if (reqInt === 0) {
      getProductLineList();
      cleanProductLine();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
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
    const reqInt = await apiEditProductLineType(editProductLine);
    if (reqInt === 0) {
      getProductLineList();
      setEditProductLineMode(false);
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗。errorcode = ${reqInt}`);
    }
  };

  const deleteProductLine = async () => {
    const confirm = window.confirm(`確定刪除 ${editProductLine.Name} 嗎?`);
    if (confirm) {
      const reqInt = await apiDeleteProductLineType(editProductLine);
      if (reqInt === 0) {
        getProductLineList();
        setEditProductLineMode(false);
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice("error", true, `刪除失敗。errorCode = ${reqInt}`);
      }
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchProductLine = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const data = await apiGetProductLineTypeList();
      if (data) {
        const filterData = data.filter((item) => {
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
