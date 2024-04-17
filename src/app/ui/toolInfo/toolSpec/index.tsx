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
    console.log("tool spec list ", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setToolSpecList(res.data.Values.ToolSpecList);
      return res.data.Values.ToolSpecList;
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

  let timer: ReturnType<typeof setTimeout>;
  const searchToolSpec = async (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const toolSpecList = await getToolSpecList();
      if (toolSpecList) {
        const filterData = toolSpecList?.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.ToolSpecId.toLowerCase().includes(value.toLowerCase())
          );
        });
        setToolSpecList(filterData);
      }
    }, 500);
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
          <div>
            <h2 className="my-4 text-center">刀具規格</h2>
            <input
              type="search"
              placeholder="搜尋刀具規格 ID / 名稱"
              className="flex p-2 mx-auto my-4 text-black rounded-md w-96"
              onChange={(e) => searchToolSpec(e.target.value)}
            />
          </div>
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
              newToolSpecMode ? "h-48" : "h-0"
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
                <td className="p-1 whitespace-nowrap">ID</td>
                <td className="p-1 whitespace-nowrap">名稱</td>
                <td className="p-1 whitespace-nowrap">Φ</td>
                <td className="p-1 whitespace-nowrap">高度</td>
                <td className="p-1 whitespace-nowrap">總長度</td>
                <td className="p-1 whitespace-nowrap">手柄Φ</td>
                <td className="p-1 whitespace-nowrap">安全庫存</td>
                <td className="p-1 whitespace-nowrap">最大修整次數</td>
                <td className="p-1 whitespace-nowrap">最大加工次數</td>
                <td className="p-1 whitespace-nowrap">最大加工長度</td>
                <td className="p-1 whitespace-nowrap">最大加工時間</td>
                <td className="p-1 whitespace-nowrap">編輯</td>
              </tr>
            </thead>
            <tbody>
              {toolSpecList?.length > 0 ? (
                toolSpecList.map((item, index) => (
                  <tr key={item.ToolSpecId}>
                    {editToolSpecMode && editToolSpecModeIndex === index ? (
                      <>
                        <td className="p-1 whitespace-nowrap">
                          {item.ToolSpecId}
                        </td>
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
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
                        <td className="p-1 whitespace-nowrap">
                          <span
                            className="p-1 bg-green-500 rounded-md cursor-pointer hover:bg-green-600"
                            onClick={() => patchToolSpec()}
                          >
                            完成
                          </span>
                          <span> / </span>
                          <span
                            className="p-1 bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
                            onClick={() => deleteToolSpec()}
                          >
                            刪除
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-1 whitespace-nowrap">
                          {item.ToolSpecId}
                        </td>
                        <td className="p-1 whitespace-nowrap">{item.Name}</td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SpecData.BladeDiameter}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SpecData.BladeHeight}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SpecData.TotalLength}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SpecData.HandleDiameter}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.SafetyStock}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MaxLife.RepairCnt}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MaxLife.ProcessCnt}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MaxLife.ProcessLength}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          {item.MaxLife.ProcessTime}
                        </td>
                        <td
                          className="rounded-md cursor-pointer hover:bg-gray-800"
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
