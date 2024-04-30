"use client";

import { fakeData } from "@/scripts/Apis/receiveTool/fakeReceiveData";
import { useEffect, useState } from "react";

import {
  DeleteBindLabelResponse,
  GetBindLabelListResponse,
  LabelBindItem,
} from "@/app/components/returnTool/types";
import {
  apiDeleteBindLabel,
  apiGetBindLabelList,
} from "@/scripts/Apis/receiveTool/receiveTool";
export default function Page() {
  const [bindLabelList, setBindLabelList] = useState<LabelBindItem[]>([]);
  const [handleToolReturnIndex, setHandleToolReturnIndex] =
    useState<number>(-1);

  const getBindLabelList = async () => {
    const data = await apiGetBindLabelList();
    const res = data as GetBindLabelListResponse;
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setBindLabelList(res.data.Values.LabelBindList);
    }
  };

  const repairTool = () => {
    const confirm = window.confirm("確定要送修嗎?");
    if (!confirm) return;
    alert("送修功能尚未開放");
  };

  const scrapTool = () => {
    const confirm = window.confirm("確定要報廢嗎?");
    if (!confirm) return;
    alert("報廢功能尚未開放");
  };

  const returnTool = async (item: LabelBindItem) => {
    const confirm = window.confirm(`確定要歸還${item.LToolCode}嗎?`);
    if (!confirm) return;
    const data = await apiDeleteBindLabel(item);
    const res = data as DeleteBindLabelResponse;
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      getBindLabelList();
    }
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
    // getBindLabelList();
  }, []);

  return (
    <div className="w-full h-screen p-2 mr-4 overflow-auto bg-gray-900 rounded-md">
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
                      {item.ToolStatus}
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
