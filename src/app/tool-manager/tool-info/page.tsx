"use client";
import SweetAlert from "@/components/sweetAlert";
import PieChart from "@/components/toolInfo/piechart";
import ToolInfoLog from "@/components/toolInfo/toolInfoLog";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { useEffect, useState } from "react";
import {
  GetToolStockListResponse,
  ToolStockItem,
} from "../../../components/toolInfo/types";

export default function Page() {
  const [toolInfoList, setToolInfoList] = useState<ToolStockItem[]>([]);
  const [toolInfoData, setToolInfoData] = useState<ToolStockItem>(
    {} as ToolStockItem
  );

  const getToolInfoList = async (count = 0) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      return;
    }
    try {
      const data = await apiGetToolStockList();
      const res = data as GetToolStockListResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("get tool stock list", res);

      if (reqInt === 0) {
        setToolInfoList(res.data.Values.ToolStockList);
        setToolInfoData(res.data.Values.ToolStockList[0]);
        return res.data.Values.ToolStockList;
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      getToolInfoList(count + 1);
    }
  };

  const handleGetToolInfoData = (data: any) => {
    console.log("get tool info data", data);

    setToolInfoData(data);
  };

  const getLifeStatusClassName = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "text-green-500";
      case "Repairing":
        return "text-amber-500";
      case "Scrap":
        return "text-gray-500";
      default:
        return "";
    }
  };

  const sortToolInfoList = (toolInfoList: ToolStockItem[]) => {
    const referenceTable: { [key: string]: number } = {
      Normal: 1,
      Repairing: 2,
      Scrap: 3,
    };

    const sortData = toolInfoList.sort((a, b) => {
      if (referenceTable[a.LifeStatus] > referenceTable[b.LifeStatus]) {
        return 1;
      }
      if (referenceTable[a.LifeStatus] < referenceTable[b.LifeStatus]) {
        return -1;
      }
      return 0;
    });
    return sortData;
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const toolInfoList = await getToolInfoList();
      if (toolInfoList) {
        const filterData = sortToolInfoList(toolInfoList).filter((item) => {
          return item.ToolSn.toLowerCase().includes(value.toLowerCase());
        });
        setToolInfoList(filterData);
      }
    }, 500);
  };

  const translateLifeStatus = (lifeStatus: string) => {
    switch (lifeStatus) {
      case "Normal":
        return "正常";
      case "Repairing":
        return "修理中";
      case "Scrap":
        return "報廢";
      default:
        return "";
    }
  };

  useEffect(() => {
    getToolInfoList();
  }, []);
  return (
    <div className="w-full h-full p-2 bg-gray-900 rounded-lg ">
      <div className="sticky top-0 flex flex-col w-full bg-gray-900 md:flex-row">
        <PieChart toolInfoData={toolInfoData} />
        <ToolInfoLog toolInfoData={toolInfoData} />
      </div>
      <div className="p-2 overflow-auto text-center bg-gray-700 rounded-md ">
        <div className="my-4">
          <h3 className="my-4">刀具狀態列表</h3>
          <input
            type="search"
            className="p-2 text-black rounded-md w-96"
            placeholder="搜尋刀具序號"
            onChange={(e) => searchTool(e.target.value)}
          />
        </div>
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
            {toolInfoList.length > 0 ? (
              sortToolInfoList(toolInfoList).map((item) => (
                <tr
                  key={item.ToolSn}
                  className="cursor-pointer hover:bg-gray-600"
                  onClick={() => handleGetToolInfoData(item)}
                >
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td
                    className={`p-1 whitespace-nowrap ${getLifeStatusClassName(
                      item.LifeStatus
                    )}`}
                  >
                    {translateLifeStatus(item.LifeStatus)} /
                    {item.LifeData.RepairCnt}
                  </td>
                  <td className="p-1 whitespace-nowrap">
                    {item.LoadingData?.IsLoading
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
            ) : (
              <tr>
                <td colSpan={6}>no data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
