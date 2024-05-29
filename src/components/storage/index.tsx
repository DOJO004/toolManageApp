import React from "react";
import { EditStorageItem, StorageItem } from "./types";

interface Props {
  storageList: StorageItem[];
  editIndex: number;
  editStorage: EditStorageItem;
  editMode: boolean;
  setEditStorage: React.Dispatch<React.SetStateAction<EditStorageItem>>;
  patchStorage: () => void;
  deleteStorage: () => void;
  handleEditMode: (item: StorageItem, index: number) => void;
}
export default function StorageIndex({
  storageList,
  editIndex,
  editStorage,
  editMode,
  setEditStorage,
  patchStorage,
  deleteStorage,
  handleEditMode,
}: Props) {
  return (
    <table className="w-full ">
      <thead>
        <tr className="bg-indigo-500">
          <th className="p-1">倉儲 ID</th>
          <th className="p-1">倉儲名稱</th>
          <th className="p-1">刀具數量</th>
          <th className="p-1">編輯</th>
        </tr>
      </thead>
      <tbody>
        {storageList.map((item, index) =>
          editMode && editIndex === index ? (
            <tr key={item.StorageId}>
              <td className="p-1">{item.StorageId}</td>
              <td className="p-1">
                <input
                  type="text"
                  value={editStorage.Name}
                  className="text-center text-black "
                  onChange={(e) =>
                    setEditStorage({
                      ...editStorage,
                      Name: e.target.value,
                    })
                  }
                />
              </td>
              <td className="p-1"> - </td>
              <td className="p-1">
                <button
                  className="p-1 rounded-md hover:bg-indigo-500"
                  onClick={() => patchStorage()}
                >
                  完成
                </button>
                <span> / </span>
                <button
                  className="p-1 rounded-md hover:bg-indigo-500"
                  onClick={() => deleteStorage()}
                >
                  刪除
                </button>
              </td>
            </tr>
          ) : (
            <tr key={item.StorageId}>
              <td className="p-1">{item.StorageId}</td>
              <td className="p-1">{item.Name}</td>
              <td className="p-1">{item.TotalCount}</td>
              <td className="p-1">
                <button
                  className="p-1 rounded-md hover:bg-indigo-500"
                  onClick={() => handleEditMode(item, index)}
                >
                  編輯
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
