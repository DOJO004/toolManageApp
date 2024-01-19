import React from "react";
import { AddBtn } from "../buttons";

interface UserInfoItem {
  AccountID: string;
  Department: string;
  UserID: string;
  EmployeeID: string;
  UserName: string;
  Activated: string;
  CreateTime: string;
  LastModify: string;
}

interface UserInfoIndexProps {
  userInfoList: UserInfoItem[];
  changeNewMode: () => void;
  changeEditMode: () => void;
  fetchGetUserInfoByUserAccount: (id: string) => void;
}

const UserInfoIndex = ({
  userInfoList,
  changeNewMode,
  changeEditMode,
  fetchGetUserInfoByUserAccount,
}: UserInfoIndexProps) => {
  const activeUser = userInfoList.filter(
    (account) => account.Activated === "Activated"
  );
  const notActiveUser = userInfoList.filter(
    (account) => account.Activated !== "Activated"
  );
  return (
    <div className="relative w-full p-2 text-center ">
      <p className="text-center ">使用者列表 (已啟用)</p>
      <hr className="my-2" />
      <div className="w-full overflow-auto rounded-md ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                部門
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                帳號ID
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                員工ID
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                使用者ID
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                使用者名稱
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                建立時間
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                修改時間
              </th>
              <th className="p-1 text-black bg-indigo-500 whitespace-nowrap">
                編輯
              </th>
            </tr>
          </thead>
          <tbody>
            {activeUser.map((item, index) => (
              <tr key={index} className=" even:bg-gray-700">
                <td className="p-1 whitespace-nowrap">{item.Department}</td>
                <td className="p-1 whitespace-nowrap">{item.AccountID}</td>
                <td className="p-1 whitespace-nowrap">{item.EmployeeID}</td>
                <td className="p-1 whitespace-nowrap">{item.UserID}</td>
                <td className="p-1 whitespace-nowrap">{item.UserName}</td>
                <td className="p-1 whitespace-nowrap">{item.CreateTime}</td>
                <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                <td className="p-1 whitespace-nowrap ">
                  <button
                    onClick={() => {
                      changeEditMode(),
                        fetchGetUserInfoByUserAccount(item.UserID);
                    }}
                  >
                    編輯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default UserInfoIndex;
