interface ToolInfoLogProps {}
const ToolInfoLog = ({}: ToolInfoLogProps) => {
  return (
    <div className="w-full h-full p-2 mb-2 overflow-auto text-xs bg-gray-900 rounded-xl">
      <p className="mb-4 text-2xl font-bold border-b-2 ">刀具裝卸載日誌</p>
      <div className="overflow-auto rounded-md ">
        <table className="w-full text-center ">
          <thead>
            <tr className="bg-indigo-500">
              <td className="p-1 whitespace-nowrap">設備序號</td>
              <td className="p-1 whitespace-nowrap">動作</td>
              <td className="p-1 whitespace-nowrap">刀庫號</td>
              <td className="p-1 whitespace-nowrap">動作時間</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolInfoLog;
