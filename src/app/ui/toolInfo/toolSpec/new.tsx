"use client";

import { apiNewToolSpec } from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiGetToolTypeList } from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useEffect, useState } from "react";

interface NewToolSpecProps {
  getToolSpecList: () => void;
}

export function NewToolSpec({ getToolSpecList }: NewToolSpecProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolSpec, setToolSpec] = useState({
    ToolSpecId: "",
    Name: "",
    ToolTypeId: "",
    SafetyStock: 0,
    SpecData: {
      BladeDiameter: 0,
      BladeHeight: 0,
      TotalLength: 0,
      HandleDiameter: 0,
    },
    MaxLife: {
      ProcessCnt: 0,
      ProcessTime: 0,
      ProcessLength: 0,
      RepairCnt: 0,
    },
  });

  const changePage = (value: number) => {
    setCurrentPage((prev) => prev + value);
  };

  const getToolTypeList = async () => {
    const res = await apiGetToolTypeList();
    setToolTypeList(res);
  };

  const postNewToolSpec = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiNewToolSpec(toolSpec);
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      getToolSpecList();
      cleanToolSpec();
      setCurrentPage(1);
    }
  };

  const cleanToolSpec = () => {
    setToolSpec({
      ToolSpecId: "",
      Name: "",
      ToolTypeId: "",
      SafetyStock: 0,
      SpecData: {
        BladeDiameter: 0,
        BladeHeight: 0,
        TotalLength: 0,
        HandleDiameter: 0,
      },
      MaxLife: {
        ProcessCnt: 0,
        ProcessTime: 0,
        ProcessLength: 0,
        RepairCnt: 0,
      },
    });
  };

  const handelSetToolSpec = (key: string, value: any) => {
    setToolSpec((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    getToolTypeList();
  }, []);
  useEffect(() => {
    console.log(toolSpec);
  }, [toolSpec]);

  return (
    <form
      className="w-full max-w-md p-4 mx-auto my-4 bg-gray-600 rounded-md"
      onSubmit={(e) => postNewToolSpec(e)}
    >
      <h3 className="text-center ">新增刀具規格</h3>
      {/* part one */}
      <div className={`${currentPage === 1 ? "block" : "hidden"}`}>
        <p className="my-2 text-sm text-center md:text-base lg:text-lg">●○○</p>
        <div className="my-4">
          <label htmlFor="ID">刀具類型</label>
          <select
            id="ID"
            value={toolSpec.ToolTypeId}
            className="block w-full p-2 text-black border rounded-md"
            onChange={(e) => handelSetToolSpec("ToolTypeId", e.target.value)}
          >
            <option value="">請選擇</option>
            {toolTypeList.map((item) => (
              <option key={item.Id} value={item.Id} className="text-black ">
                {item.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-4">
          <label htmlFor="ID">刀具規格 ID</label>
          <input
            id="ID"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.ToolSpecId}
            onChange={(e) => handelSetToolSpec("ToolSpecId", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="Name">刀具規格名稱</label>
          <input
            id="Name"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.Name}
            onChange={(e) => handelSetToolSpec("Name", e.target.value)}
          />
        </div>
        <div
          className="p-2 text-center bg-gray-900 rounded-md cursor-pointer hover:bg-gray-800"
          onClick={() => changePage(1)}
        >
          下一步
        </div>
      </div>
      {/* part two */}
      <div className={`${currentPage === 2 ? "block" : "hidden"}`}>
        <p className="my-2 text-sm text-center md:text-base lg:text-lg">○●○</p>
        <div className="my-4">
          <label htmlFor="Φ">Φ</label>
          <input
            id="Φ"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.SpecData.BladeDiameter}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                SpecData: {
                  ...prev.SpecData,
                  BladeDiameter: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="height">高度</label>
          <input
            id="height"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.SpecData.BladeHeight}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                SpecData: {
                  ...prev.SpecData,
                  BladeHeight: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="totalLength">總長度</label>
          <input
            id="totalLength"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.SpecData.TotalLength}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                SpecData: {
                  ...prev.SpecData,
                  TotalLength: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="手柄Φ">手柄Φ</label>
          <input
            id="手柄Φ"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.SpecData.HandleDiameter}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                SpecData: {
                  ...prev.SpecData,
                  HandleDiameter: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="safetyStock">安全庫存</label>
          <input
            id="safetyStock"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.SafetyStock}
            onChange={(e) => handelSetToolSpec("SafetyStock", e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div
            className="w-full p-2 text-center bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(-1)}
          >
            上一步
          </div>
          <div
            className="w-full p-2 text-center bg-gray-900 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(1)}
          >
            下一步
          </div>
        </div>
      </div>
      {/* part three */}
      <div className={`${currentPage === 3 ? "block" : "hidden"}`}>
        <p className="my-2 text-sm text-center md:text-base lg:text-lg">○○●</p>
        <div className="my-4">
          <label htmlFor="RepairCnt">最大修整次數</label>
          <input
            id="RepairCnt"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.MaxLife.RepairCnt}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                MaxLife: {
                  ...prev.MaxLife,
                  RepairCnt: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessCnt">最大加工次數</label>
          <input
            id="ProcessCnt"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.MaxLife.ProcessCnt}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                MaxLife: {
                  ...prev.MaxLife,
                  ProcessCnt: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessLength">最大加工長度</label>
          <input
            id="ProcessLength"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.MaxLife.ProcessLength}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                MaxLife: {
                  ...prev.MaxLife,
                  ProcessLength: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="my-4">
          <label htmlFor="ProcessTime">最大加工時間</label>
          <input
            id="ProcessTime"
            type="text"
            className="block w-full p-2 text-black border rounded-md"
            value={toolSpec.MaxLife.ProcessTime}
            onChange={(e) =>
              setToolSpec((prev) => ({
                ...prev,
                MaxLife: {
                  ...prev.MaxLife,
                  ProcessTime: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="flex gap-2">
          <div
            className="w-full p-2 text-center bg-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
            onClick={() => changePage(-1)}
          >
            上一步
          </div>
          <button className="w-full bg-gray-900 hover:bg-gray-800">新增</button>
        </div>
      </div>
    </form>
  );
}
