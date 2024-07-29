import { StorageMenuItem } from "@/scripts/Apis/toolInfo/types";
import { UserAccountItem } from "@/scripts/Apis/userInfo/types";
import React, { FormEvent } from "react";
import SubmitButton from "../buttons";

interface Props {
  postDisableLabelBindTool: (e: FormEvent) => void;
  postRepairTool: (e: FormEvent) => void;
  postScrapTool: (e: FormEvent) => void;
  returnType: string;
  returnData: any;
  userList: UserAccountItem[];
  storageList: StorageMenuItem[];
  handleReturnData: (value: string | number, name: string) => void;
  setReturnMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ReturnToolFrom({
  postDisableLabelBindTool,
  postRepairTool,
  postScrapTool,
  returnType,
  returnData,
  userList,
  storageList,
  handleReturnData,
  setReturnMode,
}: Props) {
  const handleSubmitFunction = (type: string, e: FormEvent) => {
    switch (type) {
      case "repair":
        return postRepairTool(e);
      case "scrap":
        return postScrapTool(e);
      case "return":
        return postDisableLabelBindTool(e);
    }
  };

  const handleFromTitle = (type: string) => {
    switch (type) {
      case "repair":
        return "送修";
      case "scrap":
        return "報廢";
      case "return":
        return "歸還";
    }
  };
  return (
    <form
      className="p-4 bg-gray-500 border rounded-md"
      onSubmit={(e) => handleSubmitFunction(returnType, e)}
    >
      <div className="flex justify-between">
        <h3 className="mx-2 text-center">{`${handleFromTitle(returnType)}刀具`}</h3>
        <div
          className="p-1 rounded-full cursor-pointer hover:bg-gray-900"
          onClick={() => setReturnMode(false)}
        >
          X
        </div>
      </div>

      <div className="mt-4">
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
      <SubmitButton
        name="歸還"
        classNames="w-full p-2 mt-4 bg-indigo-500 rounded-md"
        onclick={() => {}}
        isPending={false}
      />
    </form>
  );
}
