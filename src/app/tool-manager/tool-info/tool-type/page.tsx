"use client";
import ToolTypeData from "@/app/ui/toolInfo/toolType/edit";
import ToolTypeNew from "@/app/ui/toolInfo/toolType/new";
import { apiGetToolTypeInFoList } from "@/scripts/apis/tool-info";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolTypeList, setToolTypeList] = useState<
    {
      Id: string;
      Name: string;
    }[]
  >([]);

  const [addToolTypeToggle, setAddToolTypeToggle] = useState(false);

  const fetchGetToolTypeList = async () => {
    const res = await apiGetToolTypeInFoList();
    if (res !== false && res.status === 200) {
      console.log("get tool type list", res);
      setToolTypeList(res.data.Values.ToolTypeMenus);
    } else {
      console.log("status", (res as AxiosResponse<any>).status);
    }
  };

  useEffect(() => {
    fetchGetToolTypeList();
  }, []);

  return (
    <div className="relative w-full h-full p-2 overflow-auto text-center bg-gray-900 rounded-md">
      <div className="grid items-center grid-cols-3 mb-4 border-b-2">
        <p className="col-start-2 col-end-2 text-2xl ">刀具類型</p>
        <button
          className="p-1 my-2 border rounded-md w-fit hover:bg-gray-300"
          onClick={() => setAddToolTypeToggle(!addToolTypeToggle)}
        >
          新增
        </button>
      </div>

      <div className="overflow-auto shadow-md rounded-t-xl">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-2 bg-indigo-500 ">
            <div className="p-1 text-black whitespace-nowrap">ID</div>
            <div className="p-1 text-black whitespace-nowrap">名稱</div>
            <div className="p-1 text-black whitespace-nowrap">編輯</div>
          </div>
          <ToolTypeNew
            addToolTypeToggle={addToolTypeToggle}
            fetchGetToolTypeList={fetchGetToolTypeList}
          />
          <ToolTypeData
            toolTypeList={toolTypeList}
            fetchGetToolTypeList={fetchGetToolTypeList}
          />
        </div>
      </div>
    </div>
  );
}
