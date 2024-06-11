"use client";
import ToolSpecIndex from "@/components/toolInfo/toolSpec";
import { NewToolSpec } from "@/components/toolInfo/toolSpec/new";
import {
  apiDeleteToolSpec,
  apiEditToolSpec,
  apiGetToolSpecList,
  apiGetToolTypeList,
  apiNewToolSpec,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import {
  NewToolSpecItem,
  ToolSpecItem,
  ToolTypeItem,
  editToolSpecItem,
} from "@/scripts/Apis/toolInfo/types";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [toolSpecList, setToolSpecList] = useState<ToolSpecItem[]>([]);
  const [toolTypeList, setToolTypeList] = useState<ToolTypeItem[]>([]);
  const [newToolSpec, setNewToolSpec] = useState<NewToolSpecItem>(
    {} as NewToolSpecItem
  );
  const [newToolSpecMode, setNewToolSpecMode] = useState(false);
  const [editToolSpecMode, setEditToolSpecMode] = useState(false);
  const [editToolSpecModeIndex, setEditToolSpecModeIndex] = useState(-1);

  const [editToolSpec, setEditToolSpec] = useState<editToolSpecItem>({
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

  const getToolTypeList = async () => {
    setToolTypeList(await apiGetToolTypeList());
  };

  const getToolSpecList = async () => {
    setToolSpecList(await apiGetToolSpecList());
  };

  const postNewToolSpec = async (e: FormEvent) => {
    e.preventDefault();

    const reqInt = await apiNewToolSpec(newToolSpec);

    if (reqInt === 0) {
      getToolSpecList();
      handleNotice("success", true, "新增成功");
      cleanNewToolSpec();
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const patchToolSpec = async () => {
    const reqInt = await apiEditToolSpec(editToolSpec);
    if (reqInt === 0) {
      setEditToolSpecMode(false);
      getToolSpecList();
      handleNotice("success", true, "修改成功");
    } else {
      handleNotice("error", true, `修改失敗，errorCode = ${reqInt}`);
    }
  };

  const deleteToolSpec = async () => {
    const confirm = window.confirm(`確定要刪除 ${editToolSpec.ToolSpecId} 嗎?`);
    if (confirm) {
      const reqInt = await apiDeleteToolSpec(editToolSpec);
      if (reqInt === 0) {
        setEditToolSpecMode(false);
        getToolSpecList();
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice("error", true, `刪除失敗，errorCode = ${reqInt}`);
      }
    }
  };

  const cleanNewToolSpec = () => {
    setNewToolSpec({
      ToolSpecId: "",
      Name: "",
      ToolTypeId: "",
      SafetyStock: 0,
      BladeDiameter: 0,
      BladeHeight: 0,
      TotalLength: 0,
      HandleDiameter: 0,
      ProcessCnt: 0,
      ProcessTime: "",
      ProcessLength: 0,
      RepairCnt: 0,
    });
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchToolSpec = async (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const toolSpecList = await apiGetToolSpecList();
      if (toolSpecList) {
        const filterData = toolSpecList.filter((item) => {
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

  const handleNewToolSpec = (key: string, value: string | number) => {
    setNewToolSpec({ ...newToolSpec, [key]: value });
  };

  const handleEditToolSpecMode = (item: ToolSpecItem, index: number) => {
    console.log("handle edit tool spec mode", item);

    setEditToolSpecMode(true);
    setNewToolSpecMode(false);
    setEditToolSpecModeIndex(index);
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

  const handleEditToolSpec = (key: string, value: string) => {
    setEditToolSpec({ ...editToolSpec, [key]: value });
  };

  useEffect(() => {
    getToolSpecList();
    getToolTypeList();
  }, []);
  return (
    <div className="relative flex p-4 overflow-auto 2xl:max-w-full">
      <div className="">
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

        {/* new */}
        <div
          className={` transition-all duration-300 my-2  ease-in-out rounded-md overflow-hidden  ${
            newToolSpecMode ? "h-auto" : "h-0"
          }`}
        >
          <NewToolSpec
            setNewToolSpecMode={setNewToolSpecMode}
            postNewToolSpec={postNewToolSpec}
            newToolSpec={newToolSpec}
            handleNewToolSpec={handleNewToolSpec}
            toolTypeList={toolTypeList}
          />
        </div>
        <div className="overflow-hidden text-center bg-gray-900 rounded-md ">
          <ToolSpecIndex
            toolSpecList={toolSpecList}
            editToolSpecMode={editToolSpecMode}
            editToolSpecModeIndex={editToolSpecModeIndex}
            editToolSpec={editToolSpec}
            handleEditToolSpec={handleEditToolSpec}
            patchToolSpec={patchToolSpec}
            deleteToolSpec={deleteToolSpec}
            handleEditToolSpecMode={handleEditToolSpecMode}
          />
        </div>
      </div>
    </div>
  );
}
