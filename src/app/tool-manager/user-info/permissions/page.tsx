"use client";

import NewPermissionInfo from "@/components/userInfo/permissions/new";
import {
  EditPermissionItemInfo,
  NewPermissionItemInfo,
  PermissionMenuItem,
} from "@/scripts/Apis/userInfo/types";
import {
  apiDeletePermissionsInfo,
  apiEditPermissionsInfo,
  apiGetPermissionsInfoList,
  apiNewPermissionsInfo,
} from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleShowNotice = useHandleNotice();
  const [permissionInfoList, setPermissionInfoList] = useState<
    PermissionMenuItem[]
  >([]);
  const [newPermissionInfo, setNewPermissionInfo] =
    useState<NewPermissionItemInfo>({
      PermissionId: "",
      Name: "",
      PermissionType: 1,
    });

  const [newPermissionMode, setNewPermissionMode] = useState(false);
  const [editPermissionMode, setEditPermissionMode] = useState(false);
  const [editPermissionIndex, setEditPermissionIndex] = useState<number>(-1);
  const [editPermissionInfo, setEditPermissionInfo] =
    useState<EditPermissionItemInfo>({
      PermissionId: "",
      Name: "",
      PermissionType: 0,
    });

  const getPermissionsInfoList = async () => {
    setPermissionInfoList(await apiGetPermissionsInfoList());
  };

  const postPermissionInfo = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await apiNewPermissionsInfo(newPermissionInfo);
    if (reqInt === 0) {
      getPermissionsInfoList();
      cleanNewPermissionInfo();
      handleShowNotice("success", true, "新增成功");
    } else {
      handleShowNotice("error", true, `新增失敗 ${reqInt}`);
    }
  };

  const patchPermissionsInfo = async () => {
    const reqInt = await apiEditPermissionsInfo(editPermissionInfo);
    if (reqInt === 0) {
      getPermissionsInfoList();
      setEditPermissionMode(false);
      handleShowNotice("success", true, "修改成功");
    } else {
      handleShowNotice("error", true, `修改失敗 ${reqInt}`);
    }
  };

  const deletePermissionsInfo = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (!confirm) return;
    const reqInt = await apiDeletePermissionsInfo(editPermissionInfo);
    if (reqInt === 0) {
      getPermissionsInfoList();
      setEditPermissionMode(false);
      handleShowNotice("success", true, "刪除成功");
    } else {
      handleShowNotice("error", true, `刪除失敗 ${reqInt}`);
    }
  };

  const cleanNewPermissionInfo = () => {
    setNewPermissionInfo({
      PermissionId: "",
      Name: "",
      PermissionType: 0,
    });
  };

  const handleChange = (key: string, value: string) => {
    setNewPermissionInfo({ ...newPermissionInfo, [key]: value });
  };

  const handelEditMode = (item: PermissionMenuItem, index: number) => {
    setEditPermissionMode(true);
    setEditPermissionIndex(index);
    setEditPermissionInfo({
      PermissionId: item.Id,
      Name: item.Name,
      PermissionType: item.PermissionType,
    });
  };

  const handleEditChange = (key: string, value: string) => {
    setEditPermissionInfo({ ...editPermissionInfo, [key]: value });
  };
  useEffect(() => {
    getPermissionsInfoList();
  }, []);

  return (
    <div className="w-full p-4">
      <div className="relative ">
        <h1 className="text-center ">權限資訊</h1>
        <button
          className="absolute p-1 border rounded-md top-3 right-2 hover:bg-gray-500"
          onClick={() => setNewPermissionMode(!newPermissionMode)}
        >
          新增
        </button>
      </div>
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden ${
          newPermissionMode ? "h-64" : "h-0"
        }`}
      >
        <NewPermissionInfo
          setNewPermissionMode={setNewPermissionMode}
          postPermissionInfo={postPermissionInfo}
          newPermission={newPermissionInfo}
          handleNewPermissionChange={handleChange}
        />
      </div>
      <div className="w-full overflow-auto text-center bg-gray-900 rounded-md">
        <table className="w-full ">
          <thead>
            <tr>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">ID</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">名稱</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">最後更新</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {permissionInfoList.map((item, index) =>
              editPermissionMode && editPermissionIndex === index ? (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>
                    <input
                      type="text"
                      className="text-center text-black rounded-md "
                      value={editPermissionInfo.Name}
                      onChange={(e) => handleEditChange("Name", e.target.value)}
                    />
                  </td>
                  <td> - </td>
                  <td>
                    <button onClick={() => patchPermissionsInfo()}>完成</button>{" "}
                    /{" "}
                    <button onClick={() => deletePermissionsInfo()}>
                      刪除
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={item.Id}>
                  <td className="p-1 whitespace-nowrap">{item.Id}</td>
                  <td className="p-1 whitespace-nowrap">{item.Name}</td>
                  <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                  <td className="p-1 whitespace-nowrap">
                    <button onClick={() => handelEditMode(item, index)}>
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
  );
}
