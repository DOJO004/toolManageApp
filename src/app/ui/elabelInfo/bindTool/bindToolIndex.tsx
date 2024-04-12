import { LabelItem } from "@/app/ui/elabelInfo/types";
import {
  apiBindELabelInfo,
  apiGetELabelList,
} from "@/scripts/Apis/eLabelInfo/eLabelInfo";
import { apiGetToolStockList } from "@/scripts/Apis/toolStock/toolStock";
import { FormEvent, useEffect, useState } from "react";
import { GetToolStockListResponse } from "../../toolInfo/toolStock/types";
import { ToolStockItem } from "../../toolInfo/types";
import { GetELabelListResponse } from "../types";
import { BindToolDataItem } from "./types";

export default function BindToolIndex() {
  const [bindToolData, setBindToolData] = useState<BindToolDataItem>({
    LabelId: "",
    LabelSn: "",
    ToolSn: "",
  });
  const [eLabeList, setELabelList] = useState<LabelItem[]>([]);
  const [toolList, setToolList] = useState<ToolStockItem[]>([]);

  const getELabelList = async () => {
    const data = await apiGetELabelList();
    const res = data as GetELabelListResponse;
    console.log("get eLabel list", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelList(filterUnbindLabel(res.data.Values.LabelList));
    }
  };

  const getToolList = async () => {
    const data = await apiGetToolStockList();
    const res = data as GetToolStockListResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setToolList(filterToolStatus(res.data.Values.ToolStockList));
    }
  };

  const postBindTool = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiBindELabelInfo(bindToolData);
    console.log(res);
  };

  const filterUnbindLabel = (data: LabelItem[]) => {
    const filterData = data.filter((item) => {
      return item.BindStatus === "Unbinding";
    });
    return filterData;
  };

  const filterToolStatus = (data: ToolStockItem[]) => {
    const filterData = data.filter((item) => {
      return item.LifeStatus === "Normal" && !item.LoadingData.IsLoading;
    });
    return filterData;
  };

  const handleClickBindData = (
    key: string,
    LabelId: string,
    LabelSn: string,
    ToolSn: string
  ) => {
    if (key === "eLabel") {
      setBindToolData((prev) => ({ ...prev, LabelId: LabelId }));
      setBindToolData((prev) => ({ ...prev, LabelSn: LabelSn }));
    }
    if (key === "tool") {
      setBindToolData((prev) => ({ ...prev, ToolSn: ToolSn }));
    }
  };

  const handleInputBindData = (key: string, value: string | number) => {
    setBindToolData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    getELabelList();
    getToolList();
  }, []);

  return (
    <div className="h-full p-2 overflow-auto bg-gray-900 rounded-xl">
      <form
        className="flex flex-col justify-center w-full max-w-4xl p-4 mx-auto my-4 bg-gray-700 rounded-md "
        onSubmit={(e) => postBindTool(e)}
      >
        <h3 className="text-center ">領取刀具</h3>
        <div className="relative ">
          <label htmlFor="labelCode">標籤號碼</label>
          <input
            id="labelCode"
            type="text"
            list="labelCodeList"
            className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
            placeholder="標籤號碼"
            value={bindToolData.LabelId}
            onChange={(e) => handleInputBindData("LabelId", e.target.value)}
          />
          <datalist
            id="labelCodeList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>
        <div className="relative ">
          <label htmlFor="eLabelSN">電子標籤SN</label>
          <input
            type="text"
            id="eLabelSN"
            list="labelList"
            placeholder="電子標籤SN"
            className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
            value={bindToolData.LabelSn}
            onChange={(e) => handleInputBindData("LabelSn", e.target.value)}
          />
          <datalist
            id="labelList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>

        <div className="relative ">
          <label htmlFor="toolSN">刀具SN</label>
          <input
            id="toolSN"
            type="text"
            list="toolSNList"
            className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
            placeholder="刀具SN"
            value={bindToolData.ToolSn}
            onChange={(e) => handleInputBindData("ToolSn", e.target.value)}
          />
          <datalist
            id="toolSNList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>
        <button className="p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          綁定標籤
        </button>
      </form>
      {/* data area */}
      <div className="flex gap-4 ">
        <div className="w-full p-2 overflow-auto text-center bg-gray-700 rounded-md h-[28rem]">
          <h3 className="my-4">未綁定標籤</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500">
                <th className="p-1 whitespace-nowrap">標籤號碼</th>
                <th className="p-1 whitespace-nowrap">標籤SN</th>
              </tr>
            </thead>
            <tbody>
              {eLabeList.map((item) => (
                <tr
                  key={item.LabelId}
                  className="cursor-pointer hover:bg-gray-600"
                  onClick={() =>
                    handleClickBindData(
                      "eLabel",
                      item.LabelId,
                      item.LabelSn,
                      ""
                    )
                  }
                >
                  <td className="p-1 whitespace-nowrap">{item.LabelId}</td>
                  <td className="p-1 whitespace-nowrap">{item.LabelSn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full p-2 overflow-auto text-center bg-gray-700 rounded-md h-[28rem]">
          <h3 className="my-4">未綁定刀具</h3>
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500">
                <th className="p-1 whitespace-nowrap">刀具 SN</th>
                <th className="p-1 whitespace-nowrap">刀具規格 ID</th>
                <th className="p-1 whitespace-nowrap">刀具規格名稱</th>
              </tr>
            </thead>
            <tbody>
              {toolList.map((item: any) => (
                <tr
                  key={item.ToolSn}
                  className="cursor-pointer hover:bg-gray-600"
                  onClick={() => handleClickBindData("tool", "", "", item)}
                >
                  <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecId}</td>
                  <td className="p-1 whitespace-nowrap">{item.ToolSpecName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
