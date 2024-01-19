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
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";

export default function Page() {
  // index
  const [productLineList, setProductLineList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(-1);

  const fetchGetProductLineList = async (index?: number) => {
    const res = await apiGetProductLineInfoList();
    console.log("get product line info list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      if (index || index === 0) {
        setProductLine(res.data.Values.ProductLineList[index]);
      } else {
        setTotalRecords(res.data.Values.TotalRecords);
        setProductLineList(res.data.Values.ProductLineList);
      }
    } else {
      console.log("get product line list false.");
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
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
      setEditMode(false);
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
    <div className="relative flex flex-col justify-center w-full max-w-4xl md:flex-row">
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
      <div className="w-full bg-gray-900 rounded-md h-fit">
        <ProductLineIndex
          productLineList={productLineList}
          changeNewMode={changeNewMode}
          changeEditMode={changeEditMode}
          fetchGetProductLineList={fetchGetProductLineList}
        />
        <div className="my-4">
          <PageController
            nextPage={nextPage}
            exPage={exPage}
            currentPage={currentPage}
            totalPage={totalPage}
            totalRecords={totalRecords}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 transition-all duration-300 bg-black/70 h-screen w-screen
          ${newMode ? " translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex justify-center mt-48 ">
          <ProductLineNew
            productLineID={productLineID}
            setProductLineID={setProductLineID}
            productLineName={productLineName}
            setProductLineName={setProductLineName}
            fetchAddProductLine={fetchAddProductLine}
            changeNewMode={changeNewMode}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 transition-all duration-300 bg-black/70 h-screen w-screen
        ${editMode ? " translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex justify-center mt-48">
          <ProductLineEdit
            fetchEditProductLine={fetchEditProductLine}
            fetchDeleteProductLine={fetchDeleteProductLine}
            productLine={productLine}
            setProductLine={setProductLine}
            changeEditMode={changeEditMode}
          />
        </div>
      </div>
    </div>
  );
}
