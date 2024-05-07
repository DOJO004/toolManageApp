"use client";

import { fakeData } from "@/scripts/Apis/receiveTool/fakeReceiveData";
import { useEffect, useState } from "react";

import { LabelBindItem } from "@/app/components/returnTool/types";
import SweetAlert, { SweetAlertSelect } from "@/app/components/sweetAlert";
import { apiGetBindLabelList } from "@/scripts/Apis/receiveTool/receiveTool";
import { ApiGetUserInfoList } from "@/scripts/Apis/userInfo/userInfoApi";
export default function Page() {
  const [bindLabelList, setBindLabelList] = useState<LabelBindItem[]>([]);
  const [handleToolReturnIndex, setHandleToolReturnIndex] =
    useState<number>(-1);
  const [userList, setUserList] = useState<any[]>([]);

  const getBindLabelList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      throw new Error("Maximum retry count reached");
    }
    try {
      const data = await apiGetBindLabelList();
      const res = data as any;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log(res);
      if (reqInt === 0) {
        setBindLabelList(res.data.Values.LabelBindList);
      } else {
        SweetAlert(reqInt, "請求失敗");
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

    setUserList(res.data.Values.UserAccountList);
  };

  const getUserOptions = () => {
    const option: { [key: string]: string } = {};
    userList.forEach((item) => {
      option[item.AccountId] = item.UserName;
    });
    return option;
  };

  const repairTool = () => {
    const option = getUserOptions();
    SweetAlertSelect("選擇送修人員", option);
  };

  const scrapTool = () => {
    const option = getUserOptions();
    SweetAlertSelect("選擇報廢人員", option);
  };

  const returnTool = async (item: LabelBindItem) => {
    const option = getUserOptions();
    SweetAlertSelect("選擇歸還人員", option);
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchTool = (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      // const data = await apiGetBindLabelList();
      const searchResult = fakeData.filter((item) => {
        return (
          // search by LToolCode ToolSn and Receiver
          item.LToolCode.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          item.ToolSn.toLowerCase().includes(value.toLowerCase()) ||
          item.receiver.toLowerCase().includes(value.toLowerCase())
        );
      });
      setBindLabelList(searchResult);
    }, 500);
  };

  const setToolStatusColor = (status: string) => {
    switch (status) {
      case "Normal":
        return "text-green-500";
      case "Warning":
        return "text-yellow-500";
      case "Alert":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const setToolStatusText = (status: string) => {
    switch (status) {
      case "Normal":
        return "正常";
      case "Warning":
        return "危險";
      case "Alert":
        return "警告";
      default:
        return " -";
    }
  };

  const sortByToolStatus = (data: LabelBindItem[]) => {
    const sortTable: { [key: string]: number } = {
      Normal: 3,
      Warning: 2,
      Alert: 1,
    };

    return data.sort((a, b) => {
      return sortTable[a.ToolStatus] - sortTable[b.ToolStatus];
    });
  };

  const handleToolReturn = (index: number) => {
    setHandleToolReturnIndex(index);
  };
  useEffect(() => {
    setBindLabelList(sortByToolStatus(fakeData)); // for test
    getBindLabelList();
    getUserList();
  }, []);

  return (
    <div className="w-full  p-2 mr-4 overflow-auto bg-gray-900 rounded-md">
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
        <div className="overflow-auto text-center bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead>
              <tr className="font-bold bg-indigo-500">
                <td className="p-2 whitespace-nowrap">標籤號碼</td>
                <td className="p-2 whitespace-nowrap">刀具SN</td>
                <td className="p-2 whitespace-nowrap">刀具狀態</td>
                <td className="p-2 whitespace-nowrap">領取人</td>
                <td className="p-2 whitespace-nowrap">歸還</td>
              </tr>
            </thead>
            <tbody>
              {bindLabelList.length > 0 ? (
                bindLabelList.map((item: LabelBindItem, index: number) => (
                  <tr key={index} className="hover:bg-gray-500">
                    <td className="p-1 whitespace-nowrap">{item.LToolCode}</td>
                    <td className="p-1 whitespace-nowrap">{item.ToolSn}</td>
                    <td
                      className={`p-1 whitespace-nowrap ${setToolStatusColor(
                        item.ToolStatus
                      )}`}
                    >
                      {setToolStatusText(item.ToolStatus)}
                    </td>

                    <td className="p-1 whitespace-nowrap">{item.receiver}</td>
                    {}
                    <td>
                      {handleToolReturnIndex === index ? (
                        <>
                          <button
                            className="w-12 h-12 p-1 mx-2 bg-green-500 rounded-md hover:bg-green-600"
                            onClick={() => returnTool(item)}
                          >
                            入庫
                          </button>
                          <button
                            className="w-12 h-12 p-1 mx-2 rounded-md hover:bg-amber-600 bg-amber-500"
                            onClick={() => repairTool()}
                          >
                            送修
                          </button>
                          <button
                            className="w-12 h-12 p-1 mx-2 bg-red-500 rounded-md hover:bg-red-600"
                            onClick={() => scrapTool()}
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
