import { NewNotifyItem, ToolSpecItem } from "@/scripts/Apis/toolInfo/types";
import { FormEvent } from "react";

interface Props {
  postNotify: (e: FormEvent) => void;
  newNotify: NewNotifyItem;
  handleNewNotify: (key: string, value: string | number) => void;
  toolSpecList: ToolSpecItem[];
}

export default function NewNotifyForm({
  postNotify,
  newNotify,
  handleNewNotify,
  toolSpecList,
}: Props) {
  return (
    <form
      className="grid items-center grid-cols-4 gap-2 p-4 mt-4 bg-gray-900 rounded-md"
      onSubmit={(e) => postNotify(e)}
    >
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
          onChange={(e) => handleNewNotify("NotifyPercent", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="token/email">
          {newNotify.NotifyActions === 0 ? "Line Token" : "Email"}
        </label>
        <input
          id="token/email"
          type="text"
          placeholder={`請輸入 ${newNotify.NotifyActions === 0 ? "Line Token" : "Email"}`}
          className="w-full p-1 text-center text-black rounded-md"
          value={
            newNotify.NotifyActions === 0
              ? newNotify.Token
              : newNotify.MailAddress
          }
          onChange={(e) =>
            handleNewNotify(
              newNotify.NotifyActions === 0 ? "Token" : "MailAddress",
              e.target.value
            )
          }
        />
      </div>
      <div>
        <label htmlFor="">
          {newNotify.NotifyActions === 0 ? "Line 名稱" : "收件人"}
        </label>
        <input
          type="text"
          placeholder={`請輸入${newNotify.NotifyActions === 0 ? "Line 名稱" : "收件人"}`}
          className="w-full p-1 text-center text-black rounded-md"
          value={
            newNotify.NotifyActions === 0
              ? newNotify.TokenName
              : newNotify.Recipient
          }
          onChange={(e) =>
            handleNewNotify(
              newNotify.NotifyActions === 0 ? "TokenName" : "Recipient",
              e.target.value
            )
          }
        />
      </div>
      <button className="col-span-4 p-1 mt-4 bg-indigo-500 rounded-md">
        新增
      </button>
    </form>
  );
}
