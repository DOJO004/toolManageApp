import { NotifyDataItem, ToolSpecItem } from "@/scripts/Apis/toolInfo/types";
import Image from "next/image";
import SubmitButton from "../buttons";

interface Props {
  editNotifyMode: boolean;
  setEditNotifyMode: any;
  notifyData: NotifyDataItem;
  handleNotifyData: any;
  toolSpecList: ToolSpecItem[];
  addLineForm: () => void;
  addEmailForm: () => void;
  removeLineForm: (index: number) => void;
  removeEmailForm: (index: number) => void;
  deleteNotify: () => void;
  patchNotify: () => void;
  handleLineFormChange: (index: number, key: string, value: string) => void;
  handleEmailFormChange: (index: number, key: string, value: string) => void;
  isPending: boolean;
}
export default function EditNotifyForm({
  editNotifyMode,
  setEditNotifyMode,
  notifyData,
  handleNotifyData,
  toolSpecList,
  addLineForm,
  addEmailForm,
  removeLineForm,
  removeEmailForm,
  deleteNotify,
  patchNotify,
  handleLineFormChange,
  handleEmailFormChange,
  isPending,
}: Props) {
  return (
    <div
      className={`overflow-hidden relative ${editNotifyMode ? "h-auto" : "h-0"}`}
    >
      <div className="p-4 my-4">
        <button
          className="absolute top-2 right-2 hover:scale-110 "
          onClick={() => setEditNotifyMode(false)}
        >
          <Image src="/icons/close.svg" alt="cancel" width={24} height={24} />
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
        <h2>編輯通知</h2>
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="toolSpec">刀具規格</label>
            <select
              name=""
              id="toolSpec"
              value={notifyData.ToolSpecId}
              onChange={(e) => handleNotifyData("ToolSpecId", e.target.value)}
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
              <Image src={"/icons/add.svg"} alt="add" width={24} height={24} />
              Line
            </button>

            {notifyData.LineTokenList?.map((item, index) => (
              <div key={index} className="relative p-4 mt-2 border rounded-md">
                <div>
                  <label htmlFor={`lineName${index}`}>Line 名稱</label>
                  <input
                    type="text"
                    id={`lineName${index}`}
                    className="w-full p-1 text-center text-black rounded-md"
                    value={item.TokenName}
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
              <Image src={"/icons/add.svg"} alt="add" width={24} height={24} />
              Email
            </button>
            {notifyData.MailAddressList?.map((item, index) => (
              <div key={index} className="relative p-4 mt-2 border rounded-md">
                <div>
                  <label htmlFor={`mailName${index}`}>收件人</label>
                  <input
                    type="text"
                    id="mailName"
                    className="w-full p-1 text-center text-black rounded-md"
                    value={item.Recipient}
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
        <SubmitButton
          name="儲存"
          classNames="w-full p-1 mt-4 bg-indigo-500 rounded-md"
          onclick={(e) => patchNotify()}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
