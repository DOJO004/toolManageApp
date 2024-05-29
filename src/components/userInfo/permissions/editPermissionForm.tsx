import { EditUserInfo } from "../types";
import { PermissionMenuItem } from "./type";

interface Props {
  setEditPermission: React.Dispatch<React.SetStateAction<boolean>>;
  permissionList: PermissionMenuItem[];
  editUserInfo: EditUserInfo;
  setEditUserinfo: React.Dispatch<React.SetStateAction<EditUserInfo>>;
}
export default function EditPermissionForm({
  setEditPermission,
  permissionList,
  editUserInfo,
  setEditUserinfo,
}: Props) {
  return (
    <div className="absolute grid grid-cols-3 gap-2 p-4 -translate-x-1/2 -translate-y-1/2 bg-gray-900 border rounded-md top-1/2 left-1/2">
      <h2 className="col-span-3">修改權限</h2>
      <button
        className="absolute p-1 rounded-full top-5 right-5 hover:bg-gray-700"
        onClick={() => setEditPermission(false)}
      >
        X
      </button>
      {permissionList.map((item) => (
        <div key={item.Id}>
          <input
            type="checkbox"
            id={item.Id}
            defaultChecked={editUserInfo.PermissionIds.some(
              (permission) => permission === item.Id
            )}
            onChange={() =>
              setEditUserinfo((prev) => ({
                ...prev,
                PermissionIds: [...editUserInfo.PermissionIds, item.Id],
              }))
            }
          />
          <label htmlFor={item.Id}>{item.Name}</label>
        </div>
      ))}
      <button
        className="col-span-3 p-1 mt-4 bg-indigo-500 rounded-md"
        onClick={() => {
          setEditPermission(false);
        }}
      >
        完成
      </button>
    </div>
  );
}
