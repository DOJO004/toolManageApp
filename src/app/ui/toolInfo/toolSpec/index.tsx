"use client";
import {
  apiDeleteToolSpec,
  apiEditToolSpec,
  apiGetToolSpecList,
} from "@/scripts/Apis/toolSpec/toolSpecApi";
import { useEffect, useState } from "react";
import { NewToolSpec } from "./new";
import {
  DeleteToolSpecResponse,
  GetToolSpecListResponse,
  PatchToolSpecResponse,
  ToolSpecItem,
} from "./types";

const ToolSpecIndex = () => {
  const [toolSpecList, setToolSpecList] = useState([
    {
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
    },
  ]);
  const [newToolSpecMode, setNewToolSpecMode] = useState(false);
  const [editToolSpecMode, setEditToolSpecMode] = useState(false);
  const [editToolSpecModeIndex, setEditToolSpecModeIndex] = useState(-1);

  const [editToolSpec, setEditToolSpec] = useState({
    ToolSpecId: "",
    ModifyDatas: {
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
    },
  });

  const getToolSpecList = async () => {
    const data = await apiGetToolSpecList();
    const res = data as GetToolSpecListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
    }
  };

  const patchToolSpec = async () => {
    const data = await apiEditToolSpec(editToolSpec);
    const res = data as PatchToolSpecResponse;
    console.log("patch tool spec", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setEditToolSpecMode(false);
      getToolSpecList();
    }
  };

  const deleteToolSpec = async () => {
    const confirm = window.confirm(`確定要刪除 ${editToolSpec.ToolSpecId} 嗎?`);
    if (confirm) {
      const data = await apiDeleteToolSpec(editToolSpec.ToolSpecId);
      const res = data as DeleteToolSpecResponse;
      console.log("delete tool spec", res);

      if (res?.data?.Values?.ReqInt === 0) {
        setEditToolSpecMode(false);
        getToolSpecList();
      }
    }
  };

  const handleNewToolSpecMode = () => {
    setNewToolSpecMode(!newToolSpecMode);
    setEditToolSpecMode(false);
  };

  const handleEditToolSpecMode = (item: ToolSpecItem, index: number) => {
    console.log("handle edit tool spec mode", item);

    setEditToolSpecMode(true);
    setNewToolSpecMode(false);
    setEditToolSpecModeIndex(index);
    setEditToolSpec({
      ToolSpecId: item.ToolSpecId,
      ModifyDatas: {
        Name: item.Name,
        ToolTypeId: item.ToolTypeData.Name,
        SafetyStock: item.SafetyStock,
        SpecData: {
          BladeDiameter: item.SpecData.BladeDiameter,
          BladeHeight: item.SpecData.BladeHeight,
          TotalLength: item.SpecData.TotalLength,
          HandleDiameter: item.SpecData.HandleDiameter,
        },
        MaxLife: {
          ProcessCnt: item.MaxLife.ProcessCnt,
          ProcessTime: item.MaxLife.ProcessTime,
          ProcessLength: item.MaxLife.ProcessLength,
          RepairCnt: item.MaxLife.RepairCnt,
        },
      },
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
          {/* new */}
          <div
            className={` transition-all duration-300  ease-in-out rounded-md overflow-hidden  ${
              newToolSpecMode ? "h-32" : "h-0"
            }`}
          >
            <NewToolSpec
              getToolSpecList={getToolSpecList}
              setNewToolSpecMode={setNewToolSpecMode}
            />
          </div>
          <table className="w-full">
            <thead className="bg-indigo-500 border-b-2">
              <tr>
                <td className="p-1">ID</td>
                <td className="p-1">名稱</td>
                <td className="p-1">Φ</td>
                <td className="p-1">高度</td>
                <td className="p-1">總長度</td>
                <td className="p-1">手柄Φ</td>
                <td className="p-1">安全庫存</td>
                <td className="p-1">最大修整次數</td>
                <td className="p-1">最大加工次數</td>
                <td className="p-1">最大加工長度</td>
                <td className="p-1">最大加工時間</td>
                <td className="p-1">編輯</td>
              </tr>
            </thead>
            <tbody>
              {toolSpecList?.length > 0 ? (
                toolSpecList.map((item, index) => (
                  <tr key={item.ToolSpecId}>
                    {editToolSpecMode && editToolSpecModeIndex === index ? (
                      <>
                        <td>{item.ToolSpecId}</td>
                        <td>
                          <input
                            type="text"
                            className="w-24 text-center text-black rounded-md"
                            value={editToolSpec.ModifyDatas.Name}
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  Name: e.target.value,
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={
                              editToolSpec.ModifyDatas.SpecData.BladeDiameter
                            }
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  SpecData: {
                                    ...prev.ModifyDatas.SpecData,
                                    BladeDiameter: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={
                              editToolSpec.ModifyDatas.SpecData.BladeHeight
                            }
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  SpecData: {
                                    ...prev.ModifyDatas.SpecData,
                                    BladeHeight: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={
                              editToolSpec.ModifyDatas.SpecData.TotalLength
                            }
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  SpecData: {
                                    ...prev.ModifyDatas.SpecData,
                                    TotalLength: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={
                              editToolSpec.ModifyDatas.SpecData.HandleDiameter
                            }
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  SpecData: {
                                    ...prev.ModifyDatas.SpecData,
                                    HandleDiameter: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={editToolSpec.ModifyDatas.SafetyStock}
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  SafetyStock: Number(e.target.value),
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={editToolSpec.ModifyDatas.MaxLife.RepairCnt}
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  MaxLife: {
                                    ...prev.ModifyDatas.MaxLife,
                                    RepairCnt: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={editToolSpec.ModifyDatas.MaxLife.ProcessCnt}
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  MaxLife: {
                                    ...prev.ModifyDatas.MaxLife,
                                    ProcessCnt: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={
                              editToolSpec.ModifyDatas.MaxLife.ProcessLength
                            }
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  MaxLife: {
                                    ...prev.ModifyDatas.MaxLife,
                                    ProcessLength: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="w-24 text-center text-black rounded-md"
                            value={editToolSpec.ModifyDatas.MaxLife.ProcessTime}
                            onChange={(e) => {
                              setEditToolSpec((prev) => ({
                                ...prev,
                                ModifyDatas: {
                                  ...prev.ModifyDatas,
                                  MaxLife: {
                                    ...prev.ModifyDatas.MaxLife,
                                    ProcessTime: Number(e.target.value),
                                  },
                                },
                              }));
                            }}
                          />
                        </td>
                        <td>
                          <span
                            className="bg-gray-500 rounded-md cursor-pointer hover:bg-gray-900"
                            onClick={() => patchToolSpec()}
                          >
                            完成
                          </span>
                          <span> / </span>
                          <span
                            className="bg-red-500 rounded-md cursor-pointer hover:bg-red-900"
                            onClick={() => deleteToolSpec()}
                          >
                            刪除
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-1">{item.ToolSpecId}</td>
                        <td className="p-1">{item.Name}</td>
                        <td className="p-1">{item.SpecData.BladeDiameter}</td>
                        <td className="p-1">{item.SpecData.BladeHeight}</td>
                        <td className="p-1">{item.SpecData.TotalLength}</td>
                        <td className="p-1">{item.SpecData.HandleDiameter}</td>
                        <td className="p-1">{item.SafetyStock}</td>
                        <td className="p-1">{item.MaxLife.RepairCnt}</td>
                        <td className="p-1">{item.MaxLife.ProcessCnt}</td>
                        <td className="p-1">{item.MaxLife.ProcessLength}</td>
                        <td className="p-1">{item.MaxLife.ProcessTime}</td>
                        <td
                          className="rounded-md cursor-pointer hover:bg-gray-900"
                          onClick={() => handleEditToolSpecMode(item, index)}
                        >
                          編輯
                        </td>
                      </>
                    )}
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
    </div>
  );
};

export default ToolSpecIndex;
