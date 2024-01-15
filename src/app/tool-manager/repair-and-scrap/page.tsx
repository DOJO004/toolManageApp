"use client";
import RepairAndScrapIndex from "@/app/ui/repairAndScrap";
import {
  apiGetToolStockList,
  repairToolStockInfo,
  restoreToolStockInfo,
  scrapToolStockInfo,
} from "@/scripts/api";
import { useEffect, useState } from "react";
import { handleToolType } from "./action";

export default function Page() {
  const [toolStockList, setToolStockList] = useState([]);
  const [classificationToolType, setClassificationToolType] = useState<
    string[]
  >([]);

  const fetchRepairTool = async (toolSN: string) => {
    const res = await repairToolStockInfo(toolSN);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetToolStockList();
    } else {
      console.log("repair tool false.");
    }
  };

  const fetchRestoreTool = async (toolSN: string) => {
    const res = await restoreToolStockInfo(toolSN);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetToolStockList();
    } else {
      console.log("restore tool false.");
    }
  };

  const fetchScrapTool = async () => {
    const res = await scrapToolStockInfo();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetToolStockList();
    } else {
      console.log("scrap tool false.");
    }
  };

  const fetchGetToolStockList = async () => {
    const res = await apiGetToolStockList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    } else {
      console.log("get tool stock list false.");
    }
  };

  useEffect(() => {
    fetchGetToolStockList();
  }, []);

  useEffect(() => {
    setClassificationToolType(handleToolType(toolStockList));
  }, [toolStockList]);

  return (
    <>
      <RepairAndScrapIndex
        toolStockList={toolStockList}
        classificationToolType={classificationToolType}
        fetchRepairTool={fetchRepairTool}
        fetchScrapTool={fetchScrapTool}
        fetchRestoreTool={fetchRestoreTool}
      />
    </>
  );
}
