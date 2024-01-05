"use client";

import ProductLineIndex from "@/app/ui/machineInfo/productLine";
import ProductLineEdit from "@/app/ui/machineInfo/productLine/edit";
import ProductLineNew from "@/app/ui/machineInfo/productLine/new";
import {
  apiGetProductLineInfoList,
  apiAddProductLineInfo,
  apiModifyProductLineInfo,
  disabledProductLineInfo,
} from "@/scripts/api";
import { useEffect, useState, FormEvent } from "react";

export default function Page() {
  // index
  const [productLineList, setProductLineList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetProductLineList = async (index?: number) => {
    const res = await apiGetProductLineInfoList();
    console.log(index);

    if (res?.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        setProductLine(res.data.Values.ProductLineList[index]);
      } else {
        setProductLineList(res.data.Values.ProductLineList);
      }
    } else {
      console.log("get product line list false.");
    }
  };

  const changeNewMode = () => {
    setNotice(false);
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
  };

  const changeEditMode = (index?: number) => {
    setNotice(false);
    setEditIndex(index);
    setNewMode(false);
    if (index === editIndex) {
      setEditMode(!editMode);
    } else {
      setEditMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (index === undefined) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    fetchGetProductLineList();
  }, []);

  // new
  const [productLineID, setProductLineID] = useState("");
  const [productLineName, setProductLineName] = useState("");

  const fetchAddProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddProductLineInfo(productLineID, productLineName);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      cleanNewInput();
      fetchGetProductLineList();
    } else {
      console.log("add product line false.");
      setIsError(true);
    }
  };

  const cleanNewInput = () => {
    setProductLineID("");
    setProductLineName("");
  };

  //edit
  const [productLine, setProductLine] = useState({
    ProductLineID: "",
    ProductLineName: "",
  });

  const fetchEditProductLine = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiModifyProductLineInfo(
      productLine.ProductLineID,
      productLine.ProductLineName
    );
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
      fetchGetProductLineList();
    } else {
      console.log("edit product line false.");
      setIsError(true);
    }
  };

  const fetchDeleteProductLine = async () => {
    const res = await disabledProductLineInfo(productLine.ProductLineID);
    if (res?.data?.Values?.ReqInt === 0) {
    } else {
      console.log("delete product line false.");
    }
  };

  return (
    <div>
      {newMode && (
        <ProductLineNew
          productLineID={productLineID}
          setProductLineID={setProductLineID}
          productLineName={productLineName}
          setProductLineName={setProductLineName}
          fetchAddProductLine={fetchAddProductLine}
          changeNewMode={changeNewMode}
          notice={notice}
          isError={isError}
        />
      )}

      {editMode && (
        <ProductLineEdit
          fetchEditProductLine={fetchEditProductLine}
          fetchDeleteProductLine={fetchDeleteProductLine}
          productLine={productLine}
          setProductLine={setProductLine}
          changeEditMode={changeEditMode}
          notice={notice}
          isError={isError}
        />
      )}
      <ProductLineIndex
        productLineList={productLineList}
        changeNewMode={changeNewMode}
        changeEditMode={changeEditMode}
        fetchGetProductLineList={fetchGetProductLineList}
      />
    </div>
  );
}
