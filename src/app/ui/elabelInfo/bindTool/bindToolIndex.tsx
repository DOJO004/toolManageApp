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
      className="flex flex-col justify-center w-full max-w-sm p-4 mx-auto mb-2 bg-gray-900 rounded-xl"
      onSubmit={(e) => fetchBindToolSN(e)}
    >
      <p className="text-xl text-center ">領取刀具</p>
      <label htmlFor="labelCode">標籤號碼</label>
      <input
        id="labelCode"
        type="text"
        list="labelCodeList"
        value={bindToolInfo.LabelCode}
        onChange={(e) =>
          setBindToolInfo({ ...bindToolInfo, LabelCode: e.target.value })
        }
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
        placeholder="標籤號碼"
      />
      <datalist id="labelCodeList">
        {eLabelSpecInfoList.map((item, index) => (
          <option key={index} value={item.LabelCode}></option>
        ))}
      </datalist>
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
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
      />
      <datalist id="labelList">
        {eLabelSpecInfoList.map((item, index) => (
          <option value={item.eLabelSN} key={index}></option>
        ))}
      </datalist>
      <label htmlFor="toolSN">刀具SN</label>
      <input
        id="toolSN"
        type="text"
        list="toolSNList"
        value={bindToolInfo.ToolSN}
        onChange={(e) =>
          setBindToolInfo({ ...bindToolInfo, ToolSN: e.target.value })
        }
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
        placeholder="刀具SN"
      />
      <datalist id="toolSNList">
        {toolSNList.map((item, index) => (
          <option value={item.ToolSN} key={index}></option>
        ))}
      </datalist>
      <button className="p-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
        綁定標籤
      </button>
    </form>
  );
}
