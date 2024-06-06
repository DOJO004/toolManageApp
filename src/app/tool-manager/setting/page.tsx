"use client";
import { formatPercent } from "@/components/machineInfo/functions";
import NewNotifyForm from "@/components/setting/newNotifyForm";
import {
  apiGetNotifyList,
  apiGetToolSpecList,
  apiNewNotify,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import {
  EditNotifyItem,
  NewNotifyItem,
  NotifyItem,
  ToolSpecItem,
} from "@/scripts/Apis/toolInfo/types";
import { useHandleNotice } from "@/scripts/notice";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [notifyList, setNotifyList] = useState<NotifyItem[]>([]);
  const [newNotify, setNewNotify] = useState<NewNotifyItem>({
    ToolSpecId: "",
    NotifyActions: -1,
    NotifyPercent: 0,
    TokenName: "",
    Token: "",
    Recipient: "",
    MailAddress: "",
  });
  const [newNotifyMode, setNewNotifyMode] = useState(false);
  const [editNotify, setEditNotify] = useState<EditNotifyItem>(
    {} as EditNotifyItem
  );

  const getNotifyList = async () => {
    setNotifyList(await apiGetNotifyList());
  };
  const getToolSpecList = async () => {
    setToolSpecList(await apiGetToolSpecList());
  };

  const postNotify = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiNewNotify(newNotify);
    if (reqInt === 0) {
      cleanNewNotify();
      handleNotice("success", true, "新增通知成功");
    } else {
      handleNotice("error", true, `新增失敗。error ${reqInt}`);
    }
  };

  const handleNewNotify = (key: string, value: string | number) => {
    setNewNotify((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewNotifyMode = (typeNumber: number) => {
    if (newNotify.NotifyActions !== typeNumber) {
      setNewNotifyMode(true);
    } else {
      setNewNotifyMode(!newNotifyMode);
    }
    cleanNewNotify();
    handleNewNotify("NotifyActions", typeNumber);
  };

  const cleanNewNotify = () => {
    setNewNotify({
      ToolSpecId: "",
      NotifyActions: 0,
      NotifyPercent: 0,
      TokenName: "",
      Token: "",
      Recipient: "",
      MailAddress: "",
    });
  };

  useEffect(() => {
    getNotifyList();
    getToolSpecList();
  }, []);

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-center">設定</h1>
      <div className="flex items-center mt-4 border-b-2">
        <Image
          src="/icons/notification.svg"
          alt="notification svg"
          width={24}
          height={24}
        />
        <p>通知設定</p>
      </div>
      <div className="flex gap-2 my-2">
        <button
          className={`flex items-center p-1 border rounded-md hover:bg-indigo-500 ${newNotifyMode && newNotify.NotifyActions === 0 ? "bg-indigo-500" : ""}`}
          onClick={() => {
            handleNewNotifyMode(0);
          }}
        >
          <Image src="/icons/add.svg" alt="add" width={24} height={24} />
          <p>Line</p>
        </button>
        <button
          className={`flex items-center p-1 border rounded-md hover:bg-indigo-500 ${newNotifyMode && newNotify.NotifyActions === 1 ? "bg-indigo-500" : ""}`}
          onClick={() => {
            handleNewNotifyMode(1);
          }}
        >
          <Image src="/icons/add.svg" alt="add" width={24} height={24} />
          <p>Email</p>
        </button>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${newNotifyMode ? "h-44" : "h-0"}`}
      >
        <NewNotifyForm
          postNotify={postNotify}
          newNotify={newNotify}
          handleNewNotify={handleNewNotify}
          toolSpecList={toolSpecList}
        />
      </div>
      <div className="mt-4 overflow-auto text-center bg-gray-900 rounded-md min-h-96">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1">刀具規格</th>
              <th className="p-1">通知百分比</th>
              <th className="p-1">通知方式</th>
              <th className="p-1">編輯</th>
            </tr>
          </thead>
          <tbody>
            {notifyList.length > 0 ? (
              notifyList.map((item) => (
                <tr key={item.ParameterNo}>
                  <td className="p-1">{item.ToolSpecInfo.Name}</td>
                  <td className="p-1">{formatPercent(item.NotifyPercent)}%</td>
                  <td className="p-1">
                    {item.LineTokenList ? "Line" : ""} /{" "}
                    {item.MailAddressList ? "Email" : ""}
                  </td>
                  <td className="p-1">
                    <button className="p-1 rounded-md hover:bg-indigo-500">
                      編輯
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  no data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
