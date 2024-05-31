"use client";

import { FormEvent, useEffect, useState } from "react";
import { toolStockStatusInfo } from "./action";

import ReturnToolFrom from "@/components/returnTool/retrunToolForm";

import {
  apiDeleteLabelBindInfo,
  apiGetBindLabelList,
} from "@/scripts/Apis/eLabelInfo/eLabelInfoApis";
import { LabelBindItem, ReturnDataItem } from "@/scripts/Apis/eLabelInfo/types";

import {
  apiGetStorageList,
  apiRepairTool,
  apiScrapTool,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import { StorageMenuItem } from "@/scripts/Apis/toolInfo/types";
import { apiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
export default function Page() {
  const handleNotice = useHandleNotice();
  const [bindLabelList, setBindLabelList] = useState<LabelBindItem[]>([]);
  const [handleToolReturnIndex, setHandleToolReturnIndex] =
    useState<number>(-1);
  const [userList, setUserList] = useState<any[]>([]);
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [returnType, setReturnType] = useState<string>("");
  const [returnMode, setReturnMode] = useState<boolean>(false);
  const [returnData, setReturnData] = useState<ReturnDataItem>({
    RevertorId: "",
    LToolCode: 0,
    StorageId: 0,
    ToolSn: "",
  });

  const getBindLabelList = async () => {
    setBindLabelList(await apiGetBindLabelList());
  };

  const getUserList = async () => {
    setUserList(await apiGetUserInfoList());
  };

  const getStorageList = async () => {
    setStorageList(await apiGetStorageList());
  };

  const postDisableLabelBindTool = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const reqInt = await apiDeleteLabelBindInfo(returnData);
    setReturnMode(false);

    if (reqInt === 0) {
      getBindLabelList();
      setHandleToolReturnIndex(-1);
      handleNotice("success", true, "歸還成功");
    } else {
      handleNotice("error", true, `歸還失敗，errorCode = ${reqInt}`);
    }
    return reqInt;
  };

  const postRepairTool = async (e: FormEvent) => {
    e.preventDefault();
    // const returnToolReqInt = await postDisableLabelBindTool();
    // if (returnToolReqInt === 0) {
    const reqInt = await apiRepairTool(returnData);
    if (reqInt === 0) {
      getBindLabelList();
      handleNotice("success", true, "送修成功");
      setReturnMode(false);
    } else {
      handleNotice("error", true, `送修失敗，errorCode = ${reqInt}`);
    }
    // } else {
    //   handleNotice("error", true, `送修失敗，errorCode = ${returnToolReqInt}`);
    // }
  };

  const postScrapTool = async (e: FormEvent) => {
    e.preventDefault();
    // const returnToolReqInt = await postDisableLabelBindTool();
    // if (returnToolReqInt === 0) {
    const reqInt = await apiScrapTool(returnData);
    if (reqInt === 0) {
      getBindLabelList();
      setReturnMode(false);
      handleNotice("success", true, "報廢成功");
    } else {
      handleNotice("error", true, `報廢失敗。errorCode = ${reqInt}`);
    }
    // } else {
    //   handleNotice("error", true, `報廢失敗。errorCode = ${returnToolReqInt}`);
    // }
  };

  // 搜尋
  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const bindLabelList = await apiGetBindLabelList();

      if (!bindLabelList) {
        return;
      }
      const searchResult = bindLabelList?.filter((item: LabelBindItem) => {
        return (
          item.LabelSpec.AimsSpec.LabelCode.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.ToolSn.toLowerCase().includes(value.toLowerCase()) ||
          item.ReceiptorInfo?.UserName.toLowerCase().includes(
            value.toLowerCase()
          ) ||
          item.ToolStatusInfo.MachineLoading.MachineName.toLocaleLowerCase().includes(
            value.toLowerCase()
          )
        );
      });
      setBindLabelList(searchResult);
    }, 500);
  };

  const handleToolReturn = (index: number) => {
    setHandleToolReturnIndex(index);
  };

  const handleClickReturn = (data: LabelBindItem) => {
    setReturnData({
      ...returnData,
      LToolCode: data.LToolCode,
      ToolSn: data.ToolSn,
    });
  };

  const handleReturnType = (key: string) => {
    setReturnType(key);
    setReturnMode(true);
  };

  const handleReturnData = (value: string | number, name: string) => {
    setReturnData({ ...returnData, [name]: value });
  };

  useEffect(() => {
    getBindLabelList();
    getUserList();
    getStorageList();
  }, []);

  return (
    <div className="relative w-full p-2 mr-4 overflow-auto rounded-md min-h-96">
      <div>
        <div className="my-4 ">
          <h3 className="text-center ">歸還刀具</h3>

          <input
            type="search"
            placeholder="搜尋刀具"
            className="flex p-2 mx-auto my-2 text-black rounded-md w-96 "
            onChange={(e) => searchTool(e.target.value)}
          />
        </div>
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${returnMode ? "block" : "hidden"}`}
        >
          {returnMode && (
            <ReturnToolFrom
              returnType={returnType}
              postDisableLabelBindTool={postDisableLabelBindTool}
              postRepairTool={postRepairTool}
              postScrapTool={postScrapTool}
              returnData={returnData}
              userList={userList}
              storageList={storageList}
              handleReturnData={handleReturnData}
              setReturnMode={setReturnMode}
            />
          )}
        </div>
        <div className="overflow-auto text-center bg-gray-900 rounded-md">
          <table className="w-full ">
            <thead>
              <tr className="font-bold bg-indigo-500">
                <td className="p-2 whitespace-nowrap">標籤號碼</td>
                <td className="p-2 whitespace-nowrap">刀具SN</td>
                <td className="p-2 whitespace-nowrap">領取人</td>
                <td className="p-2 whitespace-nowrap">狀態 / 位置</td>
                <td className="p-2 whitespace-nowrap">歸還</td>
              </tr>
            </thead>
            <tbody>
              {bindLabelList.length > 0 ? (
                bindLabelList.map((item: LabelBindItem, index: number) => (
                  <tr key={index} className="hover:bg-gray-500">
                    <td className="p-1 whitespace-nowrap">
                      {item.LabelSpec.AimsSpec.LabelCode}
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>

                    <td className="p-1 whitespace-nowrap">
                      {item.ReceiptorInfo?.UserName}
                    </td>

                    <td className="p-1 whitespace-nowrap">
                      {`${toolStockStatusInfo(item.ToolStatusInfo?.ToolStatus)} / ${item.ToolStatusInfo.MachineLoading.MachineName} `}
                    </td>

                    <td onClick={() => handleClickReturn(item)}>
                      {handleToolReturnIndex === index ? (
                        <>
                          <button
                            className="w-12 h-12 p-1 mx-2 bg-green-500 rounded-md hover:bg-green-600"
                            onClick={() => handleReturnType("return")}
                          >
                            入庫
                          </button>
                          <button
                            className="w-12 h-12 p-1 mx-2 rounded-md hover:bg-amber-600 bg-amber-500"
                            onClick={() => handleReturnType("repair")}
                          >
                            送修
                          </button>
                          <button
                            className="w-12 h-12 p-1 mx-2 bg-red-500 rounded-md hover:bg-red-600"
                            onClick={() => handleReturnType("scrap")}
                          >
                            報廢
                          </button>
                        </>
                      ) : (
                        <button
                          className="p-1 whitespace-nowrap hover:bg-indigo-600"
                          onClick={() => handleToolReturn(index)}
                        >
                          歸還
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan={4}>
                    no data...
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
