import { BindToolDataItem } from "@/scripts/Apis/eLabelInfo/types";
import { UserAccountItem } from "@/scripts/Apis/userInfo/types";
import Image from "next/image";
import { FormEvent } from "react";
import SubmitButton from "../buttons";

interface Props {
  postBindTool: (e: FormEvent) => void;
  hintLabelCodeImage: () => void;
  bindToolData: BindToolDataItem;
  handleInputBindData: (key: string, value: string) => void;
  userList: UserAccountItem[];
  isPending: boolean;
}

export default function Form({
  postBindTool,
  hintLabelCodeImage,
  bindToolData,
  handleInputBindData,
  userList,
  isPending,
}: Props) {
  return (
    <form onSubmit={(e) => postBindTool(e)}>
      <div className="grid grid-cols-4 gap-2 ">
        <div className="relative ">
          <div className="flex items-end ">
            <label htmlFor="labelCode">標籤號碼</label>
            <Image
              src={"/images/icons/bulb.svg"}
              width={30}
              height={30}
              alt="hit"
              onClick={() => hintLabelCodeImage()}
              className="p-1 mx-1 bg-gray-500 rounded-full cursor-pointer hover:bg-yellow-400"
            />
          </div>
          <input
            id="labelCode"
            type="text"
            list="labelCodeList"
            className="w-full p-2 text-black rounded-md"
            placeholder="標籤號碼"
            value={bindToolData.LabelCode}
            onChange={(e) => handleInputBindData("LabelCode", e.target.value)}
            readOnly
          />
          <datalist
            id="labelCodeList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>
        <div className="relative ">
          <label htmlFor="eLabelSN">電子標籤SN</label>
          <input
            type="text"
            id="eLabelSN"
            list="labelList"
            placeholder="電子標籤SN"
            className="w-full p-2 text-black rounded-md"
            value={bindToolData.LabelSn}
            onChange={(e) => handleInputBindData("LabelSn", e.target.value)}
            readOnly
          />
          <datalist
            id="labelList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>
        <div className="relative ">
          <label htmlFor="toolSN">刀具SN</label>
          <input
            id="toolSN"
            type="text"
            list="toolSNList"
            className="w-full p-2 text-black rounded-md"
            placeholder="刀具SN"
            value={bindToolData.ToolSn}
            onChange={(e) => handleInputBindData("ToolSn", e.target.value)}
            readOnly
          />
          <datalist
            id="toolSNList"
            className="absolute top-0 left-0 "
          ></datalist>
        </div>
        <div>
          <label htmlFor="receiver">領取人</label>
          <select
            value={bindToolData.ReceiptorId}
            className="w-full p-2 text-black rounded-md"
            onChange={(e) => handleInputBindData("ReceiptorId", e.target.value)}
          >
            <option value="" className="text-gray-400">
              選擇領取人
            </option>
            {userList.map((item) => (
              <option
                key={item.AccountId}
                value={item.AccountId}
                className="text-black"
              >
                {item.UserName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <SubmitButton
        name="綁定標籤"
        classNames="w-full p-1 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600"
        onclick={() => {}}
        isPending={isPending}
      />
    </form>
  );
}
