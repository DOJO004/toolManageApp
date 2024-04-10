"use client";
import { apiGetToolSpecList } from "@/scripts/Apis/toolSpec/toolSpecApi";
import { useEffect, useState } from "react";
import { EditToolSpec } from "./edit";
import { NewToolSpec } from "./new";

const ToolSpecIndex = () => {
  const [toolSpecList, setToolSpecList] = useState([]);
  const [newToolSpecMode, setNewToolSpecMode] = useState(false);
  const [editToolSpecMode, setEditToolSpecMode] = useState(false);

  const [editToolSpec, setEditToolSpec] = useState({
    ToolSpecId: "",
    Name: "",
    ToolTypeId: "",
    SafetyStock: 0,
    BladeDiameter: 0,
    BladeHeight: 0,
    TotalLength: 0,
    HandleDiameter: 0,
    ProcessCnt: 0,
    ProcessTime: 0,
    ProcessLength: 0,
    RepairCnt: 0,
  });

  const getToolSpecList = async () => {
    const res = await apiGetToolSpecList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
    }
  };

  const handleNewToolSpecMode = () => {
    setNewToolSpecMode(!newToolSpecMode);
    setEditToolSpecMode(false);
  };

  const handleEditToolSpecMode = () => {
    setEditToolSpecMode(true);
    setNewToolSpecMode(false);
  };

  const handleSetEditSpec = (item: any) => {
    setEditToolSpec({
      ToolSpecId: item.ToolSpecId,
      Name: item.Name,
      ToolTypeId: item.ToolTypeData.Id,
      SafetyStock: item.SafetyStock,
      BladeDiameter: item.SpecData.BladeDiameter,
      BladeHeight: item.SpecData.BladeHeight,
      TotalLength: item.SpecData.TotalLength,
      HandleDiameter: item.SpecData.HandleDiameter,
      ProcessCnt: item.MaxLife.ProcessCnt,
      ProcessTime: item.MaxLife.ProcessTime,
      ProcessLength: item.MaxLife.ProcessLength,
      RepairCnt: item.MaxLife.RepairCnt,
    });
  };
  useEffect(() => {
    getToolSpecList();
  }, []);
  return (
    <div className="relative h-screen p-2 overflow-auto">
      <h2 className="my-4 text-center">刀具規格</h2>
      <button
        className="absolute p-2 bg-gray-600 rounded-md top-5 left-[70%] lg:left-[60%] 2xl:left-[57%]"
        onClick={() => handleNewToolSpecMode()}
      >
        新增
      </button>
      {/* new */}
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden ${
          newToolSpecMode ? "h-[40rem]" : "h-0"
        }`}
      >
        <NewToolSpec getToolSpecList={getToolSpecList} />
      </div>
      {/* edit */}
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden relative ${
          editToolSpecMode ? "h-[40rem]" : "h-0"
        }`}
      >
        <EditToolSpec
          editToolSpec={editToolSpec}
          setEditToolSpec={setEditToolSpec}
          setEditToolSpecMode={setEditToolSpecMode}
          getToolSpecList={getToolSpecList}
        />
        <button
          className="absolute p-2 text-2xl rounded-md top-5 left-[75%] md:left-[65%] lg:left-[62%] 2xl:left-[55%]"
          onClick={() => setEditToolSpecMode(false)}
        >
          x
        </button>
      </div>
      {/* index */}
      <div className="w-full mx-auto overflow-auto text-center bg-gray-700 shadow-md rounded-t-xl">
        <table className="w-full ">
          <thead className="bg-indigo-500 border-b-2">
            <tr>
              <td className="p-2 whitespace-nowrap">ID</td>
              <td className="p-2 whitespace-nowrap">名稱</td>
              <td className="p-2 whitespace-nowrap">Φ</td>
              <td className="p-2 whitespace-nowrap">高度</td>
              <td className="p-2 whitespace-nowrap">總長度</td>
              <td className="p-2 whitespace-nowrap">手柄Φ</td>
              <td className="p-2 whitespace-nowrap">安全庫存</td>
              <td className="p-2 whitespace-nowrap">最大修整次數</td>
              <td className="p-2 whitespace-nowrap">最大加工次數</td>
              <td className="p-2 whitespace-nowrap">最大加工長度</td>
              <td className="p-2 whitespace-nowrap">最大加工時間</td>
            </tr>
          </thead>
          <tbody>
            {toolSpecList?.length >= 1 ? (
              toolSpecList.map((item) => (
                <tr
                  key={item.ToolSpecId}
                  className="cursor-pointer hover:bg-gray-500"
                  onClick={() => {
                    handleSetEditSpec(item), handleEditToolSpecMode();
                  }}
                >
                  <td className="p-2 whitespace-nowrap">{item.ToolSpecId}</td>
                  <td className="p-2 whitespace-nowrap">{item.Name}</td>
                  <td className="p-2 whitespace-nowrap">
                    {item.SpecData.BladeDiameter}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.SpecData.BladeHeight}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.SpecData.TotalLength}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.SpecData.HandleDiameter}
                  </td>
                  <td className="p-2 whitespace-nowrap">{item.SafetyStock}</td>
                  <td className="p-2 whitespace-nowrap">
                    {item.MaxLife.RepairCnt}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.MaxLife.ProcessCnt}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.MaxLife.ProcessLength}
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    {item.MaxLife.ProcessTime}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>Don't have any data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToolSpecIndex;
