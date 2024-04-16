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
  const [inputUnbindTool, setInputUnbindTool] = useState<string>("");
  const [inputUnbindLabel, setInputUnbindLabel] = useState<string>("");

  const getELabelList = async () => {
    const data = await apiGetELabelList();
    const res = data as GetELabelListResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setELabelList(filterUnbindLabel(res.data.Values.LabelList));
      return res.data.Values.LabelList;
    }
  };

  const getToolList = async () => {
    const data = await apiGetToolStockList();
    const res = data as GetToolStockListResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setToolList(filterToolStatus(res.data.Values.ToolStockList));
      return res.data.Values.ToolStockList;
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

  const searchUnbindTool = async (e: FormEvent) => {
    e.preventDefault();

    const toolData = await getToolList();

    const filterData = toolData.filter((item: ToolStockItem) => {
      return (
        item.ToolTypeData.Name.includes(inputUnbindTool) ||
        item.ToolSn.includes(inputUnbindTool) ||
        item.ToolSpecName.includes(inputUnbindTool)
      );
    });
    setToolList(filterToolStatus(filterData));
  };

  const searchUnbindLabel = async (e: FormEvent) => {
    e.preventDefault();

    const data: LabelItem[] | undefined = await getELabelList();
    if (data) {
      const filterData = data.filter((item: LabelItem) => {
        return (
          item.LabelId.toLowerCase().includes(inputUnbindLabel.toLowerCase()) ||
          item.LabelSn.toLowerCase().includes(
            inputUnbindLabel.toLocaleLowerCase()
          )
        );
      });
      setELabelList(filterUnbindLabel(filterData));
    }
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
      <div className="p-2 my-4 bg-gray-700 rounded-md ">
        <h3 className="font-bold text-left ">領取刀具</h3>
        <form
          className="grid grid-cols-5 gap-2 "
          onSubmit={(e) => postBindTool(e)}
        >
          <div className="relative ">
            <label htmlFor="labelCode">標籤號碼</label>
            <input
              id="labelCode"
              type="text"
              list="labelCodeList"
              className="w-full p-1 text-black rounded-md"
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
              className="w-full p-1 text-black rounded-md"
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
              className="w-full p-1 text-black rounded-md"
              placeholder="刀具SN"
              value={bindToolData.ToolSn}
              onChange={(e) => handleInputBindData("ToolSn", e.target.value)}
            />
            <datalist
              id="toolSNList"
              className="absolute top-0 left-0 "
            ></datalist>
          </div>
          <div>
            <label htmlFor="receiver">領取人</label>
            <input
              type="text"
              id="receiver"
              className="w-full p-1 text-black rounded-md"
              placeholder="領取人"
            />
          </div>
          <button className="p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-900">
            綁定標籤
          </button>
        </form>
      </div>
      {/* label */}
      <div className="flex h-full gap-4 ">
        <div className="w-full p-2 overflow-auto text-center bg-gray-700 rounded-md ">
          <form className="mx-24 my-4" onSubmit={(e) => searchUnbindLabel(e)}>
            <h3 className="my-4">未綁定標籤</h3>
            <input
              type="search"
              className="w-full p-2 text-black rounded-md "
              placeholder="搜尋標籤"
              value={inputUnbindLabel}
              onChange={(e) => setInputUnbindLabel(e.target.value)}
            />
          </form>

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
        {/* tool */}
        <div className="w-full p-2 overflow-auto text-center bg-gray-700 rounded-md">
          <h3 className="my-4">未綁定刀具</h3>
          <form
            className="flex items-center justify-center gap-2 mx-24 my-4"
            onSubmit={(e) => searchUnbindTool(e)}
          >
            <input
              type="search"
              id="search"
              className="w-full p-2 text-black rounded-md"
              placeholder="搜尋刀具"
              value={inputUnbindTool}
              onChange={(e) => setInputUnbindTool(e.target.value)}
            />
          </form>

          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500">
                <th className="p-1 whitespace-nowrap">刀具類型</th>
                <th className="p-1 whitespace-nowrap">刀具規格</th>
                <th className="p-1 whitespace-nowrap">刀具 SN</th>
              </tr>
            </thead>
            <tbody>
              {toolList.length > 0 ? (
                toolList.map((item: ToolStockItem) => (
                  <tr
                    key={item.ToolSn}
                    className="cursor-pointer hover:bg-gray-600"
                    onClick={() =>
                      handleClickBindData("tool", "", "", item.ToolSn)
                    }
                  >
                    <td className="p-1 whitespace-nowrap">
                      {item.ToolTypeData.Name}
                    </td>
                    <td className="p-1 whitespace-nowrap">
                      {item.ToolSpecName}
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>
                    無此刀具... <br />
                    <span className="text-blue-500 cursor-pointer">
                      新增庫存?
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
