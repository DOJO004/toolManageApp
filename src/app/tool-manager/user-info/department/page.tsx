"use client";

import NewDepartment from "@/components/userInfo/department/new";
import {
  DepartmentItem,
  EditDepartmentItem,
  NewDepartmentItem,
} from "@/scripts/Apis/userInfo/types";
import {
  apiDeleteDepartment,
  apiGetDepartmentList,
  apiPatchDepartment,
  apiPostDepartment,
} from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
import React, { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleShowNotice = useHandleNotice();
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);
  const [newDepartment, setNewDepartment] = useState<NewDepartmentItem>({
    DepartmentId: "",
    Name: "",
  });
  const [newDepartmentMode, setNewDepartmentMode] = useState<boolean>(false);
  const [editDepartmentMode, setEditDepartmentMode] = useState<boolean>(false);
  const [editDepartmentModeIndex, setEditDepartmentModeIndex] =
    useState<number>(-1);

  const [editDepartment, setEditDepartment] = useState<EditDepartmentItem>({
    DepartmentId: "",
    Name: "",
  });

  const getDepartmentList = async () => {
    setDepartmentList(await apiGetDepartmentList());
  };

  const postDepartment = async (e: FormEvent) => {
    e.preventDefault();
    const ReqInt = await apiPostDepartment(newDepartment);
    if (ReqInt === 0) {
      getDepartmentList();
      setNewDepartmentMode(false);
      handleShowNotice("success", true, "新增成功");
    } else {
      handleShowNotice("error", true, `新增失敗。error code:${ReqInt}`);
    }
  };

  const patchDepartment = async () => {
    const reqInt = await apiPatchDepartment(editDepartment);
    if (reqInt === 0) {
      getDepartmentList();
      setEditDepartmentMode(false);
      handleShowNotice("success", true, "修改成功");
    } else {
      handleShowNotice("error", true, `修改失敗。error code:${reqInt}`);
    }
  };

  const deleteDepartment = async () => {
    const confirm = window.confirm(
      `確定要刪除 ${editDepartment.DepartmentId} 嗎?`
    );
    if (!confirm) return;
    const reqInt = await apiDeleteDepartment(editDepartment);
    if (reqInt === 0) {
      getDepartmentList();
      setEditDepartmentMode(false);
      handleShowNotice("success", true, "刪除成功");
    } else {
      handleShowNotice("error", true, `刪除失敗，errorCode = ${reqInt}`);
    }
  };

  const handleChange = (key: string, value: string) => {
    setNewDepartment((prev) => ({ ...prev, [key]: value }));
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
          onClick={() => setNewDepartmentMode(!newDepartmentMode)}
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
          setNewDepartmentMode={setNewDepartmentMode}
          postDepartment={postDepartment}
          newDepartment={newDepartment}
          handleChange={handleChange}
        />
      </div>
      <div className="w-full overflow-auto text-center bg-gray-900 rounded-md ">
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
                            className="text-center text-black rounded-md "
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
