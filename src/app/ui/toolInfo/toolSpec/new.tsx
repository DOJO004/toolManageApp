"use client";

import { apiNewToolSpec } from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiGetToolTypeList } from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useEffect, useState } from "react";
import { GetToolTypeListResponse, ToolTypeItem } from "../toolType/types";
import { PostToolSpecResponse, ToolSpecItem } from "./types";

interface NewToolSpecProps {
  getToolSpecList: () => void;
  setNewToolSpecMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewToolSpec({
  getToolSpecList,
  setNewToolSpecMode,
}: NewToolSpecProps) {
  const [toolTypeList, setToolTypeList] = useState<ToolTypeItem[]>([]);
  const [toolSpec, setToolSpec] = useState<ToolSpecItem>({
    ToolSpecId: "",
    Name: "",
    ToolTypeData: {
      Id: "",
      Name: "",
    },
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

  const getToolTypeList = async () => {
    const data = await apiGetToolTypeList();
    const res = data as GetToolTypeListResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeMenus);
    }
  };

  const postNewToolSpec = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewToolSpec(toolSpec);
    const res = data as PostToolSpecResponse;
    console.log("post new tool spec", res);

    if (res?.data?.Values?.ReqInt === 0) {
      getToolSpecList();
      cleanToolSpec();
    }
  };

  const cleanToolSpec = () => {
    setToolSpec({
      ToolSpecId: "",
      Name: "",
      ToolTypeData: {
        Id: "",
        Name: "",
      },
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

  const handelSetToolSpec = (key: string, value: string | number) => {
    setToolSpec((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    getToolTypeList();
  }, []);
  useEffect(() => {
    console.log(toolSpec);
  }, [toolSpec]);

  return (
    <div className="p-2 my-2 bg-gray-700 rounded-md">
      <div className="relative ">
        <h3 className="font-bold text-left ">新增刀具規格</h3>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900"
          onClick={() => setNewToolSpecMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postNewToolSpec(e)}>
        <div className="grid items-end grid-cols-12 gap-2 mx-auto">
          <div className="">
            <label htmlFor="ID" className="block">
              刀具類型
            </label>
            <select
              id="ID"
              value={toolSpec.ToolTypeData.Id}
              className="w-full text-center text-black rounded-md "
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  ToolTypeData: { ...prev.ToolTypeData, Id: e.target.value },
                }))
              }
            >
              <option value="">請選擇</option>
              {toolTypeList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black ">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="ID" className="block">
              刀具規格 ID
            </label>
            <input
              id="ID"
              type="text"
              className="w-full text-center text-black rounded-md "
              placeholder="刀具規格 ID"
              value={toolSpec.ToolSpecId}
              onChange={(e) => handelSetToolSpec("ToolSpecId", e.target.value)}
            />
          </div>
          <div className="">
            <label htmlFor="Name" className="block">
              刀具規格名稱
            </label>
            <input
              id="Name"
              type="text"
              className="w-full text-center text-black rounded-md "
              placeholder="刀具規格名稱"
              value={toolSpec.Name}
              onChange={(e) => handelSetToolSpec("Name", e.target.value)}
            />
          </div>

          <div className="">
            <label htmlFor="Φ" className="block">
              Φ
            </label>
            <input
              id="Φ"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.SpecData.BladeDiameter}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  SpecData: {
                    ...prev.SpecData,
                    BladeDiameter: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="height" className="block">
              高度
            </label>
            <input
              id="height"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.SpecData.BladeHeight}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  SpecData: {
                    ...prev.SpecData,
                    BladeHeight: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="totalLength" className="block">
              總長度
            </label>
            <input
              id="totalLength"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.SpecData.TotalLength}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  SpecData: {
                    ...prev.SpecData,
                    TotalLength: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="手柄Φ" className="block">
              手柄Φ
            </label>
            <input
              id="手柄Φ"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.SpecData.HandleDiameter}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  SpecData: {
                    ...prev.SpecData,
                    HandleDiameter: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="safetyStock" className="block">
              安全庫存
            </label>
            <input
              id="safetyStock"
              type="text"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.SafetyStock}
              onChange={(e) => handelSetToolSpec("SafetyStock", e.target.value)}
            />
          </div>

          <div className="">
            <label htmlFor="RepairCnt" className="block">
              最大修整次數
            </label>
            <input
              id="RepairCnt"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.MaxLife.RepairCnt}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  MaxLife: {
                    ...prev.MaxLife,
                    RepairCnt: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="ProcessCnt" className="block">
              最大加工次數
            </label>
            <input
              id="ProcessCnt"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.MaxLife.ProcessCnt}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  MaxLife: {
                    ...prev.MaxLife,
                    ProcessCnt: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="ProcessLength" className="block">
              最大加工長度
            </label>
            <input
              id="ProcessLength"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.MaxLife.ProcessLength}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  MaxLife: {
                    ...prev.MaxLife,
                    ProcessLength: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
          <div className="">
            <label htmlFor="ProcessTime" className="block">
              最大加工時間
            </label>
            <input
              id="ProcessTime"
              type="number"
              className="w-full text-center text-black rounded-md "
              value={toolSpec.MaxLife.ProcessTime}
              onChange={(e) =>
                setToolSpec((prev) => ({
                  ...prev,
                  MaxLife: {
                    ...prev.MaxLife,
                    ProcessTime: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
        </div>
        <button className="w-full my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          送出
        </button>
      </form>
    </div>
  );
}
