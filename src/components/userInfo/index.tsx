import React from "react";
import { DepartmentItem } from "./department/type";
import { EditUserInfo, UserAccountItem } from "./types";

interface Props {
  userInfoList: UserAccountItem[];
  editUserMode: boolean;
  editUserIndex: number;
  editUserInfo: EditUserInfo;
  setEditUserinfo: React.Dispatch<React.SetStateAction<EditUserInfo>>;
  departmentList: DepartmentItem[];
  handleEditUser: (item: UserAccountItem, index: number) => void;
  patchUserInfo: () => void;
  deleteUserInfo: () => void;
  handleResetPassword: () => void;
  setEditPermission: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserInfoIndex({
  userInfoList,
  editUserMode,
  editUserIndex,
  editUserInfo,
  setEditUserinfo,
  departmentList,
  handleEditUser,
  patchUserInfo,
  deleteUserInfo,
  handleResetPassword,
  setEditPermission,
}: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-1 bg-indigo-500 whitespace-nowrap">使用者帳號</th>
          <th className="p-1 bg-indigo-500 whitespace-nowrap">部門</th>
          <th className="p-1 bg-indigo-500 whitespace-nowrap">Email</th>
          <th className="p-1 bg-indigo-500 whitespace-nowrap">最後更新</th>
          <th className="p-1 bg-indigo-500 whitespace-nowrap">編輯</th>
        </tr>
      </thead>
      <tbody>
        {userInfoList.length > 0 ? (
          userInfoList.map((item, index) =>
            editUserMode && editUserIndex === index ? (
              <tr key={item.AccountId}>
                <td className="p-1 whitespace-nowrap">
                  <input
                    type="text"
                    className="p-2 text-center text-black rounded-md"
                    value={editUserInfo.UserName}
                    onChange={(e) =>
                      setEditUserinfo((prev) => ({
                        ...prev,
                        UserName: e.target.value,
                      }))
                    }
                  />
                </td>
                <td className="p-1 whitespace-nowrap">
                  <select
                    value={editUserInfo.DepartmentId}
                    onChange={(e) =>
                      setEditUserinfo((prev) => ({
                        ...prev,
                        DepartmentId: e.target.value,
                      }))
                    }
                    className="p-2 text-center text-black rounded-md"
                  >
                    {departmentList.map((item) => (
                      <option
                        value={item.Id}
                        key={item.Id}
                        className="p-2 text-black rounded-md"
                      >
                        {item.Name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-1 whitespace-nowrap">
                  <input
                    type="text"
                    className="p-2 text-center text-black rounded-md"
                    value={editUserInfo.EMailAddress}
                    onChange={(e) =>
                      setEditUserinfo((prev) => ({
                        ...prev,
                        EMailAddress: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className="p-1 rounded-md hover:bg-indigo-500"
                    onClick={() => handleResetPassword()}
                  >
                    密碼重設
                  </button>
                  <span> / </span>
                  <button
                    className="p-1 rounded-md hover:bg-indigo-500"
                    onClick={() => setEditPermission(true)}
                  >
                    修改權限
                  </button>
                </td>
                <td className="p-1 whitespace-nowrap">
                  <button onClick={() => patchUserInfo()}>完成</button>
                  <span> / </span>
                  <button onClick={() => deleteUserInfo()}>刪除</button>
                </td>
              </tr>
            ) : (
              <tr key={item.AccountId}>
                <td className="p-1 whitespace-nowrap">{item.UserName}</td>

                <td className="p-1 whitespace-nowrap">
                  {item.Department.Name}
                </td>
                <td className="p-1 whitespace-nowrap">{item.EMail}</td>
                <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                <td className="p-1 whitespace-nowrap">
                  <button
                    onClick={() => handleEditUser(item, index)}
                    className="p-1 rounded-md hover:bg-indigo-500"
                  >
                    編輯
                  </button>
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan={6}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
