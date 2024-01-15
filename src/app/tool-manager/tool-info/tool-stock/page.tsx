"use client";
import Notice from "@/app/ui/notice";
import PageController from "@/app/ui/pageController/pageController";
import ToolStockIndex from "@/app/ui/toolInfo/toolStock";
import ToolStockNew from "@/app/ui/toolInfo/toolStock/new";
import {
  apiGetToolStockList,
  apiGetToolSpecList,
  apiAddToolStock,
} from "@/scripts/api";
import { useEffect, useState, FormEvent } from "react";
export default function Page() {
  // index
  const [toolStockList, setToolStockList] = useState([]);
  const [newMode, setNewMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(-1);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetToolStocks = async () => {
    const res = await apiGetToolStockList();
    console.log("get tool stock list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
      setTotalPage(res.data.Values.TotalPages);
      setTotalRecords(res.data.Values.TotalRecords);
    } else {
      console.log("get tool stock list false.");
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const exPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
  };
  useEffect(() => {
    fetchGetToolStocks();
  }, []);

  // new
  const [toolSpecList, setToolSpecList] = useState([]);
  const [toolSpecID, setToolSpecID] = useState("");
  const [addQty, setAddQty] = useState("");

  const fetchGetToolSpecID = async () => {
    const res = await apiGetToolSpecList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolsSpecList);
    } else {
      console.log("get tool spec list false.");
    }
  };

  const fetchAddToolStock = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddToolStock(toolSpecID, addQty);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      setNewMode(false);
      setIsError(false);
      fetchGetToolStocks();
      setAddQty("");
    } else {
      console.log("add tool stock false.");
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchGetToolSpecID();
  }, []);
  return (
    <div className="relative flex flex-col justify-center md:flex-row">
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
      <ToolStockIndex
        toolStockList={toolStockList}
        changeNewMode={changeNewMode}
      />
      <div className="absolute -bottom-10">
        <PageController
          totalRecords={totalRecords}
          totalPage={totalPage}
          currentPage={currentPage}
          nextPage={nextPage}
          exPage={exPage}
        />
      </div>
      <div
        className={` absolute top-0 transition-all duration-300 ease-in-out ${
          newMode ? "translate-y-0" : "-translate-y-96"
        }`}
      >
        <ToolStockNew
          toolSpecList={toolSpecList}
          fetchAddToolStock={fetchAddToolStock}
          setToolSpecID={setToolSpecID}
          addQty={addQty}
          setAddQty={setAddQty}
          notice={notice}
          isError={isError}
          changeNewMode={changeNewMode}
        />
      </div>
    </div>
  );
}
