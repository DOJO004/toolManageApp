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
  const [selectTool, setSelectTool] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchToolInfoList = async () => {
    const res = await apiGetToolStockStatusInfoList(40, currentPage);

    if (res.data?.Values?.ReqInt === 0) {
      setToolStatusList(res.data.Values.ToolStockList);
      setTotalPage(res.data.Values.TotalPages);
      setTotalRecords(res.data.Values.TotalRecords);
    } else {
      console.log("fetch false.");
    }
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
    <div className="w-full h-full">
      <div className="flex flex-col w-full md:flex-row">
        <PieChart />
        <ToolInfoLog />
      </div>
      <div className="overflow-auto max-h-[830px] ">
        <ToolInfoList toolStatusList={toolStatusList} />
      </div>
      <PageController
        totalRecords={totalRecords}
        totalPage={totalPage}
        currentPage={currentPage}
        nextPage={nextPage}
        exPage={exPage}
      />
    </div>
  );
}
