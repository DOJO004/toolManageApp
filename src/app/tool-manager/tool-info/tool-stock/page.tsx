"use client";
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
  const [editMode, setEditMode] = useState(false);
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetToolStocks = async () => {
    const res = await apiGetToolStockList();
    if (res?.data?.Values?.ReqInt === 0) {
      setToolStockList(res.data.Values.ToolStockList);
    } else {
      console.log("get tool stock list false.");
    }
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
    <div className="flex flex-col justify-center md:flex-row">
      {newMode && (
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
      )}
      <ToolStockIndex
        toolStockList={toolStockList}
        changeNewMode={changeNewMode}
      />
    </div>
  );
}
