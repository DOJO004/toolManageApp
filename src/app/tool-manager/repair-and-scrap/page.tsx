"use client";
import RepairAndScrapIndex from "@/app/ui/repairAndScrap";
import {
  apiGetToolStockList,
  confirmDisable,
  repairToolStockInfo,
  restoreToolStockInfo,
  scrapToolStockInfo,
} from "@/scripts/api";
import { useEffect, useState } from "react";
import { handleToolType } from "./action";
import PageController from "@/app/ui/pageController/pageController";

export default function Page() {
  const [toolStockList, setToolStockList] = useState([]);
  const [toolTypeClass, setToolTypeClass] = useState<string[]>([]);
  const [selectToolTypeClass, setSelectToolTypeClass] = useState("ALL");

  const fetchRepairTool = async (toolSN: string) => {
    const confirm = confirmDisable("確定送修嗎?");
    if (confirm) {
      const res = await repairToolStockInfo(toolSN);
      console.log(res);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetToolStockList();
      } else {
        console.log("repair tool false.");
      }
    }
  };

  const fetchRestoreTool = async (toolSN: string) => {
    const confirm = confirmDisable("確定重新入庫嗎?");
    if (confirm) {
      const res = await restoreToolStockInfo(toolSN);
      console.log(res);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetToolStockList();
      } else {
        console.log("restore tool false.");
      }
    }
  };

  const fetchScrapTool = async (toolSN: string) => {
    const confirm = confirmDisable("確定報廢嗎?");
    if (confirm) {
      const res = await scrapToolStockInfo(toolSN);
      console.log(res);
      if (res?.data?.Values?.ReqInt === 0) {
        fetchGetToolStockList();
      } else {
        console.log("scrap tool false.");
      }
    }
  };

  const fetchGetToolStockList = async () => {
    const res = await apiGetToolStockList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
      setToolTypeClass(handleToolType(res.data.Values.ToolStockList));
    } else {
      console.log("get tool stock list false.");
    }
  };

  const handleShowSelectToolType = async (toolType: string) => {
    await fetchGetToolStockList();
    if (toolType !== "ALL") {
      setToolStockList((prev) =>
        prev.filter((item) => item.ToolType === toolType)
      );
    }
  };

  const handleSelectToolTypeClass = (toolType: string) => {
    setSelectToolTypeClass(toolType);
  };

  useEffect(() => {
    fetchGetToolStockList();
  }, []);

  return (
    <div className="w-full max-w-2xl p-2 bg-gray-900 rounded-md h-fit">
      <RepairAndScrapIndex
        toolStockList={toolStockList}
        toolTypeClass={toolTypeClass}
        fetchRepairTool={fetchRepairTool}
        fetchScrapTool={fetchScrapTool}
        fetchRestoreTool={fetchRestoreTool}
        handleShowSelectToolType={handleShowSelectToolType}
        handleSelectToolTypeClass={handleSelectToolTypeClass}
        selectToolTypeClass={selectToolTypeClass}
      />
      <div>
        <PageController />
      </div>
    </div>
  );
}
