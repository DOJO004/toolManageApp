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
    const res: any = await apiGetToolSpecList();
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
    <div className="relative flex w-full h-screen p-2 overflow-auto">
      {/* index */}
      <div className="w-full mx-4 ">
        <div className="relative">
          <h2 className="my-4 text-center">刀具規格</h2>
          <button
            className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-600"
            onClick={() => handleNewToolSpecMode()}
          >
            新增
          </button>
        </div>
        <div className="overflow-auto text-center bg-gray-700 rounded-md">
          <table className="w-full ">
            <thead className="bg-indigo-500 border-b-2">
              <tr>
                <td className="p-1 ">ID</td>
                <td className="p-1 ">名稱</td>
                <td className="p-1 ">Φ</td>
                <td className="p-1 ">高度</td>
                <td className="p-1 ">總長度</td>
                <td className="p-1 ">手柄Φ</td>
                <td className="p-1 ">安全庫存</td>
                <td className="p-1 ">最大修整次數</td>
                <td className="p-1 ">最大加工次數</td>
                <td className="p-1 ">最大加工長度</td>
                <td className="p-1 ">最大加工時間</td>
              </tr>
            </thead>
            <tbody>
              {toolSpecList?.length >= 1 ? (
                toolSpecList.map((item: any) => (
                  <tr
                    key={item.ToolSpecId}
                    className="cursor-pointer hover:bg-gray-500"
                    onClick={() => {
                      handleSetEditSpec(item), handleEditToolSpecMode();
                    }}
                  >
                    <td className="p-1 ">{item.ToolSpecId}</td>
                    <td className="p-1 ">{item.Name}</td>
                    <td className="p-1 ">{item.SpecData.BladeDiameter}</td>
                    <td className="p-1 ">{item.SpecData.BladeHeight}</td>
                    <td className="p-1 ">{item.SpecData.TotalLength}</td>
                    <td className="p-1 ">{item.SpecData.HandleDiameter}</td>
                    <td className="p-1 ">{item.SafetyStock}</td>
                    <td className="p-1 ">{item.MaxLife.RepairCnt}</td>
                    <td className="p-1 ">{item.MaxLife.ProcessCnt}</td>
                    <td className="p-1 ">{item.MaxLife.ProcessLength}</td>
                    <td className="p-1 ">{item.MaxLife.ProcessTime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11}>Don&apos;t have any data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* new */}
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden  ${
          newToolSpecMode ? "w-full xl:w-1/2" : "w-0 "
        }`}
      >
        <NewToolSpec
          getToolSpecList={getToolSpecList}
          setNewToolSpecMode={setNewToolSpecMode}
        />
      </div>
      {/* edit */}
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden  ${
          editToolSpecMode ? "w-full xl:w-1/2" : "w-0 "
        }`}
      >
        <EditToolSpec
          editToolSpec={editToolSpec}
          setEditToolSpec={setEditToolSpec}
          setEditToolSpecMode={setEditToolSpecMode}
          getToolSpecList={getToolSpecList}
        />
      </div>
    </div>
  );
};

export default ToolSpecIndex;
