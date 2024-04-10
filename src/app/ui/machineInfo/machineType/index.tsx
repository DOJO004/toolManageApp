"use client";

import { apiGetMachineTypeList } from "@/scripts/Apis/machineType/machineType";
import { useEffect, useState } from "react";
import EditMachineType from "./edit";
import NewMachineType from "./new";

const MachineTypeIndex = () => {
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [newMachineTypeMode, setNewMachineTypeMode] = useState(false);
  const [editMachineTypeMode, setEditMachineTypeMode] = useState(false);

  const [editMachineType, setEditMachineType] = useState({
    Id: "",
    Name: "",
  });
  const getMachineTypeList = async () => {
    const res: any = await apiGetMachineTypeList();
    if (res?.data?.Values?.ReqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };

  const handleClickNewMachineType = () => {
    setNewMachineTypeMode(!newMachineTypeMode);
    setEditMachineTypeMode(false);
  };

  const handleClickEditMachineType = (item: any) => {
    setEditMachineTypeMode(true);
    setNewMachineTypeMode(false);

    setEditMachineType(item);
  };

  useEffect(() => {
    getMachineTypeList();
  }, []);
  return (
    <div className="flex p-4 text-center ">
      <div className="w-full mx-4">
        <div className="relative">
          <button
            className="absolute top-0 right-0 border hover:bg-gray-600"
            onClick={() => handleClickNewMachineType()}
          >
            新增
          </button>
          <h2 className="">設備類型</h2>
        </div>
        <div className="mt-2 overflow-auto bg-gray-700 rounded-t-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-indigo-500 ">
                <th className="p-1 whitespace-nowrap">設備ID</th>
                <th className="p-1 whitespace-nowrap">設備名稱</th>
              </tr>
            </thead>
            <tbody>
              {machineTypeList.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="text-center cursor-pointer hover:bg-gray-600"
                  onClick={() => handleClickEditMachineType(item)}
                >
                  <td className="p-1 whitespace-nowrap">{item.Id}</td>
                  <td className="p-1 whitespace-nowrap">{item.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* new */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          newMachineTypeMode ? "w-1/2" : "w-0"
        }`}
      >
        <NewMachineType
          getMachineTypeList={getMachineTypeList}
          setNewMachineTypeMode={setNewMachineTypeMode}
        />
      </div>
      {/* edit */}
      <div
        className={` overflow-hidden transition-all duration-300 ease-in-out ${
          editMachineTypeMode ? "w-1/2" : "w-0"
        } `}
      >
        <EditMachineType
          editMachineType={editMachineType}
          setEditMachineType={setEditMachineType}
          setEditMachineTypeMode={setEditMachineTypeMode}
          getMachineTypeList={getMachineTypeList}
        />
      </div>
    </div>
  );
};
export default MachineTypeIndex;
