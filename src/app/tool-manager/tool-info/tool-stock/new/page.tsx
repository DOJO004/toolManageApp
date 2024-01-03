"use client";
import ToolStockNew from "@/app/ui/toolInfo/toolStock/new";
import { apiAddToolStock, apiGetToolSpecList } from "@/scripts/api";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const [toolSpecList, setToolSpecList] = useState([]);
  const [toolSpecID, setToolSpecID] = useState("");
  const [addQty, setAddQty] = useState("");
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

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
      router.push("/tool-manager/tool-info/tool-stock");
    } else {
      console.log("add tool stock false.");
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchGetToolSpecID();
  }, []);
  return (
    <div>
      <ToolStockNew
        toolSpecList={toolSpecList}
        fetchAddToolStock={fetchAddToolStock}
        setToolSpecID={setToolSpecID}
        addQty={addQty}
        setAddQty={setAddQty}
        notice={notice}
        isError={isError}
      />
    </div>
  );
}
