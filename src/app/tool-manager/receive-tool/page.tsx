"use client";
import {
  apiBindELabelInfo,
  apiGetELabelList,
} from "@/scripts/Apis/eLabelInfo/eLabelInfoApis";
import { BindToolDataItem, LabelItem } from "@/scripts/Apis/eLabelInfo/types";
import { apiGetToolStockList } from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolStockItem } from "@/scripts/Apis/toolInfo/types";
import { UserAccountItem } from "@/scripts/Apis/userInfo/types";
import { apiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [bindToolData, setBindToolData] = useState<BindToolDataItem>({
    ReceiptorId: "",
    LabelCode: "",
    LabelId: "",
    LabelSn: "",
    ToolSn: "",
  });
  const [eLabeList, setELabelList] = useState<LabelItem[]>([]);
  const [toolList, setToolList] = useState<ToolStockItem[]>([]);
  const [userList, setUserList] = useState<UserAccountItem[]>([]);
  const [inputUnbindTool, setInputUnbindTool] = useState<string>("");
  const [inputUnbindLabel, setInputUnbindLabel] = useState<string>("");
  const [selectLabel, setSelectLabel] = useState<number>(-1);
  const [selectTool, setSelectToll] = useState<number>(-1);

  const getELabelList = async () => {
    setELabelList(filterUnbindLabel(await apiGetELabelList()));
  };

  const getToolList = async () => {
    setToolList(filterToolStatus(await apiGetToolStockList(0)));
  };

  const getUserList = async () => {
    setUserList(await apiGetUserInfoList());
  };

  const postBindTool = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiBindELabelInfo(bindToolData);
    if (reqInt === 0) {
      getELabelList();
      getToolList();
      cleanBindToolData();
      cleanSelectData();
      handleNotice("success", true, "綁定成功");
    } else {
      handleNotice("error", true, `綁定失敗。errorCode = ${reqInt}`);
    }
  };

  const cleanBindToolData = () => {
    setBindToolData({
      ReceiptorId: "",
      LabelCode: "",
      LabelId: "",
      LabelSn: "",
      ToolSn: "",
    });
  };

  const cleanSelectData = () => {
    setSelectLabel(-1);
    setSelectToll(-1);
  };

  const filterUnbindLabel = (data: LabelItem[]) =>
    data.filter((item) => item.BindStatus === "Unbinding");

  const filterToolStatus = (data: ToolStockItem[]) =>
    data.filter(
      (item) =>
        item.LifeStatus === "Normal" && item.PositionData.PositionStatus === 0
    );

  const searchUnbindTool = async (e: FormEvent) => {
    e.preventDefault();

    const toolData = await apiGetToolStockList(0);

    if (toolData) {
      const filterData = toolData.filter((item: ToolStockItem) => {
        return (
          item.ToolTypeData.Name.includes(inputUnbindTool) ||
          item.ToolSn.includes(inputUnbindTool) ||
          item.ToolSpecName.includes(inputUnbindTool)
        );
      });
      setToolList(filterToolStatus(filterData));
    }
  };

  const searchUnbindLabel = async (e: FormEvent) => {
    e.preventDefault();

    const data = await apiGetELabelList();
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

  const handleClickBindData = (params: {
    key: string;
    index: number;
    LabelId?: string;
    LabelCode?: string;
    LabelSn?: string;
    ToolSn?: string;
  }) => {
    const { key, index, LabelId, LabelCode, LabelSn, ToolSn } = params;

    if (key === "eLabel" && LabelId && LabelCode && LabelSn) {
      setBindToolData((prev) => ({ ...prev, LabelId: LabelId }));
      setBindToolData((prev) => ({ ...prev, LabelSn: LabelSn }));
      setBindToolData((prev) => ({ ...prev, LabelCode: LabelCode }));
      setSelectLabel(index);
    }
    if (key === "tool" && ToolSn) {
      setBindToolData((prev) => ({ ...prev, ToolSn: ToolSn }));
      setSelectToll(index);
    }
  };

  const handleInputBindData = (key: string, value: string | number) => {
    setBindToolData((prev) => ({ ...prev, [key]: value }));
  };

  const hintLabelCodeImage = () => {
    Swal.fire({
      title: "看這邊😀",
      imageUrl: "/label hint.png",
      imageWidth: 500,
      imageHeight: 300,
      imageAlt: "Custom image",
    });
  };

  useEffect(() => {
    getELabelList();
    getToolList();
    getUserList();
  }, []);

  return (
    <div className="relative p-2 ">
      <div className="sticky p-2 my-4 bg-gray-900 rounded-md top-4 ">
        <h3 className="font-bold text-left ">領取刀具</h3>
        <form onSubmit={(e) => postBindTool(e)}>
          <div className="grid grid-cols-4 gap-2 ">
            <div className="relative ">
              <div className="flex items-end ">
                <label htmlFor="labelCode">標籤號碼</label>
                <Image
                  src={"/bulb.png"}
                  width={30}
                  height={30}
                  alt="hit"
                  onClick={() => hintLabelCodeImage()}
                  className="p-1 mx-1 bg-gray-500 rounded-full cursor-pointer hover:bg-yellow-400"
                />
              </div>
              <input
                id="labelCode"
                type="text"
                list="labelCodeList"
                className="w-full p-2 text-black rounded-md"
                placeholder="標籤號碼"
                value={bindToolData.LabelCode}
                onChange={(e) =>
                  handleInputBindData("LabelCode", e.target.value)
                }
                readOnly
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
                className="w-full p-2 text-black rounded-md"
                value={bindToolData.LabelSn}
                onChange={(e) => handleInputBindData("LabelSn", e.target.value)}
                readOnly
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
                className="w-full p-2 text-black rounded-md"
                placeholder="刀具SN"
                value={bindToolData.ToolSn}
                onChange={(e) => handleInputBindData("ToolSn", e.target.value)}
                readOnly
              />
              <datalist
                id="toolSNList"
                className="absolute top-0 left-0 "
              ></datalist>
            </div>
            <div>
              <label htmlFor="receiver">領取人</label>
              <select
                value={bindToolData.ReceiptorId}
                className="w-full p-2 text-black rounded-md"
                onChange={(e) =>
                  handleInputBindData("ReceiptorId", e.target.value)
                }
              >
                <option value="" className="text-gray-400">
                  選擇領取人
                </option>
                {userList.map((item) => (
                  <option
                    key={item.AccountId}
                    value={item.AccountId}
                    className="text-black"
                  >
                    {item.UserName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="w-full p-1 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
            綁定標籤
          </button>
        </form>
      </div>
      {/* label */}
      <div className="flex gap-4 ">
        <div className="w-full px-2 overflow-auto text-center bg-gray-900 rounded-md max-h-[700px] ">
          <form className="w-full my-4" onSubmit={(e) => searchUnbindLabel(e)}>
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
              {eLabeList.map((item, index) => (
                <tr
                  key={item.LabelId}
                  className={`cursor-pointer hover:bg-gray-600 ${selectLabel === index ? "bg-gray-600" : ""}`}
                  onClick={() =>
                    handleClickBindData({
                      key: "eLabel",
                      index: index,
                      LabelId: item.LabelId,
                      LabelCode: item.AimsSpec?.LabelCode,
                      LabelSn: item.LabelSn,
                    })
                  }
                >
                  <td className="p-1 whitespace-nowrap">
                    {item.AimsSpec?.LabelCode}
                  </td>
                  <td className="p-1 whitespace-nowrap">{item.LabelSn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* tool */}
        <div className="w-full px-2 overflow-auto text-center bg-gray-900 rounded-md max-h-[700px]">
          <div className="sticky top-0 py-4 bg-gray-900">
            <h3>未綁定刀具</h3>
            <form
              className="flex items-center justify-center w-full gap-2 mt-4"
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
          </div>
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
                toolList.map((item: ToolStockItem, index) => (
                  <tr
                    key={item.ToolSn}
                    className={`cursor-pointer hover:bg-gray-600 ${selectTool === index ? "bg-gray-600" : ""}`}
                    onClick={() =>
                      handleClickBindData({
                        key: "tool",
                        ToolSn: item.ToolSn,
                        index: index,
                      })
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
                    <Link
                      href="/tool-manager/tool-info/tool-stock"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      新增庫存?
                    </Link>
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
