"use client";
import PieChart from "@/app/ui/toolInfo/piechart";
import ToolInfoLog from "@/app/ui/toolInfo/toolInfoLog";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState([]);
  const [toolInfoData, setToolInfoData] = useState({});

  const getToolInfoList = async () => {
    const res = await apiGetToolStockList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolInfoList(res.data.Values.ToolStockList);
    }
  };

  const handleGetToolInfoData = (data: any) => {
    setToolInfoData(data);
  };

  useEffect(() => {
    getToolInfoList();
  }, []);
  return (
    <div className="w-full h-full max-w-screen-2xl ">
      <div className="flex flex-col w-full md:flex-row">
        <PieChart toolInfoData={toolInfoData} />
        <ToolInfoLog />
      </div>
      <div className="w-full p-2 overflow-auto bg-gray-900 rounded-md">
        <div className="w-full">
          <div className="overflow-auto text-center rounded-md">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-500 ">
                  <th className="p-1 whitespace-nowrap">刀具序號</th>
                  <th className="p-1 whitespace-nowrap">狀態/修整次數</th>
                  <th className="p-1 whitespace-nowrap">裝載狀態/設備</th>
                  <th className="p-1 whitespace-nowrap">累積加工長度</th>
                  <th className="p-1 whitespace-nowrap">累積加工時間</th>
                  <th className="p-1 whitespace-nowrap">累積加工次數</th>
                </tr>
              </thead>
              <tbody>
                {toolInfoList
                  ? toolInfoList.map((item, index) => (
                      <tr
                        key={item.ToolSn}
                        className="cursor-pointer hover:bg-gray-600"
                        onClick={() => handleGetToolInfoData(item)}
                      >
                        <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LifeStatus} / {item.LifeData.RepairCnt}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LoadingData.IsLoading
                            ? `裝載中 / ${item.LoadingData.MachineId}`
                            : "未裝載"}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LifeData.ProcessLength}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LifeData.ProcessTime}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LifeData.ProcessCnt}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
