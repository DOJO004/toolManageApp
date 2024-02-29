"use client";

import MachineTypeNew from "@/app/ui/machineInfo/machineType/new";
import { confirmDisable } from "@/scripts/apis/base";
import {
  apiDisabledMachineType,
  apiEditMachineType,
  apiGetMachineTypeList,
} from "@/scripts/apis/machine-type";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [machineTypeList, setMachineTypeList] = useState([]);
  const [editMachineType, setEditMachineType] = useState({
    Id: "",
    Name: "",
  });

  const [newMachineTypeToggle, setNewMachineTypeToggle] = useState(false);
  const [editMachineTypeToggle, setEditMachineTypeToggle] = useState(false);
  const [editMachineTypeIndex, setEditMachineTypeIndex] = useState(-1);

  const fetchGetMachineTypeList = async () => {
    const res = await apiGetMachineTypeList();
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      setMachineTypeList(res.data.Values.MachineTypeList);
    }
  };

  const fetchEditMachineType = async () => {
    const res = await apiEditMachineType(editMachineType);
    const reqInt = res?.data?.Values?.ReqInt;
    console.log(res);

    if (reqInt === 0) {
      fetchGetMachineTypeList();
      setEditMachineTypeToggle(false);
    }
  };

  const fetchDisabledMachineType = async () => {
    const confirm = confirmDisable();
    if (confirm) {
      const res = await apiDisabledMachineType(editMachineType.Id);
      const reqInt = res?.data?.Values?.ReqInt;
      console.log(res);

      if (reqInt === 0) {
        fetchGetMachineTypeList();
        setEditMachineTypeToggle(false);
      }
    }
  };

  const handleEditInput = (value: string) => {
    setEditMachineType((prev) => ({
      ...prev,
      Name: value,
    }));
  };

  const handleEditToggle = (id: string, name: string, index: number) => {
    setEditMachineTypeToggle(true);
    setEditMachineTypeIndex(index);
    setEditMachineType({
      Id: id,
      Name: name,
    });
  };

  useEffect(() => {
    fetchGetMachineTypeList();
  }, []);
  return (
    <div className="w-full p-2 mx-2 bg-gray-900 rounded-md ">
      <div className="grid items-center justify-center grid-cols-3 gap-2 pb-2 border-b-2 ">
        <p className="col-start-2 col-end-3 text-xl">machine type</p>
        <button
          className="p-1 border rounded-md hover:bg-gray-700 w-fit "
          onClick={() => setNewMachineTypeToggle(!newMachineTypeToggle)}
        >
          新增
        </button>
      </div>
      {newMachineTypeToggle && (
        <MachineTypeNew fetchGetMachineTypeList={fetchGetMachineTypeList} />
      )}

      <div className="grid grid-cols-3 gap-2 my-4 text-center bg-indigo-500 rounded-t-md">
        <p>ID</p>
        <p>Name</p>
        <p>編輯</p>
      </div>
      <div className="grid grid-cols-3 gap-2 my-4 text-center">
        {machineTypeList.map((item, index) =>
          editMachineTypeToggle && editMachineTypeIndex === index ? (
            <React.Fragment key={item.Id}>
              <div>{editMachineType.Id}</div>
              <div>
                <input
                  type="text"
                  className="text-center input"
                  value={editMachineType.Name}
                  onChange={(e) => handleEditInput(e.target.value)}
                />
              </div>
              <div>
                <button className="mx-1" onClick={() => fetchEditMachineType()}>
                  完成
                </button>
                <button
                  className="mx-1"
                  onClick={() => fetchDisabledMachineType()}
                >
                  刪除
                </button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment key={item.Id}>
              <div>{item.Id}</div>
              <div>{item.Name}</div>
              <button
                onClick={() => handleEditToggle(item.Id, item.Name, index)}
              >
                編輯
              </button>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
