"use client";

import {
  apiDeletePoliceInfo,
  apiEditPoliceInfo,
  apiGetPoliceInfoList,
} from "@/scripts/Apis/userInfo/policeApi";
import { useEffect, useState } from "react";
import NewPoliceInfo from "./new";
import { EditPoliceItemInfo, PermissionMenuItem, PoliceInfoList } from "./type";

export default function IndexPoliceInfo() {
  const [policeInfoList, setPoliceInfoList] = useState<PermissionMenuItem[]>(
    []
  );
  const [newPoliceMode, setNewPoliceMode] = useState(false);
  const [editPoliceMode, setEditPoliceMode] = useState(false);
  const [editPoliceIndex, setEditPoliceIndex] = useState<number>(-1);
  const [editPoliceInfo, setEditPoliceInfo] = useState<EditPoliceItemInfo>({
    PermissionId: "",
    Name: "",
    PermissionType: 0,
  });

  const getPoliceInfoList = async () => {
    const data = await apiGetPoliceInfoList();
    const res = data as PoliceInfoList;
    if (res?.data?.Values?.ReqInt === 0) {
      setPoliceInfoList(res.data.Values.PermissionMenus);
    }
  };

  const patchPoliceInfo = async () => {
    const data = await apiEditPoliceInfo(editPoliceInfo);
    console.log(data);
  };

  const deletePoliceInfo = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (!confirm) return;
    const data = await apiDeletePoliceInfo(editPoliceInfo);
    console.log(data);
  };

  const handelEditMode = (item: PermissionMenuItem, index: number) => {
    setEditPoliceMode(true);
    setEditPoliceIndex(index);
    setEditPoliceInfo({
      PermissionId: item.Id,
      Name: item.Name,
      PermissionType: item.PermissionType,
    });
  };

  const handleEditChange = (key: string, value: string) => {
    setEditPoliceInfo({ ...editPoliceInfo, [key]: value });
  };
  useEffect(() => {
    getPoliceInfoList();
  }, []);

  return (
    <div>
      <div className="relative ">
        <h1 className="text-center ">權限資訊</h1>
        <button
          className="absolute p-1 border rounded-md top-3 right-2 hover:bg-gray-500"
          onClick={() => setNewPoliceMode(!newPoliceMode)}
        >
          新增
        </button>
      </div>
      <div
        className={` transition-all duration-300 ease-in-out overflow-hidden ${
          newPoliceMode ? "h-64" : "h-0"
        }`}
      >
        <NewPoliceInfo setNewPoliceMode={setNewPoliceMode} />
      </div>
      <div className="w-full overflow-auto text-center bg-gray-500 rounded-md">
        <table className="w-full ">
          <thead>
            <tr>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">ID</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">名稱</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">
                最後更新時間
              </th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">編輯</th>
            </tr>
          </thead>
          <tbody>
            {policeInfoList.map((item, index) =>
              editPoliceMode && editPoliceIndex === index ? (
                <tr key={item.Id}>
                  <td>{item.Id}</td>
                  <td>
                    <input
                      type="text"
                      className="w-full p-2 text-center text-black rounded-md "
                      value={editPoliceInfo.Name}
                      onChange={(e) => handleEditChange("Name", e.target.value)}
                    />
                  </td>
                  <td> - </td>
                  <td>
                    <button onClick={() => patchPoliceInfo()}>完成</button> /{" "}
                    <button onClick={() => deletePoliceInfo()}>刪除</button>
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
