"use client";

import ToolStockNew from "@/app/ui/toolInfo/toolStock/new";
import { apiGetToolSpecList } from "@/scripts/apis/tool-spec";
import { apiGetToolStockList } from "@/scripts/apis/tool-stock";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [toolSpecList, setToolSpecList] = useState([]);
  const [toolStockList, setToolStockList] = useState([]);
  const [page, setPage] = useState(1);

  const fetchGetToolStockList = async () => {
    const res = await apiGetToolStockList(page);
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    }
    console.log(res);
  };

  const fetchGetToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
    }
  };

  const handleChangePage = (value: number) => {
    setPage((prev) => prev + value);
  };

  useEffect(() => {
    fetchGetToolSpecList();
    fetchGetToolStockList();
  }, []);

  useEffect(() => {
    fetchGetToolStockList();
  }, [page]);

  return (
    <div className="w-full p-2 mx-2 bg-gray-900 rounded-md">
      <div className="grid items-center grid-cols-3 mb-4 border-b-2">
        <p className="col-start-2 col-end-2 text-2xl ">刀具庫存</p>
        <button className="p-1 my-2 border rounded-md w-fit hover:bg-gray-300">
          新增
        </button>
      </div>
      <ToolStockNew
        toolSpecList={toolSpecList}
        fetchGetToolStockList={fetchGetToolStockList}
      />
      <div className="grid items-center grid-cols-2 gap-2 text-center ">
        <div>ToolSpecName</div>
        <div>ToolSN</div>
        {toolStockList.map((item) => (
          <React.Fragment key={item.ToolSn}>
            <div>{item.ToolSpecName}</div>
            <div>{item.ToolSn}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          className={`mx-2 ${page === 1 ? "disabled" : ""}`}
          onClick={() => handleChangePage(-1)}
          disabled={page === 1}
        >
          上一頁
        </button>
        <p>{page} / 總頁數 </p>
        <button className="mx-2" onClick={() => handleChangePage(1)}>
          下一頁
        </button>
      </div>
    </div>
  );
}
