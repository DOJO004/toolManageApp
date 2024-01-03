"use client";
import ToolStockIndex from "@/app/ui/toolInfo/toolStock";
import { apiGetToolStockList } from "@/scripts/api";
import { useEffect, useState } from "react";
export default function Page() {
  const [toolStockList, setToolStockList] = useState([]);

  const fetchGetToolStocks = async () => {
    const res = await apiGetToolStockList();
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    } else {
      console.log("get tool stock list false.");
    }
  };
  useEffect(() => {
    fetchGetToolStocks();
  }, []);
  return <ToolStockIndex toolStockList={toolStockList} />;
}
