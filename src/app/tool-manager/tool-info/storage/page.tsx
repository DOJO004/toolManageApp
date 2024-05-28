"use client";

import StorageIndex from "@/components/storage";
import StorageNew from "@/components/storage/new";
import {
  apiDeleteStorageInfo,
  apiEditSTorageInfo,
  apiGetStorageList,
  apiPostStorageInfo,
} from "@/scripts/Apis/toolInfo/toolInfo";
import {
  EditStorageItem,
  NewStorageItem,
  StorageMenuItem,
} from "@/scripts/Apis/toolInfo/type";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function PatchStorageResponse() {
  const handleNotice = useHandleNotice();
  const [storageList, setStorageList] = useState<StorageMenuItem[]>([]);
  const [newStorage, setNewStorage] = useState<NewStorageItem>(
    {} as NewStorageItem
  );
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editStorage, setEditStorage] = useState<EditStorageItem>(
    {} as EditStorageItem
  );

  const getStorageList = async () => {
    setStorageList(await apiGetStorageList());
  };

  const postStorage = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiPostStorageInfo(newStorage);
    if (reqInt === 0) {
      getStorageList();
      cleanNewStorage();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗。errorCode: ${reqInt}`);
    }
  };

  const cleanNewStorage = () => {
    setNewStorage({
      StorageId: 0,
      Name: "",
    });
  };

  const cleanEditStorage = () => {
    setEditStorage({
      StorageId: 0,
      Name: "",
    });
  };

  const handleChangeNewStorage = (key: string, value: string | number) => {
    setNewStorage((prev) => ({ ...prev, [key]: value }));
  };

  const patchStorage = async () => {
    const reqInt = await apiEditSTorageInfo(editStorage);
    if (reqInt === 0) {
      getStorageList();
      setEditMode(false);
      setEditIndex(-1);
      cleanEditStorage();
      handleNotice("success", true, "修改成功");
    }
  };

  const deleteStorage = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const reqInt = await apiDeleteStorageInfo(editStorage);
      if (reqInt === 0) {
        setEditMode(false);
        getStorageList();
        handleNotice("success", true, "刪除成功");
      }
    }
  };

  const handleEditMode = (item: StorageMenuItem, index: number) => {
    setNewMode(false);
    setEditMode(true);
    setEditIndex(index);
    setEditStorage({
      StorageId: item.StorageId,
      Name: item.Name,
    });
  };

  useEffect(() => {
    getStorageList();
  }, []);

  return (
    <div className="w-full p-4 text-center">
      <div className="relative">
        <h1>倉儲列表</h1>
        <button
          className="absolute top-0 right-0 p-2 border rounded-md hover:bg-gray-900"
          onClick={() => setNewMode(!newMode)}
        >
          新增
        </button>
      </div>
      <div
        className={` transition-all duration-300 overflow-hidden ease-in-out ${newMode ? "h-52" : "h-0"}`}
      >
        <StorageNew
          postStorage={postStorage}
          newStorage={newStorage}
          handleChangeNewStorage={handleChangeNewStorage}
        />
      </div>
      <div className="my-4 overflow-hidden bg-gray-900 rounded-md ">
        <StorageIndex
          storageList={storageList}
          editIndex={editIndex}
          editMode={editMode}
          editStorage={editStorage}
          setEditStorage={setEditStorage}
          patchStorage={patchStorage}
          deleteStorage={deleteStorage}
          handleEditMode={handleEditMode}
        />
      </div>
    </div>
  );
}
