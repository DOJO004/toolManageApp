"use client";

import {
  ApiDeleteDepartment,
  ApiGetDepartmentList,
  ApiPatchDepartment,
} from "@/scripts/Apis/userInfo/departmentApi";
import React, { useEffect, useState } from "react";
import NewDepartment from "./new";
import { DepartmentItem, DepartmentList, EditDepartmentItem } from "./type";

export default function IndexDepartment() {
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);
  const [newDepartmentMode, setNewDepartmentMode] = useState<boolean>(false);
  const [editDepartmentMode, setEditDepartmentMode] = useState<boolean>(false);
  const [editDepartmentModeIndex, setEditDepartmentModeIndex] =
    useState<number>(-1);

  const [editDepartment, setEditDepartment] = useState<EditDepartmentItem>({
    DepartmentId: "",
    Name: "",
  });

  const getDepartmentList = async () => {
    const data = await ApiGetDepartmentList();
    const res = data as DepartmentList;
    if (res?.data?.Values?.ReqInt === 0) {
      setDepartmentList(res.data.Values.DepartmentMenus);
    }
  };

  const patchDepartment = async () => {
    const data = await ApiPatchDepartment(editDepartment);
    console.log(data);
  };

  const deleteDepartment = async () => {
    const confirm = window.confirm(
      `確定要刪除 ${editDepartment.DepartmentId} 嗎?`
    );
    if (!confirm) return;
    const data = await ApiDeleteDepartment(editDepartment.DepartmentId);
    console.log(data);
  };

  const handleEditMode = (data: DepartmentItem, index: number) => {
    setEditDepartmentMode(true);
    setEditDepartmentModeIndex(index);
    setEditDepartment({
      DepartmentId: data.Id,
      Name: data.Name,
    });
  };
  useEffect(() => {
    getDepartmentList();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="relative my-4">
        <h1 className="text-center ">部門資訊列表</h1>
        <button
          className="absolute top-0 right-0 p-1 border hover:bg-gray-500"
          onClick={() => setNewDepartmentMode(true)}
        >
          新增
        </button>
      </div>
      <div
        className={`my-4 transition-all overflow-hidden duration-300 ease-in-out ${
          newDepartmentMode ? "h-60" : "h-0"
        }`}
      >
        <NewDepartment
          getDepartmentList={getDepartmentList}
          setNewDepartmentMode={setNewDepartmentMode}
        />
      </div>
      <div className="w-full overflow-auto text-center bg-gray-500 rounded-md ">
        <table className="w-full ">
          <thead>
            <tr className="bg-indigo-500 ">
              <th className="p-1 whitespace-nowrap">部門 ID</th>
              <th className="p-1 whitespace-nowrap">部門 名稱</th>
              <th className="p-1 whitespace-nowrap">最後更新</th>
              <th className="p-1 whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {departmentList.length > 0
              ? departmentList.map((item, index) => (
                  <React.Fragment key={item.Id}>
                    {editDepartmentMode && editDepartmentModeIndex === index ? (
                      <tr>
                        <td className="p-1 whitespace-nowrap">{item.Id}</td>
                        <td className="p-1 whitespace-nowrap">
                          <input
                            type="text"
                            className="w-full p-2 text-center text-black rounded-md"
                            value={editDepartment.Name}
                            onChange={(e) =>
                              setEditDepartment((prev) => ({
                                ...prev,
                                Name: e.target.value,
                              }))
                            }
                          />
                        </td>
                        <td> - </td>
                        <td>
                          <button onClick={() => patchDepartment()}>
                            完成
                          </button>
                          /
                          <button onClick={() => deleteDepartment()}>
                            刪除
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="p-1 whitespace-nowrap">{item.Id}</td>
                        <td className="p-1 whitespace-nowrap">{item.Name}</td>
                        <td className="p-1 whitespace-nowrap">
                          {item.LastModify}
                        </td>
                        <td className="p-1 whitespace-nowrap">
                          <button onClick={() => handleEditMode(item, index)}>
                            編輯
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
