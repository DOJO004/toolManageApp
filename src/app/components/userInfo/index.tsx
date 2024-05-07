"use client";

import { ApiGetDepartmentList } from "@/scripts/Apis/userInfo/departmentApi";
import {
  ApiGetUserInfoList,
  ApiPatchUserInfo,
} from "@/scripts/Apis/userInfo/userInfoApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SweetAlert from "../sweetAlert";
import { DepartmentItem, DepartmentList } from "./department/type";
import NewUserInfo from "./new";
import { EditUserInfo, UserAccountItem, UserInfoList } from "./types";

export default function UserInfoIndex() {
  const [userInfoList, setUserInfoList] = useState<UserAccountItem[]>([]);
  const [editUserInfo, setEditUserinfo] = useState<EditUserInfo>(
    {} as EditUserInfo
  );
  const [departmentList, setDepartmentList] = useState<DepartmentItem[]>([]);

  const [newUserMode, setNewUserMode] = useState<boolean>(false);
  const [editUserMode, setEditUserMode] = useState<boolean>(false);
  const [editUserIndex, setEditUserIndex] = useState<number>(-1);

  const getUserInfoList = async (count = 1) => {
    if (count >= 3) {
      SweetAlert(-99, "請求失敗。");
    }
    try {
      const data = await ApiGetUserInfoList();
      const res = data as UserInfoList;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log(res);

      if (reqInt === 0) {
        setUserInfoList(res.data.Values.UserAccountList);
      } else {
        throw new Error(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      getUserInfoList(count + 1);
      console.error("Error", error);
    }
  };

  const getDepartmentList = async (count = 1) => {
    if (count === 3) {
      SweetAlert(-99, "請求失敗。");
    }
    try {
      const data = await ApiGetDepartmentList();
      const res = data as DepartmentList;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log("department", res);
      if (reqInt === 0) {
        setDepartmentList(res.data.Values.DepartmentMenus);
      } else {
        throw new Error(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      getDepartmentList(count + 1);
      console.error("Error", error);
    }
  };

  const patchUserInfo = async () => {
    const data = await ApiPatchUserInfo(editUserInfo);
    console.log("patchUserInfo", data);
  };

  const handleEditUser = (item: UserAccountItem, index: number) => {
    setEditUserMode(true);
    setEditUserIndex(index);
    setEditUserinfo({
      AccountId: item.AccountId,
      OgnPwd: "",
      UserPwd: null,
      UserName: item.UserName,
      DepartmentId: item.Department.Id,
      EmployeeId: item.EmployeeId,
      EMailAddress: item.EMail,
    });
  };

  const confirmPassword = async () => {
    const { value: password } = await Swal.fire({
      title: "輸入密碼",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "請輸入該使用者的密碼",
    });
    if (password) {
      setEditUserinfo((prev) => ({ ...prev, OgnPwd: password }));
      patchUserInfo();
    }
  };

  useEffect(() => {
    getUserInfoList();
    getDepartmentList();
  }, []);

  useEffect(() => {
    console.log(editUserInfo);
  }, [editUserInfo]);

  return (
    <div className="relative w-full p-2 text-center ">
      <div className="relative my-4 ">
        <h1 className="text-center ">使用者列表</h1>
        <button
          className="absolute right-0 p-1 -translate-y-1/2 border rounded-md top-1/2 hover:bg-gray-600"
          onClick={() => setNewUserMode(true)}
        >
          新增
        </button>
      </div>
      <div
        className={`my-4 transition-all overflow-hidden duration-300 ease-in-out ${
          newUserMode ? "h-full" : "h-0"
        }`}
      >
        <NewUserInfo
          setNewUserMode={setNewUserMode}
          departmentList={departmentList}
          getUserInfoList={getUserInfoList}
        />
      </div>
      <div className="w-full overflow-auto bg-gray-500 rounded-md ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">帳號 ID</th>
              <th className="p-1 bg-indigo-500 whitespace-nowrap">
                使用者名稱
              </th>
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
                        value={editUserInfo.AccountId}
                        onChange={(e) =>
                          setEditUserinfo((prev) => ({
                            ...prev,
                            AccountId: e.target.value,
                          }))
                        }
                      />
                    </td>
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

                    <td> - </td>
                    <td className="p-1 whitespace-nowrap">
                      <button onClick={() => confirmPassword()}>完成</button> /{" "}
                      <button>刪除</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.AccountId}>
                    <td className="p-1 whitespace-nowrap">{item.AccountId}</td>
                    <td className="p-1 whitespace-nowrap">{item.UserName}</td>

                    <td className="p-1 whitespace-nowrap">
                      {item.Department.Name}
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.EMail}</td>
                    <td className="p-1 whitespace-nowrap">{item.LastModify}</td>
                    <td className="p-1 whitespace-nowrap">
                      <button onClick={() => handleEditUser(item, index)}>
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
      </div>
    </div>
  );
}
