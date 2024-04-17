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
    <div className="flex p-4 text-center ">
      <div className="w-full mx-4">
        <div className="relative">
          <button
            className="absolute right-0 p-1 border top-px-0 hover:bg-gray-600"
            onClick={() => handleClickNewMachineType()}
          >
            新增
          </button>
          <h2 className="">設備類型</h2>
        </div>
        {/* new */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            newMachineTypeMode ? "h-40" : "h-0"
          }`}
        >
          <NewMachineType
            getMachineTypeList={getMachineTypeList}
            setNewMachineTypeMode={setNewMachineTypeMode}
          />
        </div>
        <div className="mt-2 overflow-auto bg-gray-700 rounded-t-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">設備ID</th>
                <th className="p-1 whitespace-nowrap">設備名稱</th>
                <th className="p-1 whitespace-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              {machineTypeList.map((item, index: number) =>
                // edit
                editMachineTypeMode && editMachineTypeModeIndex === index ? (
                  <tr key={item.Id}>
                    <td>{editMachineType.Id}</td>
                    <td>
                      <input
                        type="text"
                        className="w-full p-1 text-center text-black rounded-md"
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
                        className="p-1 bg-gray-500 rounded-md hover:bg-gray-900"
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
                        onClick={() => handleClickEditMachineType(item, index)}
                      >
                        編輯
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MachineTypeIndex;
