import { NewPermissionItemInfo } from "@/scripts/Apis/userInfo/types";
import { FormEvent } from "react";

interface Props {
  setNewPermissionMode: React.Dispatch<React.SetStateAction<boolean>>;
  postPermissionInfo: (e: FormEvent) => void;
  newPermission: NewPermissionItemInfo;
  handleNewPermissionChange: (key: string, value: string) => void;
}

export default function NewPermissionInfo({
  setNewPermissionMode,
  postPermissionInfo,
  newPermission,
  handleNewPermissionChange,
}: Props) {
  return (
    <div className="p-4 my-4 bg-gray-900 rounded-md">
      <div className="relative ">
        <h2>新增權限</h2>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900"
          onClick={() => setNewPermissionMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postPermissionInfo(e)}>
        <div className="flex gap-2 ">
          <div className="w-full ">
            <label htmlFor="PermissionId">ID</label>
            <input
              type="text"
              id="PermissionId"
              className="w-full p-2 text-black rounded-md "
              value={newPermission.PermissionId}
              onChange={(e) =>
                handleNewPermissionChange("PermissionId", e.target.value)
              }
            />
          </div>
          <div className="w-full ">
            <label htmlFor="Name">名稱</label>
            <input
              type="text"
              id="Name"
              className="w-full p-2 text-black rounded-md "
              value={newPermission.Name}
              onChange={(e) =>
                handleNewPermissionChange("Name", e.target.value)
              }
            />
          </div>
          <div className="w-full ">
            <label htmlFor="PermissionType">權限</label>
            <select
              id="PermissionType"
              className="w-full p-2 text-black rounded-md "
              value={newPermission.PermissionType}
              onChange={(e) =>
                handleNewPermissionChange("PermissionType", e.target.value)
              }
            >
              <option value="1" className="text-black ">
                讀取
              </option>
              <option value="2" className="text-black ">
                寫入
              </option>
              <option value="3" className="text-black ">
                讀取+寫入
              </option>
            </select>
          </div>
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          送出
        </button>
      </form>
    </div>
  );
}
