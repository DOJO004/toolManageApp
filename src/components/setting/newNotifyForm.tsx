import { NotifyDataItem, ToolSpecItem } from "@/scripts/Apis/toolInfo/types";
import Image from "next/image";
import { FormEvent } from "react";

interface Props {
  postNotify: (e: FormEvent) => void;
  notifyData: NotifyDataItem;
  handleNotifyData: (key: string, value: string | number) => void;
  toolSpecList: ToolSpecItem[];
  addLineForm: () => void;
  addEmailForm: () => void;
  lineForms: number[];
  emailForms: number[];
  handleEmailFormChange: (index: number, key: string, value: string) => void;
  handleLineFormChange: (index: number, key: string, value: string) => void;
  removeLineForm: (index: number) => void;
  removeEmailForm: (index: number) => void;
}

export default function NewNotifyForm({
  postNotify,
  notifyData,
  handleNotifyData,
  toolSpecList,
  addLineForm,
  addEmailForm,
  lineForms,
  emailForms,
  handleEmailFormChange,
  handleLineFormChange,
  removeLineForm,
  removeEmailForm,
}: Props) {
  return (
    <div className="items-center p-4 mt-4 text-center bg-gray-900 rounded-md ">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="toolSpec">刀具規格</label>
          <select
            id="toolSpec"
            value={notifyData.ToolSpecId}
            className="w-full p-1 text-center text-black rounded-md"
            onChange={(e) => handleNotifyData("ToolSpecId", e.target.value)}
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
            value={notifyData.NotifyPercent}
            onChange={(e) => handleNotifyData("NotifyPercent", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <button
            className="flex items-center p-1 mx-auto border rounded-md hover:bg-indigo-500 "
            onClick={() => addLineForm()}
          >
            <Image src={"/icons/add.svg"} alt="add" width={24} height={24} />
            Line
          </button>

          {
            // line form list
            lineForms.map((index) => (
              <div key={index} className="relative p-4 mt-2 border rounded-md">
                <div>
                  <label htmlFor={`lineName${index}`}>Line 名稱</label>
                  <input
                    type="text"
                    id={`lineName${index}`}
                    className="w-full p-1 text-center text-black rounded-md"
                    value={notifyData.LineTokenList[index]?.TokenName || ""}
                    onChange={(e) =>
                      handleLineFormChange(index, "TokenName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`lineToken${index}`}>Line Token</label>
                  <input
                    type="text"
                    id={`lineToken${index}`}
                    className="w-full p-1 text-center text-black rounded-md"
                    value={notifyData.LineTokenList[index]?.Token || ""}
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
            ))
          }
        </div>
        <div>
          <button
            className="flex items-center p-1 mx-auto border rounded-md hover:bg-indigo-500"
            onClick={() => addEmailForm()}
          >
            <Image src={"/icons/add.svg"} alt="add" width={24} height={24} />
            Email
          </button>
          {
            // mail form list
            emailForms.map((index) => (
              <div key={index} className="relative p-4 mt-2 border rounded-md">
                <div>
                  <label htmlFor={`mailName${index}`}>收件人</label>
                  <input
                    type="text"
                    id="mailName"
                    className="w-full p-1 text-center text-black rounded-md"
                    value={notifyData.MailAddressList[index]?.Recipient || ""}
                    onChange={(e) =>
                      handleEmailFormChange(index, "Recipient", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label htmlFor={`mailAddress${index}`}>郵件地址</label>
                  <input
                    type="email"
                    id={`mailAddress${index}`}
                    className="w-full p-1 text-center text-black rounded-md"
                    value={notifyData.MailAddressList[index]?.MailAddress || ""}
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
  );
}
