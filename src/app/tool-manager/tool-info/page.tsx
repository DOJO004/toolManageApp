"use client";
import PageController from "@/app/ui/pageController/pageController";
import PieChart from "@/app/ui/toolInfo/piechart";
import ToolInfoList from "@/app/ui/toolInfo/toolInfoList";
import ToolInfoLog from "@/app/ui/toolInfo/toolInfoLog";
import {
  apiGetToolStockStatusInfoList,
  apiGetToolSpecOpLogList,
  o,
} from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolStatusList, setToolStatusList] = useState([]);
  const [selectToolID, setSelectToolID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);

  const fetchToolInfoList = async () => {
    const res = await apiGetToolStockStatusInfoList(currentPage);
    if (res.data?.Values?.ReqInt === 0) {
      setToolStatusList(res.data.Values.ToolStockList);
      setTotalPage(res.data.Values.TotalPages);
    } else {
      console.log("fetch false.");
    }
    console.log(res);
  };

  const fetchSelectToolLog = async () => {
    const res = await apiGetToolSpecOpLogList(selectToolID);
    console.log("log", res);
  };

  const nextPage = () => {
    if (currentPage !== totalPage) {
      setCurrentPage((prev: number) => prev + 1);
    }
  };

  const exPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev: number) => prev - 1);
    }
  };

  useEffect(() => {
    fetchToolInfoList();
  }, [currentPage]);

  return (
    <>
      <div className="flex">
        <div className="flex justify-center w-6/12 p-2 mx-1 my-1 bg-gray-900 rounded-xl">
          <PieChart />
        </div>
        <div className="w-6/12 p-2 mx-1 my-1 bg-gray-900 rounded-xl">
          <ToolInfoLog />
        </div>
      </div>
      <ToolInfoList
        toolStatusList={toolStatusList}
        setSelectToolID={setSelectToolID}
      />
      <PageController
        totalPage={totalPage}
        currentPage={currentPage}
        nextPage={nextPage}
        exPage={exPage}
      />
    </>
  );
}
