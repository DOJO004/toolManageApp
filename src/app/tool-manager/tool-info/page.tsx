"use client";
import PageController from "@/app/ui/pageController/pageController";
import PieChart from "@/app/ui/toolInfo/piechart";
import ToolInfoList from "@/app/ui/toolInfo/toolInfoList";
import ToolInfoLog from "@/app/ui/toolInfo/toolInfoLog";
import { apiGetToolStockStatusInfoList } from "@/scripts/apis/base.js";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolStatusList, setToolStatusList] = useState([]);
  const [toolStatusItem, setToolStatusItem] = useState({
    ToolSN: "",
    ToolName: "",
    ProcessTime: "",
    ProcessLength: "",
    LoadingLogList: [],
  });
  const [toolStatusLog, setToolStatusLog] = useState([]);
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
      LoadingLogList: item.LoadingLogList,
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

  const handleSearchToolStatusList = (parameter: string) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(async () => {
      await fetchToolInfoList();
      setToolStatusList((prev) =>
        prev.filter((item) => {
          return item.ToolSN.toLowerCase().includes(parameter.toLowerCase());
        })
      );
    }, 500);

    setTimerId(newTimerId);
  };

  useEffect(() => {
    fetchToolInfoList();
  }, [currentPage]);

  useEffect(() => {
    console.log("666", toolStatusList);
  }, [toolStatusList]);
  return (
    <div className="w-full h-full max-w-screen-2xl ">
      <div className="flex flex-col w-full md:flex-row">
        <PieChart toolStatusItem={toolStatusItem} />
        <ToolInfoLog toolStatusItem={toolStatusItem} />
      </div>
      <div className="w-full p-2 overflow-auto bg-gray-900 rounded-md">
        <ToolInfoList
          toolStatusList={toolStatusList}
          handleToolStatusItem={handleToolStatusItem}
        />
        <div className="my-2">
          <PageController
            totalRecords={totalRecords}
            totalPage={totalPage}
            currentPage={currentPage}
            nextPage={nextPage}
            exPage={exPage}
          />
        </div>
      </div>
    </div>
  );
}
