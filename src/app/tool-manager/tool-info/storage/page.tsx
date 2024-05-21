"use client";

import { useNotice } from "@/components/context/NoticeContext";
import StorageIndex from "@/components/storage";
import StorageNew from "@/components/storage/new";
import {
  BasicResponse,
  EditStorageItem,
  GetStorageListResponse,
  NewStorageItem,
  StorageBasicResponse,
  StorageItem,
} from "@/components/storage/types";
import {
  apiDeleteStorageInfo,
  apiEditSTorageInfo,
  apiGetStorageList,
  apiPostStorageInfo,
} from "@/scripts/Apis/storage/storageApi";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function PatchStorageResponse() {
  const { setShowNotice } = useNotice();
  const [storageList, setStorageList] = useState<StorageItem[]>([]);
  const [newStorage, setNewStorage] = useState<NewStorageItem>({
    StorageId: 0,
    Name: "",
  });
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editData, setEditData] = useState<EditStorageItem>(
    {} as EditStorageItem
  );

  const getStorageList = async () => {
    const data = await apiGetStorageList();
    const res = data as GetStorageListResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      setStorageList(res.data.Values.StorageMenus);
    } else {
      console.log(reqInt);
    }
  };

  const postStorage = async (e: FormEvent) => {
    e.preventDefault();
    const data = await apiPostStorageInfo(newStorage);
    const res = data as BasicResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      getStorageList();
      setNewStorage({
        StorageId: 0,
        Name: "",
      });
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗。errorCode: ${reqInt}`);
    }
  };

  const handleChangeNewStorage = (key: string, value: string | number) => {
    setNewStorage((prev) => ({ ...prev, [key]: value }));
  };

  const patchStorage = async () => {
    const data = await apiEditSTorageInfo(editData);
    const res = data as StorageBasicResponse;
    const reqInt = res.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      getStorageList();
      setEditMode(false);
      setEditIndex(-1);
      setEditData({
        StorageId: 0,
        Name: "",
      });
      handleNotice("success", true, "修改成功");
    }
  };

  const deleteStorage = async () => {
    const confirm = window.confirm("確定刪除嗎?");
    if (confirm) {
      const data = await apiDeleteStorageInfo(editData);
      const res = data as StorageBasicResponse;
      const reqInt = res.data?.Values?.ReqInt;
      if (reqInt === 0) {
        setEditMode(false);
        getStorageList();
        handleNotice("success", true, "刪除成功");
      }
      console.log(res);
    }
  };

  const handleEditMode = (item: StorageItem, index: number) => {
    console.log(item);

    setNewMode(false);
    setEditMode(true);
    setEditIndex(index);
    setEditData({
      StorageId: item.StorageId,
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
          editData={editData}
          setEditData={setEditData}
          patchStorage={patchStorage}
          deleteStorage={deleteStorage}
          handleEditMode={handleEditMode}
        />
      </div>
    </div>
  );
}
