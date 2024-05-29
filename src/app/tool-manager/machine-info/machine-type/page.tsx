"use client";

import MachineTypeIndex from "@/components/machineInfo/machineType";
import NewMachineType from "@/components/machineInfo/machineType/new";
import {
  apiDeleteMachineType,
  apiEditMachineType,
  apiGetMachineTypeList,
  apiNewMachineType,
} from "@/scripts/Apis/machineInfo/machineInfoApis";
import {
  EditMachineTypeItem,
  MachineTypeItem,
  NewMachineTypeItem,
} from "@/scripts/Apis/machineInfo/types";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [machineTypeList, setMachineTypeList] = useState<MachineTypeItem[]>([]);
  const [newMachineType, setNewMachineType] = useState<NewMachineTypeItem>(
    {} as NewMachineTypeItem
  );
  const [editMachineType, setEditMachineType] = useState<EditMachineTypeItem>(
    {} as EditMachineTypeItem
  );
  const [newMachineTypeMode, setNewMachineTypeMode] = useState(false);
  const [editMachineTypeMode, setEditMachineTypeMode] = useState(false);
  const [editMachineTypeModeIndex, setEditMachineTypeModeIndex] = useState(-1);

  const getMachineTypeList = async () => {
    setMachineTypeList(await apiGetMachineTypeList());
  };

  const postMachineType = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiNewMachineType(newMachineType);
    if (reqInt === 0) {
      cleanNewMachineType();
      getMachineTypeList();
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const cleanNewMachineType = () => {
    setNewMachineType({
      Id: "",
      Name: "",
    });
  };

  const handleNewMachineType = (key: string, value: string) => {
    setNewMachineType((prev) => ({ ...prev, [key]: value }));
  };

  const patchMachineType = async () => {
    const reqInt = await apiEditMachineType(editMachineType);
    if (reqInt === 0) {
      setEditMachineTypeMode(false);
      getMachineTypeList();
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗。errorCode = ${reqInt}`);
    }
  };

  const deleteMachineType = async () => {
    const confirm = window.confirm(`確定刪除 ${editMachineType.Name} 嗎?`);
    if (confirm) {
      const reqInt = await apiDeleteMachineType(editMachineType);
      if (reqInt === 0) {
        setEditMachineTypeMode(false);
        getMachineTypeList();
        handleNotice("success", true, "刪除成功");
      } else {
        handleNotice("error", true, `刪除失敗。errorCode = ${reqInt}`);
      }
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchMachineType = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const machineTypeList = await apiGetMachineTypeList();
      if (machineTypeList) {
        const filterData = machineTypeList.filter((item) => {
          return (
            item.Name.toLowerCase().includes(value.toLowerCase()) ||
            item.Id.toLowerCase().includes(value.toLowerCase())
          );
        });
        setMachineTypeList(filterData);
      }
    }, 500);
  };

  const handleClickNewMachineType = () => {
    setNewMachineTypeMode(!newMachineTypeMode);
    setEditMachineTypeMode(false);
  };

  const handleClickEditMachineType = (item: MachineTypeItem, index: number) => {
    setEditMachineTypeMode(true);
    setNewMachineTypeMode(false);

    setEditMachineType(item);
    setEditMachineTypeModeIndex(index);
  };

  useEffect(() => {
    getMachineTypeList();
  }, []);
  return (
    <div className="flex w-full p-4 text-center ">
      <div className="w-full mx-4">
        <div className="relative">
          <button
            className="absolute right-0 p-1 border top-px-0 hover:bg-gray-600"
            onClick={() => handleClickNewMachineType()}
          >
            新增
          </button>
          <div>
            <h2 className="">設備類型</h2>
            <input
              type="search"
              placeholder="搜尋 ID / 名稱"
              className="p-2 my-2 text-black rounded-md w-96"
              onChange={(e) => searchMachineType(e.target.value)}
            />
          </div>
        </div>
        {/* new */}
        <div
          className={`overflow-hidden transition-all my-4 duration-300 ease-in-out ${
            newMachineTypeMode ? "h-60" : "h-0"
          }`}
        >
          <NewMachineType
            getMachineTypeList={getMachineTypeList}
            setNewMachineTypeMode={setNewMachineTypeMode}
            postMachineType={postMachineType}
            newMachineType={newMachineType}
            handleNewMachineType={handleNewMachineType}
          />
        </div>
        <div className="mt-2 overflow-hidden bg-gray-900 rounded-md">
          <MachineTypeIndex
            machineTypeList={machineTypeList}
            editMachineTypeMode={editMachineTypeMode}
            editMachineTypeModeIndex={editMachineTypeModeIndex}
            editMachineType={editMachineType}
            setEditMachineType={setEditMachineType}
            patchMachineType={patchMachineType}
            deleteMachineType={deleteMachineType}
            handleClickEditMachineType={handleClickEditMachineType}
          />
        </div>
      </div>
    </div>
  );
}
