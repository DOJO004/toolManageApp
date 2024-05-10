import { FormEvent } from "react";
import { StorageItem } from "../storage/types";
import { UserAccountItem } from "../userInfo/types";

interface Props {
  postDisableLabelBindTool: (e: FormEvent) => void;
  returnData: any;
  userList: UserAccountItem[];
  storageList: StorageItem[];
  handleReturnData: (value: string, name: string) => void;
}
export default function ReturnToolFrom({
  postDisableLabelBindTool,
  returnData,
  userList,
  storageList,
  handleReturnData,
}: Props) {
  return (
    <form
      className="p-4 bg-gray-500 rounded-md"
      onSubmit={(e) => postDisableLabelBindTool(e)}
    >
      <div>
        <label htmlFor="Receiver">人員</label>
        <select
          name=""
          id="Receiver"
          className="w-full p-2 text-center text-black rounded-md"
          value={returnData.RevertorId}
          onChange={(e) => {
            handleReturnData(e.target.value, "RevertorId");
          }}
        >
          <option value="" className="text-gray-400">
            選擇人員
          </option>
          {userList.map((item) => (
            <option
              value={item.AccountId}
              key={item.AccountId}
              className="text-black"
            >
              {item.UserName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="StorageId">位置</label>
        <select
          name=""
          id="StorageId"
          className="w-full p-2 text-center text-black rounded-md"
          value={returnData.StorageId}
          onChange={(e) => {
            handleReturnData(e.target.value, "StorageId");
          }}
        >
          <option value="" className="text-gray-400">
            選擇位置
          </option>
          {storageList.map((item) => (
            <option
              value={item.StorageId}
              key={item.StorageId}
              className="text-black"
            >
              {item.Name}
            </option>
          ))}
        </select>
      </div>
      <button className="w-full p-2 mt-4 bg-indigo-500 rounded-md">歸還</button>
    </form>
  );
}
