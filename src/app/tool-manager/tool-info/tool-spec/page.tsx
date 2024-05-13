"use client";
import SweetAlert from "@/components/sweetAlert";
import ToolSpecIndex from "@/components/toolInfo/toolSpec";
import { NewToolSpec } from "@/components/toolInfo/toolSpec/new";
import {
  DeleteToolSpecResponse,
  GetToolSpecListResponse,
  PatchToolSpecResponse,
  PostToolSpecResponse,
  ToolSpecItem,
  editToolSpecItem,
} from "@/components/toolInfo/toolSpec/types";
import {
  GetToolTypeListResponse,
  ToolTypeItem,
} from "@/components/toolInfo/toolType/types";
import {
  apiDeleteToolSpec,
  apiEditToolSpec,
  apiGetToolSpecList,
  apiNewToolSpec,
} from "@/scripts/Apis/toolSpec/toolSpecApi";
import { apiGetToolTypeList } from "@/scripts/Apis/toolType/toolTypeApi";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
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
    const data = await apiGetToolTypeList();
    const res = data as GetToolTypeListResponse;

    if (res?.data?.Values?.ReqInt === 0) {
      setToolTypeList(res.data.Values.ToolTypeMenus);
    }
  };

  const getToolSpecList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
    } else {
      const data = await apiGetToolSpecList();
      const res = data as GetToolSpecListResponse;
      console.log("tool spec list ", res);

      if (res?.data?.Values?.ReqInt === 0) {
        setToolSpecList(res.data.Values.ToolSpecList);
        return res.data.Values.ToolSpecList;
      } else {
        getToolSpecList(count + 1);
      }
    }
  };

  const patchToolSpec = async () => {
    const data = await apiEditToolSpec(editToolSpec);
    const res = data as PatchToolSpecResponse;
    const reqInt = res.data?.Values?.ReqInt;

    console.log("patch tool spec", res);

    if (reqInt === 0) {
      setEditToolSpecMode(false);
      getToolSpecList();
    } else {
      console.log(reqInt);
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
      Name: item.Name,
      ToolTypeId: item.ToolTypeData.Name,
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
            newToolSpecMode ? "h-48" : "h-0"
          }`}
        >
          <NewToolSpec
            setNewToolSpecMode={setNewToolSpecMode}
            postNewToolSpec={postNewToolSpec}
            toolSpec={toolSpec}
            setToolSpec={setToolSpec}
            toolTypeList={toolTypeList}
            handelSetToolSpec={handelSetToolSpec}
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
