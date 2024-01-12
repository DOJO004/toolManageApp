interface BindingToolItem {
  LabelCode: string;
  eLabelSN: string;
  StationCode: string;
  BindStatus: string;
  eLToolCode: string;
  ToolSN: string;
  ToolSpec: {
    ToolSpecID: string;
    ToolType: string;
    ToolName: string;
  };
  LastModify: string;
}
interface ReceiveToolIndexProps {
  bindingToolList: BindingToolItem[];
}
export default function ReceiveToolIndex({
  bindingToolList,
}: ReceiveToolIndexProps) {
  return (
    <div className="flex flex-col overflow-auto bg-gray-900 rounded-xl">
      <p className="mt-2 text-xl text-center">領取刀具</p>
      <table className="w-full m-2">
        <thead className="text-center ">
          <tr className="p-1 ">
            <td className="p-1">ToolSpecID</td>
            <td className="p-1">ToolType</td>
            <td className="p-1">ToolName</td>
            <td className="p-1">LabelCode</td>
            <td className="p-1">ELabelSN</td>
            <td className="p-1">StationCode</td>
            <td className="p-1">Receive</td>
          </tr>
        </thead>
        <tbody className="text-center">
          {bindingToolList.map((item, index) => (
            <tr key={index}>
              <td className="p-1">{item.ToolSpec.ToolSpecID}</td>
              <td className="p-1">{item.ToolSpec.ToolType}</td>
              <td className="p-1">{item.ToolSpec.ToolName}</td>
              <td className="p-1">{item.LabelCode}</td>
              <td className="p-1">{item.eLabelSN}</td>
              <td className="p-1">{item.StationCode}</td>
              <td className="p-1">
                <button>領取</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
