import { LabelItem } from "@/scripts/Apis/eLabelInfo/types";
import { FormEvent } from "react";

interface Props {
  searchUnbindLabel: (e: FormEvent) => void;
  inputUnbindLabel: string;
  setInputUnbindLabel: (value: string) => void;
  eLabeList: LabelItem[];
  selectLabel: number;
  handleClickBindData: (params: {
    key: string;
    index: number;
    LabelId: string;
    LabelCode: string;
    LabelSn: string;
  }) => void;
}

export default function UnBindLabel({
  searchUnbindLabel,
  inputUnbindLabel,
  setInputUnbindLabel,
  eLabeList,
  selectLabel,
  handleClickBindData,
}: Props) {
  return (
    <div className="w-full p-4 overflow-auto text-center bg-gray-900 rounded-md max-h-[700px] ">
      <div className="sticky -top-4">
        <h3>未綁定標籤</h3>
        <form
          className="flex items-center justify-center w-full gap-2 mt-4"
          onSubmit={(e) => searchUnbindLabel(e)}
        >
          <input
            type="search"
            className="w-full p-2 text-black rounded-md "
            placeholder="搜尋標籤"
            value={inputUnbindLabel}
            onChange={(e) => setInputUnbindLabel(e.target.value)}
          />
        </form>

        <div className="grid grid-cols-2 mt-4 bg-indigo-500">
          <p className="p-1 whitespace-nowrap">標籤號碼</p>
          <p className="p-1 whitespace-nowrap">標籤SN</p>
        </div>
      </div>
      {eLabeList.map((item, index) => (
        <div
          key={item.LabelId}
          className={`cursor-pointer hover:bg-gray-600 grid grid-cols-2 ${selectLabel === index ? "bg-gray-600" : ""}`}
          onClick={() =>
            handleClickBindData({
              key: "eLabel",
              index: index,
              LabelId: item.LabelId,
              LabelCode: item.AimsSpec?.LabelCode,
              LabelSn: item.LabelSn,
            })
          }
        >
          <p className="p-1 whitespace-nowrap">{item.AimsSpec?.LabelCode}</p>
          <p className="p-1 whitespace-nowrap">{item.LabelSn}</p>
        </div>
      ))}
    </div>
  );
}
