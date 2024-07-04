"use client";
import ToolTypeIndex from "@/components/toolInfo/toolType";
import { NewToolType } from "@/components/toolInfo/toolType/new";
import {
  apiDeleteToolType,
  apiEditToolType,
  apiGetToolTypeList,
  apiNewToolType,
} from "@/scripts/Apis/toolInfo/toolInfoApis";
import { ToolTypeItem } from "@/scripts/Apis/toolInfo/types";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
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
  const [isPending, setIsPending] = useState(false);

  const getToolTypeList = async () => {
    setToolTypeList(await apiGetToolTypeList());
  };

  const postToolType = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    const reqInt = await apiNewToolType(newToolType);

    if (reqInt === 0) {
      handleNotice("success", true, "新增成功");
      cleanNewToolType();
      getToolTypeList();
    } else {
      handleNotice("error", true, `新增失敗。errorCode = ${reqInt}`);
    }
    setIsPending(false);
  };

  const cleanNewToolType = () => {
    setNewToolType({
      Id: "",
      Name: "",
    });
  };

  const patchToolType = async () => {
    setIsPending(true);
    const reqInt = await apiEditToolType(editToolType);
    if (reqInt === 0) {
      setEditToolTypeMode(false);
      getToolTypeList();
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗，errorcode = ${reqInt}`);
    }
    setIsPending(false);
  };

  const deleteToolType = async (item: ToolTypeItem) => {
    const confirm = window.confirm(`確定刪除 ${item.Name} 嗎?`);
    if (confirm) {
      const reqInt = await apiDeleteToolType(item);
      if (reqInt === 0) {
        getToolTypeList();
        setEditToolTypeMode(false);
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice("error", true, `刪除失敗。errorcode = ${reqInt}`);
      }
    }
  };

  // searchToolType
  let timer: ReturnType<typeof setTimeout>;
  const filterToolTypeList = async (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const data: ToolTypeItem[] = await apiGetToolTypeList();
      if (data) {
        const filterData = data.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.Id.toLowerCase().includes(value.toLowerCase())
          );
        });
        setToolTypeList(filterData);
      } else {
        setToolTypeList([]);
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
              isPending={isPending}
            />
          </div>
          {/* search */}
          <input
            type="search"
            className="flex p-2 mx-auto my-2 text-black rounded-md w-96 "
            placeholder="搜尋ID、名稱"
            onChange={(e) => filterToolTypeList(e.target.value)}
          />
        </div>
        <div className="mx-auto overflow-auto bg-gray-900 rounded-md ">
          <ToolTypeIndex
            toolTypeList={toolTypeList}
            editToolTypeMode={editToolTypeMode}
            editToolTypeModeIndex={editToolTypeModeIndex}
            editToolType={editToolType}
            setEditToolType={setEditToolType}
            patchToolType={patchToolType}
            deleteToolType={deleteToolType}
            handleClickEditToolType={handleClickEditToolType}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}
