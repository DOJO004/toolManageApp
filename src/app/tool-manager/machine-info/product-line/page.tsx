"use client";

import ProductLineNew from "@/app/ui/machineInfo/productLine/new";
import { confirmDisable } from "@/scripts/apis/base";
import {
  apiDisabledProductLine,
  apiEditProductLine,
  apiGetProductLineList,
} from "@/scripts/apis/product-line";
import React, { useEffect, useState } from "react";
export default function Page() {
  const [productLineList, setProductLineList] = useState([]);
  const [productLineEdit, setProductLineEdit] = useState({
    Id: "",
    Name: "",
  });
  const [addToggle, setAddToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const fetchGetProductLineList = async () => {
    const res = await apiGetProductLineList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setProductLineList(res.data.Values.ProductLineList);
    }
    console.log(res);
  };

  const fetchEditProductLine = async () => {
    const res = await apiEditProductLine(productLineEdit);
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setEditToggle(false);
      fetchGetProductLineList();
    }
  };

  const fetchDisabledProductList = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await apiDisabledProductLine(productLineEdit.Id);
      const reqInt = res?.data?.Values?.ReqInt;

      if (reqInt === 0) {
        setEditToggle(false);
        fetchGetProductLineList();
      }
    }
  };

  const handleEditMode = (index: number, id: string, name: string) => {
    setEditToggle(true);
    setEditIndex(index);
    setProductLineEdit({
      Id: id,
      Name: name,
    });
  };

  const handleEditInput = (value: string) => {
    setProductLineEdit((prev) => ({
      ...prev,
      Name: value,
    }));
  };

  useEffect(() => {
    fetchGetProductLineList();
  }, []);

  return (
    <div className="w-full p-4 mx-2 bg-gray-900 rounded-md">
      <div className="grid items-center grid-cols-3 gap-2 mb-4 border-b-2">
        <p className="col-start-2 col-end-2 text-xl text-center">
          product line
        </p>
        <button
          className="p-1 border rounded-md hover:bg-gray-700"
          onClick={() => setAddToggle(!addToggle)}
        >
          新增
        </button>
      </div>
      {addToggle && (
        <ProductLineNew fetchGetProductLineList={fetchGetProductLineList} />
      )}

      <div className="grid grid-cols-3 gap-2 text-center bg-indigo-500 rounded-t-md">
        <p>ID</p>
        <p>Name</p>
        <p>編輯</p>
      </div>
      <div className="grid items-center grid-cols-3 gap-2 mt-2 text-center">
        {productLineList.map((item, index) =>
          editToggle && index === editIndex ? (
            <React.Fragment key={item.Id}>
              <div>{productLineEdit.Id} </div>
              <input
                type="text"
                value={productLineEdit.Name}
                onChange={(e) => handleEditInput(e.target.value)}
                className="text-center text-black"
              />
              <div>
                <button
                  className="mx-1 "
                  onClick={() => fetchEditProductLine()}
                >
                  完成
                </button>
                <button
                  className="mx-1"
                  onClick={() => fetchDisabledProductList()}
                >
                  刪除
                </button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key={item.Id}>
              <div>{item.Id} </div>
              <div>{item.Name} </div>
              <button onClick={() => handleEditMode(index, item.Id, item.Name)}>
                編輯
              </button>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
