"use client";

import { apiGetElabelBindStatusInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  const [elabelBindStatusInfoList, setElabelBindStatusInfoList] = useState({});

  const fetchGetElabelBindStatusInfoList = async () => {
    const res = await apiGetElabelBindStatusInfoList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setElabelBindStatusInfoList(res.data.Values.eLToolBingStatusList);
    } else {
      console.log("get elabel bind status list false.");
    }
  };

  useEffect(() => {
    fetchGetElabelBindStatusInfoList();
  }, []);
  return (
    <form className="flex flex-col justify-center w-full p-4 mb-2 bg-gray-900 rounded-xl">
      <p className="text-xl text-center ">歸還刀具</p>
      <label htmlFor="elabelSN">電子標籤SN</label>
      <input
        id="elabelSN"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        placeholder="電子標籤SN"
      />
      <label htmlFor="labelCode">標籤號碼</label>
      <input
        id="labelCode"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        placeholder="標籤號碼"
      />
      <label htmlFor="toolSN">刀具SN</label>
      <input
        id="toolSN"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        placeholder="刀具SN"
      />
      <button className="p-2 mt-4 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
        歸還
      </button>
    </form>
  );
}
