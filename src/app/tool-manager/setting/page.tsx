"use client";
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
    NotifyActions: [],
    NotifyPercent: 0,
    LineTokenList: [],
    MailAddressList: [],
  });
  const [newNotifyMode, setNewNotifyMode] = useState(false);
  const [editNotify, setEditNotify] = useState<EditNotifyItem>(
    {} as EditNotifyItem
  );
  const [lineForms, setLineForms] = useState<number[]>([]);
  const [emailForms, setEmailForms] = useState<number[]>([]);

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
      getNotifyList();
      cleanNewNotify();
      handleNotice("success", true, "新增通知成功");
    } else {
      handleNotice("error", true, `新增失敗。error ${reqInt}`);
    }
  };

  const addLineForm = () => {
    setLineForms([...lineForms, lineForms.length]);
    setNewNotify((prevState) => ({
      ...prevState,
      LineTokenList: [...prevState.LineTokenList, { TokenName: "", Token: "" }],
    }));
    if (newNotify.NotifyActions.includes(0)) {
      return;
    } else {
      setNewNotify((prevState) => ({
        ...prevState,
        NotifyActions: [...prevState.NotifyActions, 0],
      }));
    }
  };

  const addEmailForm = () => {
    setEmailForms([...emailForms, emailForms.length]);
    setNewNotify((prevState) => ({
      ...prevState,
      MailAddressList: [
        ...prevState.MailAddressList,
        { Recipient: "", MailAddress: "" },
      ],
    }));
    if (newNotify.NotifyActions.includes(1)) {
      return;
    } else {
      setNewNotify((prevState) => ({
        ...prevState,
        NotifyActions: [...prevState.NotifyActions, 1],
      }));
    }
  };

  const handleLineFormChange = (index: number, key: string, value: string) => {
    const updatedLineTokenList = [...newNotify.LineTokenList];
    updatedLineTokenList[index] = {
      ...updatedLineTokenList[index],
      [key]: value,
    };
    setNewNotify({ ...newNotify, LineTokenList: updatedLineTokenList });
  };

  const handleEmailFormChange = (index: number, key: string, value: string) => {
    const updatedMailAddressList = [...newNotify.MailAddressList];
    updatedMailAddressList[index] = {
      ...updatedMailAddressList[index],
      [key]: value,
    };
    setNewNotify({ ...newNotify, MailAddressList: updatedMailAddressList });
  };

  const handleNewNotify = (key: string, value: string | number) => {
    setNewNotify((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewNotifyMode = (typeNumber: number) => {};

  const cleanNewNotify = () => {
    setNewNotify({
      ToolSpecId: "",
      NotifyActions: [],
      NotifyPercent: 0,
      LineTokenList: [],
      MailAddressList: [],
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
      <button className="flex p-1 mt-4 border rounded-md ">
        <Image src="/icons/add.svg" alt="add" width={24} height={24} />
        <label htmlFor="">新增</label>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden h-auto`}
      >
        <div className="items-center p-4 mt-4 bg-gray-900 rounded-md ">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="toolSpec">刀具規格</label>
              <select
                id="toolSpec"
                value={newNotify.ToolSpecId}
                className="w-full p-1 text-center text-black rounded-md"
                onChange={(e) => handleNewNotify("ToolSpecId", e.target.value)}
              >
                <option value="" className="text-gray-300">
                  選擇刀具規格
                </option>
                {toolSpecList.map((item) => (
                  <option
                    key={item.ToolSpecId}
                    value={item.ToolSpecId}
                    className="text-black"
                  >
                    {item.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="notifyPercent">通知百分比</label>
              <input
                id="notifyPercent"
                type="number"
                placeholder="輸入百分比"
                className="w-full p-1 text-center text-black rounded-md"
                value={newNotify.NotifyPercent}
                onChange={(e) =>
                  handleNewNotify("NotifyPercent", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <button
                className="flex items-center p-1 border rounded-md hover:bg-indigo-500 "
                onClick={() => addLineForm()}
              >
                <Image
                  src={"/icons/add.svg"}
                  alt="add"
                  width={24}
                  height={24}
                />
                Line
              </button>

              {
                // line form list
                lineForms.map((index) => (
                  <div
                    key={index}
                    className="relative p-4 mt-2 border rounded-md"
                  >
                    <div>
                      <label htmlFor={`lineName${index}`}>Line 名稱</label>
                      <input
                        type="text"
                        id={`lineName${index}`}
                        className="w-full p-1 text-center text-black rounded-md"
                        value={newNotify.LineTokenList[index]?.TokenName || ""}
                        onChange={(e) =>
                          handleLineFormChange(
                            index,
                            "TokenName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor={`lineToken${index}`}>Line Token</label>
                      <input
                        type="text"
                        id={`lineToken${index}`}
                        className="w-full p-1 text-center text-black rounded-md"
                        value={newNotify.LineTokenList[index]?.Token || ""}
                        onChange={(e) =>
                          handleLineFormChange(index, "Token", e.target.value)
                        }
                      />
                    </div>

                    <button
                      className="absolute top-2 right-2 hover:scale-110"
                      onClick={() =>
                        setLineForms((prev) => prev.filter((i) => i !== index))
                      }
                    >
                      <Image
                        src={"/icons/delete.svg"}
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                ))
              }
            </div>
            <div>
              <button
                className="flex items-center p-1 border rounded-md hover:bg-indigo-500"
                onClick={() => addEmailForm()}
              >
                <Image
                  src={"/icons/add.svg"}
                  alt="add"
                  width={24}
                  height={24}
                />
                Email
              </button>
              {
                // mail form list
                emailForms.map((index) => (
                  <div
                    key={index}
                    className="relative p-4 mt-2 border rounded-md"
                  >
                    <div>
                      <label htmlFor={`mailName${index}`}>收件人</label>
                      <input
                        type="text"
                        id="mailName"
                        className="w-full p-1 text-center text-black rounded-md"
                        value={
                          newNotify.MailAddressList[index]?.Recipient || ""
                        }
                        onChange={(e) =>
                          handleEmailFormChange(
                            index,
                            "Recipient",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor={`mailAddress${index}`}>郵件地址</label>
                      <input
                        type="email"
                        id={`mailAddress${index}`}
                        className="w-full p-1 text-center text-black rounded-md"
                        value={
                          newNotify.MailAddressList[index]?.MailAddress || ""
                        }
                        onChange={(e) =>
                          handleEmailFormChange(
                            index,
                            "MailAddress",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <button
                      className="absolute top-2 right-2 hover:scale-110"
                      onClick={() =>
                        setEmailForms((prev) => prev.filter((i) => i !== index))
                      }
                    >
                      <Image
                        src={"/icons/delete.svg"}
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
          <button
            className="w-full p-1 mt-4 bg-indigo-500 rounded-md"
            onClick={(e) => postNotify(e)}
          >
            新增
          </button>
        </div>
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
                  <td className="p-1">{item.NotifyPercent} %</td>
                  <td className="p-1">
                    {item.NotifyActions.includes(0) ? "Line" : ""}
                    {item.NotifyActions.includes(1) ? "Email" : ""}
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
