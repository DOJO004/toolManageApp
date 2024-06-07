"use client";
import NewNotifyForm from "@/components/setting/newNotifyForm";
import {
  apiDeleteNotify,
  apiEditNotify,
  apiGetNotifyList,
  apiGetToolSpecList,
  apiNewNotify,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import {
  NotifyDataItem,
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
  const [notifyData, setNotifyData] = useState<NotifyDataItem>({
    ParameterNo: 0,
    ToolSpecId: "",
    NotifyActions: [],
    NotifyPercent: 0,
    LineTokenList: [],
    MailAddressList: [],
  });
  const [newNotifyMode, setNewNotifyMode] = useState(false);
  const [lineForms, setLineForms] = useState<number[]>([]);
  const [emailForms, setEmailForms] = useState<number[]>([]);
  const [editNotifyMode, setEditNotifyMode] = useState(false);

  const getNotifyList = async () => {
    setNotifyList(await apiGetNotifyList());
  };
  const getToolSpecList = async () => {
    setToolSpecList(await apiGetToolSpecList());
  };

  const postNotify = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiNewNotify(notifyData);
    if (reqInt === 0) {
      getNotifyList();
      cleanNotify();
      handleNotice("success", true, "新增通知成功");
    } else {
      handleNotice("error", true, `新增失敗。error ${reqInt}`);
    }
  };

  const patchNotify = async () => {
    const reqInt = await apiEditNotify(notifyData);
    if (reqInt === 0) {
      getNotifyList();
      cleanNotify();
      setEditNotifyMode(false);
      handleNotice("success", true, "修改成功");
    } else {
      handleNotice("error", true, `修改失敗。error ${reqInt}`);
    }
  };

  const deleteNotify = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (!confirm) return;
    const reqInt = await apiDeleteNotify(notifyData);
    if (reqInt === 0) {
      getNotifyList();
      cleanNotify();
      setEditNotifyMode(false);
      handleNotice("success", true, "刪除成功");
    } else {
      handleNotice("error", true, `刪除失敗。error ${reqInt}`);
    }
  };

  const addLineForm = () => {
    setLineForms([...lineForms, lineForms.length]);
    setNotifyData((prevState) => ({
      ...prevState,
      LineTokenList: [...prevState.LineTokenList, { TokenName: "", Token: "" }],
    }));
    if (notifyData.NotifyActions.includes(0)) {
      return;
    } else {
      setNotifyData((prevState) => ({
        ...prevState,
        NotifyActions: [...prevState.NotifyActions, 0],
      }));
    }
  };

  const addEmailForm = () => {
    setEmailForms([...emailForms, emailForms.length]);
    setNotifyData((prevState) => ({
      ...prevState,
      MailAddressList: [
        ...prevState.MailAddressList,
        { Recipient: "", MailAddress: "" },
      ],
    }));
    if (notifyData.NotifyActions.includes(1)) {
      return;
    } else {
      setNotifyData((prevState) => ({
        ...prevState,
        NotifyActions: [...prevState.NotifyActions, 1],
      }));
    }
  };

  const removeLineForm = (index: number) => {
    setLineForms((prev: number[]) => prev.filter((i) => i !== index));
    setNotifyData((prevState) => ({
      ...prevState,
      LineTokenList: prevState.LineTokenList.filter((_, i) => i !== index),
    }));
  };

  const removeEmailForm = (index: number) => {
    setEmailForms((prev: number[]) => prev.filter((i) => i !== index));
    setNotifyData((prevState) => ({
      ...prevState,
      MailAddressList: prevState.MailAddressList.filter((_, i) => i !== index),
    }));
  };

  const handleLineFormChange = (index: number, key: string, value: string) => {
    const updatedLineTokenList = [...notifyData.LineTokenList];
    updatedLineTokenList[index] = {
      ...updatedLineTokenList[index],
      [key]: value,
    };
    setNotifyData({ ...notifyData, LineTokenList: updatedLineTokenList });
  };

  const handleEmailFormChange = (index: number, key: string, value: string) => {
    const updatedMailAddressList = [...notifyData.MailAddressList];
    updatedMailAddressList[index] = {
      ...updatedMailAddressList[index],
      [key]: value,
    };
    setNotifyData({ ...notifyData, MailAddressList: updatedMailAddressList });
  };

  const handleNotifyData = (key: string, value: string | number) => {
    setNotifyData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNewNotifyMode = () => {
    cleanNotify();
    setNewNotifyMode(!newNotifyMode);
    setEditNotifyMode(false);
  };

  const handleEditNotify = (notify: NotifyItem) => {
    setNotifyData({
      ParameterNo: notify.ParameterNo,
      ToolSpecId: notify.ToolSpecInfo.Id,
      NotifyActions: notify.NotifyActions,
      NotifyPercent: notify.NotifyPercent,
      LineTokenList: notify.LineTokenList,
      MailAddressList: notify.MailAddressList,
    });
    setEditNotifyMode(true);
    setNewNotifyMode(false);
  };

  const cleanNotify = () => {
    setNotifyData({
      ParameterNo: 0,
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
      <button
        className="flex p-1 mt-4 border rounded-md hover:bg-indigo-500"
        onClick={() => handleNewNotifyMode()}
      >
        <Image src="/icons/add.svg" alt="add" width={24} height={24} />
        新增
      </button>
      <div className={`overflow-hidden ${newNotifyMode ? "h-auto" : "h-0"}`}>
        <NewNotifyForm
          postNotify={postNotify}
          notifyData={notifyData}
          handleNotifyData={handleNotifyData}
          toolSpecList={toolSpecList}
          addLineForm={addLineForm}
          addEmailForm={addEmailForm}
          lineForms={lineForms}
          emailForms={emailForms}
          handleEmailFormChange={handleEmailFormChange}
          handleLineFormChange={handleLineFormChange}
          removeEmailForm={removeEmailForm}
          removeLineForm={removeLineForm}
        />
      </div>
      <div className="mt-4 overflow-auto text-center bg-gray-900 rounded-md min-h-96">
        {/* edit start */}
        <div
          className={`overflow-hidden relative ${editNotifyMode ? "h-auto" : "h-0"}`}
        >
          <div className="p-4 my-4">
            <button
              className="absolute top-2 right-2 hover:scale-110 "
              onClick={() => setEditNotifyMode(false)}
            >
              <Image
                src="/icons/close.svg"
                alt="cancel"
                width={24}
                height={24}
              />
            </button>
            <button
              className="absolute top-2 left-2 hover:scale-110"
              onClick={() => deleteNotify()}
            >
              <Image
                src={"/icons/delete.svg"}
                alt="delete"
                width={24}
                height={24}
              />
            </button>
            <div className="flex gap-2">
              <div className="w-full">
                <label htmlFor="toolSpec">刀具規格</label>
                <select
                  name=""
                  id="toolSpec"
                  value={notifyData.ToolSpecId}
                  onChange={(e) =>
                    handleNotifyData("ToolSpecId", e.target.value)
                  }
                  className="w-full p-1 text-center text-black rounded-md"
                >
                  {toolSpecList.map((item) => (
                    <option
                      value={item.ToolSpecId}
                      key={item.ToolSpecId}
                      className="text-center text-black "
                    >
                      {item.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="notifyPercent">通知百分比</label>
                <input
                  type="number"
                  id="notifyPercent"
                  value={notifyData.NotifyPercent}
                  onChange={(e) =>
                    handleNotifyData("NotifyPercent", e.target.value)
                  }
                  className="w-full p-1 text-center text-black rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div>
                <button
                  className="flex items-center p-1 mx-auto border rounded-md hover:bg-indigo-500"
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

                {notifyData.LineTokenList?.map((item, index) => (
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
                        value={item.TokenName}
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
                        value={item.Token}
                        onChange={(e) =>
                          handleLineFormChange(index, "Token", e.target.value)
                        }
                      />
                    </div>

                    <button
                      className="absolute top-2 right-2 hover:scale-110"
                      onClick={() => removeLineForm(index)}
                    >
                      <Image
                        src={"/icons/close.svg"}
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="flex items-center p-1 mx-auto border rounded-md hover:bg-indigo-500"
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
                {notifyData.MailAddressList?.map((item, index) => (
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
                        value={item.Recipient}
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
                        value={item.MailAddress}
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
                      onClick={() => removeEmailForm(index)}
                    >
                      <Image
                        src={"/icons/close.svg"}
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full p-1 mt-4 bg-indigo-500 rounded-md"
              onClick={() => patchNotify()}
            >
              儲存
            </button>
          </div>
        </div>
        {/* edit end */}
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
                    <p className="inline mx-2">
                      {item.NotifyActions.includes(0) ? "Line" : ""}
                    </p>
                    <p className="inline mx-2">
                      {item.NotifyActions.includes(1) ? "Email" : ""}
                    </p>
                  </td>
                  <td className="p-1">
                    <button
                      className="p-1 rounded-md hover:bg-indigo-500"
                      onClick={() => handleEditNotify(item)}
                    >
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
