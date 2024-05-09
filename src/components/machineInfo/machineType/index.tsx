"use client";

import {
  apiDeleteMachineType,
  apiEditMachineType,
  apiGetMachineTypeList,
} from "@/scripts/Apis/machineType/machineType";
import { useEffect, useState } from "react";
import NewMachineType from "./new";
import {
  DeleteMachineTypeResponse,
  GetMachineTypeListResponse,
  MachineTypeItem,
} from "./types";

const MachineTypeIndex = () => {
  const [machineTypeList, setMachineTypeList] = useState<MachineTypeItem[]>([]);
  const [newMachineTypeMode, setNewMachineTypeMode] = useState(false);
  const [editMachineTypeMode, setEditMachineTypeMode] = useState(false);
  const [editMachineTypeModeIndex, setEditMachineTypeModeIndex] = useState(-1);

  const [editMachineType, setEditMachineType] = useState<MachineTypeItem>(
    {} as MachineTypeItem
  );
  const getMachineTypeList = async () => {
    const data = await apiGetMachineTypeList();
    const res = data as GetMachineTypeListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
      return res.data.Values.MachineTypeList;
    }
  };

  const patchMachineType = async () => {
    const data = await apiEditMachineType(editMachineType);
    const res = data as GetMachineTypeListResponse;
    if (res?.data?.Values?.ReqInt === 0) {
      setEditMachineTypeMode(false);
      getMachineTypeList();
    }
  };

  const deleteMachineType = async () => {
    const confirm = window.confirm(`確定刪除 ${editMachineType.Name} 嗎?`);
    if (confirm) {
      const data = await apiDeleteMachineType(editMachineType);
      const res = data as DeleteMachineTypeResponse;
      if (res?.data?.Values?.ReqInt === 0) {
        setEditMachineTypeMode(false);
        getMachineTypeList();
      }
    }
  };

  let timer: ReturnType<typeof setTimeout>;
  const searchMachineType = (value: string) => {
    clearTimeout(timer);

    timer = setTimeout(async () => {
      const machineTypeList = await getMachineTypeList();
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
          />
        </div>
        <div className="mt-2 overflow-hidden bg-gray-900 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">設備ID</th>
                <th className="p-1 whitespace-nowrap">設備名稱</th>
                <th className="p-1 whitespace-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              {machineTypeList.length > 0 ? (
                machineTypeList.map((item, index: number) =>
                  // edit
                  editMachineTypeMode && editMachineTypeModeIndex === index ? (
                    <tr key={item.Id}>
                      <td>{editMachineType.Id}</td>
                      <td>
                        <input
                          type="text"
                          className="p-1 text-center text-black rounded-md w-96"
                          value={editMachineType.Name}
                          onChange={(e) => {
                            setEditMachineType((prev) => ({
                              ...prev,
                              Name: e.target.value,
                            }));
                          }}
                          autoFocus
                        />
                      </td>
                      <td>
                        <button
                          className="p-1 bg-green-500 rounded-md hover:bg-green-600"
                          onClick={() => patchMachineType()}
                        >
                          完成
                        </button>
                        <span> / </span>
                        <button
                          className="p-1 bg-red-500 rounded-md hover:bg-red-900"
                          onClick={() => deleteMachineType()}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index} className="text-center hover:bg-gray-600">
                      <td className="p-1 whitespace-nowrap">{item.Id}</td>
                      <td className="p-1 whitespace-nowrap">{item.Name}</td>
                      <td className="p-1 whitespace-nowrap">
                        <button
                          className="p-1 hover:bg-gray-900"
                          onClick={() =>
                            handleClickEditMachineType(item, index)
                          }
                        >
                          編輯
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3}>no data...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MachineTypeIndex;
