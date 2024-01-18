export default function MachineLogInfo() {
  return (
    <div className="w-full p-2 my-2 ml-2 bg-gray-900 rounded-md">
      <p className="text-xl">刀具裝卸載日誌</p>
      <hr className="my-4" />
      <div className="overflow-hidden rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500">
              <th className="p-1 text-black">設備序號</th>
              <th className="p-1 text-black">動作</th>
              <th className="p-1 text-black">刀庫號</th>
              <th className="p-1 text-black">動作時間</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" even:bg-gray-700">
              <td className="p-1"></td>
              <td className="p-1"></td>
              <td className="p-1"></td>
              <td className="p-1"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
