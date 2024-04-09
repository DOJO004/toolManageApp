"use client";

import { useEffect, useState } from "react";

import {
  apiDeleteBindLabel,
  apiGetBindLabelList,
} from "@/scripts/Apis/receiveTool/receiveTool";
export default function Page() {
  const [bindLabelList, setBindLabelList] = useState([]);

  const getBindLabelList = async () => {
    const res = await apiGetBindLabelList();
    if (res?.data?.Values?.ReqInt === 0) {
      setBindLabelList(res.data.Values.LabelBindList);
    }
  };

  const deleteBindLabel = async (data: any) => {
    const confirm = window.confirm(`確定要歸還${data.LToolCode}嗎?`);
    if (confirm) {
      const res = await apiDeleteBindLabel(data);
      console.log(res);
      if (res?.data?.Values?.ReqInt === 0) {
        getBindLabelList();
      }
    }
  };

  useEffect(() => {
    getBindLabelList();
  }, []);

  return (
    <div className="w-full max-w-4xl p-2 mr-4 bg-gray-900 rounded-md h-fit">
      <div>
        <p className="text-center ">歸還刀具</p>
        <hr className="my-2 " />
        <div className="overflow-auto rounded-t-xl">
          <table className="w-full text-center md:min-w-96">
            <thead>
              <tr className="font-bold bg-indigo-300">
                <td className="p-2 text-black whitespace-nowrap">標籤號碼</td>
                <td className="p-2 text-black whitespace-nowrap">刀具SN</td>
                <td className="p-2 text-black whitespace-nowrap">歸還</td>
              </tr>
            </thead>
            <tbody>
              {bindLabelList
                ? bindLabelList.map((item, index) => (
                    <tr key={index} className="bg-indigo-200">
                      <td className="p-2 text-black whitespace-nowrap">
                        {item.LabelSpec?.LabelID}
                      </td>
                      <td className="p-2 text-black whitespace-nowrap">
                        {item.LabelSpec?.ToolSN}
                      </td>
                      <td
                        className="p-2 text-black cursor-pointer whitespace-nowrap"
                        onClick={() => deleteBindLabel(item)}
                      >
                        歸還
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
