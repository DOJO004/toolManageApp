"use client";
import { useNotice } from "@/components/context/NoticeContext";
import SweetAlert from "@/components/sweetAlert";
import ToolTypeIndex from "@/components/toolInfo/toolType";
import { NewToolType } from "@/components/toolInfo/toolType/new";
import {
  DeleteToolTypeResponse,
  GetToolTypeListResponse,
  PatchToolTypeResponse,
  PostToolTypeResponse,
  ToolTypeItem,
} from "@/components/toolInfo/toolType/types";
import {
  apiDeleteToolType,
  apiEditToolType,
  apiGetToolTypeList,
  apiNewToolType,
} from "@/scripts/Apis/toolType/toolTypeApi";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [toolTypeList, setToolTypeList] = useState<ToolTypeItem[]>([]);
  const [newToolType, setNewToolType] = useState<ToolTypeItem>({
    Id: "",
    Name: "",
  });
  const [newToolTypeMode, setNewToolTypeMode] = useState(false);
  const [editToolTypeMode, setEditToolTypeMode] = useState(false);
  const [editToolTypeModeIndex, setEditToolTypeModeIndex] = useState(-1);
  const [editToolType, setEditToolType] = useState<ToolTypeItem>({
    Id: "",
    Name: "",
  });

  const getToolTypeList = async (count = 0) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗，請重新整理頁面。");
      return;
    }
    try {
      const data = await apiGetToolTypeList();
      const res = data as GetToolTypeListResponse;
      console.log(`tool type list`, res);

      if (res?.data?.Values?.ReqInt === 0) {
        setToolTypeList(res.data.Values.ToolTypeMenus);
        return res.data.Values.ToolTypeMenus;
      } else {
        console.log(`ReqInt = ${res.data.Values.ReqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      console.log(count);
      // 等待秒一後再次嘗試
      setTimeout(() => {
        getToolTypeList(count + 1);
      }, 1000);
    }
  };

  const postToolType = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiNewToolType(newToolType);
    const res = data as PostToolTypeResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    const inputToolTypeId = document.querySelector<HTMLInputElement>("#id");
    console.log(res);

    if (reqInt === 0) {
      handleNotice("success", true, "新增成功");
      setNewToolType({
        Id: "",
        Name: "",
      });
      getToolTypeList();
      if (inputToolTypeId) {
        inputToolTypeId.focus();
      }
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const patchToolType = async () => {
    const data = await apiEditToolType(editToolType);
    const res = data as PatchToolTypeResponse;
    const reqInt = res.data.Values.ReqInt;
    if (reqInt === 0) {
      setEditToolTypeMode(false);
      getToolTypeList();
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗，errorcode = ${reqInt}`);
    }
  };

  const deleteToolType = async (item: ToolTypeItem) => {
    console.log(item);
    const confirm = window.confirm(`確定刪除 ${item.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteToolType(item.Id);
      const res = data as DeleteToolTypeResponse;
      if (res.data.Values.ReqInt === 0) {
        getToolTypeList();
        setEditToolTypeMode(false);
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice(
          "error",
          true,
          `刪除失敗，errorcode = ${res.data.Values.ReqInt}`
        );
      }
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const filterToolTypeList = async (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const data: ToolTypeItem[] | undefined = await getToolTypeList();

      if (data) {
        const filterData = data.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.Id.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log("filter data", filterData);

        setToolTypeList(filterData);
      } else {
        console.log("获取工具类型列表失败或返回的数据为空");
      }
    }, 500);
  };

  const handleClickNewToolType = () => {
    setEditToolTypeMode(false);
    setNewToolTypeMode(!newToolTypeMode);
  };

  const handleClickEditToolType = (item: ToolTypeItem, index: number) => {
    setNewToolTypeMode(false);
    setEditToolTypeMode(true);
    setEditToolTypeModeIndex(index);
    setEditToolType({
      Id: item.Id,
      Name: item.Name,
    });
  };

  const handleNotice = (
    typeColor: AlertColor,
    show: boolean,
    messages: string
  ) => {
    setShowNotice({
      type: typeColor,
      show: show,
      messages: messages,
    });
  };

  useEffect(() => {
    getToolTypeList();
  }, []);

  return (
    <div className="w-full">
      {/* index */}
      <div className="w-full py-4 ">
        <div className="relative ">
          <button
            className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-600 "
            onClick={() => handleClickNewToolType()}
          >
            新增
          </button>
          <h2 className="text-center ">刀具類型</h2>

          {/* new */}
          <div
            className={`overflow-hidden relative transition-all my-4  duration-300 ease-in-out ${
              newToolTypeMode ? "h-48" : "h-0"
            }`}
          >
            <button
              className="absolute top-0 p-2 transition-all duration-300 right-5 hover:rounded-full hover:bg-gray-900"
              onClick={() => handleClickNewToolType()}
            >
              X
            </button>
            <NewToolType
              postToolType={postToolType}
              newToolType={newToolType}
              setNewToolType={setNewToolType}
            />
          </div>
          {/* search */}
          <input
            type="search"
            className="flex p-2 mx-auto my-2 text-black rounded-md w-96 "
            placeholder="請輸入搜尋關鍵字"
            onChange={(e) => filterToolTypeList(e.target.value)}
          />
        </div>
        <div className="mx-auto overflow-auto bg-gray-800 rounded-md ">
          <ToolTypeIndex
            toolTypeList={toolTypeList}
            editToolTypeMode={editToolTypeMode}
            editToolTypeModeIndex={editToolTypeModeIndex}
            editToolType={editToolType}
            setEditToolType={setEditToolType}
            patchToolType={patchToolType}
            deleteToolType={deleteToolType}
            handleClickEditToolType={handleClickEditToolType}
          />
        </div>
      </div>
    </div>
  );
}
