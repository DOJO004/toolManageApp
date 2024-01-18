"use client";
import PageController from "@/app/ui/pageController/pageController";
import PieChart from "@/app/ui/toolInfo/piechart";
import ToolInfoList from "@/app/ui/toolInfo/toolInfoList";
import ToolInfoLog from "@/app/ui/toolInfo/toolInfoLog";
import { apiGetToolStockStatusInfoList, apiGetToolInfo } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolStatusList, setToolStatusList] = useState([]);
  const [toolStatusItem, setToolStatusItem] = useState({
    ToolSN: "",
    ToolName: "",
    ProcessTime: "",
    ProcessLength: "",
  });
  const [selectTool, setSelectTool] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(-1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchToolInfoList = async () => {
    const res = await apiGetToolStockStatusInfoList(40, currentPage);
    console.log(res);

    if (res.data?.Values?.ReqInt === 0) {
      setToolStatusList(res.data.Values.ToolStockList);
      setTotalPage(res.data.Values.TotalPages);
      setTotalRecords(res.data.Values.TotalRecords);
      handleToolStatusItem(res.data.Values.ToolStockList[0]);
    } else {
      console.log("fetch false.");
    }
  };

  const handleToolStatusItem = async (item) => {
    setToolStatusItem({
      ...toolStatusItem,
      ToolSN: item.ToolSN,
      ToolName: item.ToolName,
      ProcessTime: item.LifeData.ProcessTime,
      ProcessLength: item.LifeData.ProcessLength,
    });
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
    <div className="h-full ">
      <div className="flex flex-col w-full md:flex-row">
        <PieChart toolStatusItem={toolStatusItem} />
        <ToolInfoLog />
      </div>
      <div className="overflow-auto ">
        <ToolInfoList
          toolStatusList={toolStatusList}
          handleToolStatusItem={handleToolStatusItem}
        />
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
