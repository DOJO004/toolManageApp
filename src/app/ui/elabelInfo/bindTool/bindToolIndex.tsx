import React, { FormEvent } from "react";

interface ELabelSpecInfoItem {
  LabelCode: string;
  eLabelSN: string;
}

interface ToolSNItem {
  ToolSN: string;
}

interface BindToolInfoItem {
  eLabelSN: string;
  LabelCode: string;
  ToolSN: string;
}

interface BindToolIndexProps {
  bindToolInfo: BindToolInfoItem;
  setBindToolInfo: React.Dispatch<React.SetStateAction<BindToolInfoItem>>;
  eLabelSpecInfoList: ELabelSpecInfoItem[];
  toolSNList: ToolSNItem[];
  fetchBindToolSN: (e: FormEvent) => void;
}
export default function BindToolIndex({
  bindToolInfo,
  setBindToolInfo,
  eLabelSpecInfoList,
  toolSNList,
  fetchBindToolSN,
}: BindToolIndexProps) {
  return (
    <form
      className="flex flex-col justify-center w-full max-w-4xl p-4 mx-auto mb-2 bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchBindToolSN(e)}
    >
      <p className="text-center ">領取刀具</p>
      <div className="relative ">
        <label htmlFor="labelCode">標籤號碼</label>
        <input
          id="labelCode"
          type="text"
          list="labelCodeList"
          value={bindToolInfo.LabelCode}
          onChange={(e) =>
            setBindToolInfo({ ...bindToolInfo, LabelCode: e.target.value })
          }
          className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
          placeholder="標籤號碼"
        />
        <datalist id="labelCodeList" className="absolute top-0 left-0 ">
          {eLabelSpecInfoList.map((item, index) => (
            <option key={index} value={item.LabelCode}></option>
          ))}
        </datalist>
      </div>
      <div className="relative ">
        <label htmlFor="eLabelSN">電子標籤SN</label>
        <input
          type="text"
          id="eLabelSN"
          list="labelList"
          value={bindToolInfo.eLabelSN}
          onChange={(e) =>
            setBindToolInfo({ ...bindToolInfo, eLabelSN: e.target.value })
          }
          placeholder="電子標籤SN"
          className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
        />
        <datalist id="labelList" className="absolute top-0 left-0 ">
          {eLabelSpecInfoList.map((item, index) => (
            <option value={item.eLabelSN} key={index}></option>
          ))}
        </datalist>
      </div>

      <div className="relative ">
        <label htmlFor="toolSN">刀具SN</label>
        <input
          id="toolSN"
          type="text"
          list="toolSNList"
          value={bindToolInfo.ToolSN}
          onChange={(e) =>
            setBindToolInfo({ ...bindToolInfo, ToolSN: e.target.value })
          }
          className="block w-full pl-2 my-2 text-black rounded-md min-h-10 "
          placeholder="刀具SN"
        />
        <datalist id="toolSNList" className="absolute top-0 left-0 ">
          {toolSNList.map((item, index) => (
            <option value={item.ToolSN} key={index}></option>
          ))}
        </datalist>
      </div>
      <button className="p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
        綁定標籤
      </button>
    </form>
  );
}
