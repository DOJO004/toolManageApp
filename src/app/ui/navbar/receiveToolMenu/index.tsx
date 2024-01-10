interface BindingToolItem {
  LabelCode: "09C84C62B192";
  eLabelSN: "";
  StationCode: "AP10000";
  BindStatus: "Unbinding";
  eLToolCode: "00000000-0000-0000-0000-000000000000";
  ToolSN: "";
  ToolSpec: {
    ToolSpecID: "";
    ToolType: "";
    ToolName: "";
  };
  LastModify: "2024-01-09 17:00:00";
}
interface ReceiveToolIndexProps {
  bindingToolList: BindingToolItem;
}
export default function ReceiveToolIndex() {
  return (
    <form className="flex flex-col justify-center w-full max-w-sm p-4 mx-auto mb-2 bg-gray-900 rounded-xl">
      <p className="text-xl text-center ">領取刀具</p>
      <label htmlFor="labelCode">標籤代碼</label>
      <input
        id="labelCode"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
        placeholder="標籤代碼"
      />
      <label htmlFor="readerID">讀取器ID</label>
      <input
        id="readerID"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
        placeholder="讀取器ID"
      />
      <label htmlFor="AtcIndex">AtcIndex</label>
      <input
        id="AtcIndex"
        type="text"
        className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
        placeholder="AtcIndex"
      />
      <button className="p-2 mt-4 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
        領取
      </button>
    </form>
  );
}
