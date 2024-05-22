"use client";

import { FormEvent, useEffect, useState } from "react";
import { toolStockStatusInfo } from "./action";

import { useNotice } from "@/components/context/NoticeContext";
import ReturnToolFrom from "@/components/returnTool/retrunToolForm";
import {
  GetBindLabelListResponse,
  LabelBindItem,
} from "@/components/returnTool/types";
import {
  GetStorageListResponse,
  StorageItem,
} from "@/components/storage/types";
import SweetAlert from "@/components/sweetAlert";
import {
  apiDeleteBindLabel,
  apiGetBindLabelList,
} from "@/scripts/Apis/receiveTool/receiveTool";
import {
  apiRepairTool,
  apiScrapTool,
} from "@/scripts/Apis/repairAndScrap/repairAndScrap";
import { apiGetStorageList } from "@/scripts/Apis/storage/storageApi";
import { ApiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApi";
import { AlertColor } from "@mui/material";
export default function Page() {
  const { setShowNotice } = useNotice();
  const [bindLabelList, setBindLabelList] = useState<LabelBindItem[]>([]);
  const [handleToolReturnIndex, setHandleToolReturnIndex] =
    useState<number>(-1);
  const [userList, setUserList] = useState<any[]>([]);
  const [storageList, setStorageList] = useState<StorageItem[]>([]);
  const [returnType, setReturnType] = useState<string>("");
  const [returnMode, setReturnMode] = useState<boolean>(false);
  const [returnData, setReturnData] = useState({
    RevertorId: "",
    LToolCode: 0,
    StorageId: 0,
    ToolSn: "",
  });

  const getBindLabelList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      throw new Error("Maximum retry count reached");
    }
    try {
      const data = await apiGetBindLabelList();
      const res = data as GetBindLabelListResponse;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("bindtooldata", res);
      if (reqInt === 0) {
        setBindLabelList(res.data.Values.LabelBindList);
        return res.data.Values.LabelBindList;
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      getBindLabelList(count + 1);
      console.error("Error", error);
    }
  };

  const getUserList = async () => {
    const data = await ApiGetUserInfoList();
    const res = data as any;
    console.log("user list ", res);

    setUserList(res.data?.Values?.UserAccountList);
  };

  const getStorageList = async () => {
    const data = await apiGetStorageList();
    const res = data as GetStorageListResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    console.log("storage list", res);
    if (reqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    }
  };

  const postDisableLabelBindTool = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const res: any = await apiDeleteBindLabel(returnData);
    const reqInt = res.data?.Values?.ReqInt;
    console.log("disable label bind tool", res);
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
    const returnToolReqInt = await postDisableLabelBindTool();
    if (returnToolReqInt === 0) {
      const res: any = await apiRepairTool(returnData);
      const reqInt = res.data?.Values?.ReqInt;
      console.log("repair tool", res);

      if (reqInt === 0) {
        getBindLabelList();
        handleNotice("success", true, "送修成功");
      } else {
        handleNotice("error", true, `送修失敗，errorCode = ${reqInt}`);
      }
    } else {
      handleNotice("error", true, `送修失敗，errorCode = ${returnToolReqInt}`);
    }
  };

  const postScrapTool = async (e: FormEvent) => {
    e.preventDefault();
    const returnToolReqInt = await postDisableLabelBindTool();
    if (returnToolReqInt === 0) {
      const res: any = await apiScrapTool(returnData);
      const reqInt = res.data?.Values?.ReqInt;
      console.log("scrap tool", res);

      if (reqInt === 0) {
        getBindLabelList();
        handleNotice("success", true, "報廢成功");
      } else {
        handleNotice("error", true, `報廢失敗，errorCode = ${reqInt}`);
      }
    } else {
      handleNotice("error", true, `報廢失敗，errorCode = ${returnToolReqInt}`);
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const bindLabelList = await getBindLabelList();

      if (!bindLabelList) {
        return;
      }
      const searchResult = bindLabelList?.filter((item: LabelBindItem) => {
        return (
          // search by labelCode ToolSn and Receiver
          item.LabelSpec.AimsSpec.LabelCode.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.ToolSn.toLowerCase().includes(value.toLowerCase()) ||
          item.ReceiptorInfo?.UserName.toLowerCase().includes(
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

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  useEffect(() => {
    getBindLabelList();
    getUserList();
    getStorageList();
  }, []);

  useEffect(() => {
    console.log(returnData);
  }, [returnData]);

  return (
    <div className="relative w-full p-2 mr-4 overflow-auto rounded-md ">
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
                      {item.ReceiptorInfo.UserName}
                    </td>

                    <td className="p-1 whitespace-nowrap">
                      {`${toolStockStatusInfo(item.ToolStatusInfo.ToolStatus)} / - `}
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
