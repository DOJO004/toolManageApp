"use client";

import { useNotice } from "@/components/context/NoticeContext";
import SweetAlert from "@/components/sweetAlert";
import UserInfoIndex from "@/components/userInfo";
import {
  DepartmentItem,
  DepartmentList,
} from "@/components/userInfo/department/type";
import UserInfoNew from "@/components/userInfo/new";
import {
  PermissionInfoList,
  PermissionMenuItem,
} from "@/components/userInfo/policeInfo/type";
import {
  DeleteUserResponse,
  EditUserInfo,
  EditUserResponse,
  NewUserInfo,
  NewUserResponse,
  UserAccountItem,
  UserInfoList,
} from "@/components/userInfo/types";
import { ApiGetDepartmentList } from "@/scripts/Apis/userInfo/departmentApi";
import { apiGetPermissionsInfoList } from "@/scripts/Apis/userInfo/policeApi";
import {
  ApiDeleteUserInfo,
  ApiGetUserInfoList,
  ApiPatchUserInfo,
  ApiPostUserInfo,
} from "@/scripts/Apis/userInfo/userInfoApi";
import { AlertColor } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const { setShowNotice } = useNotice();
  const [userInfoList, setUserInfoList] = useState<UserAccountItem[]>([]);
  const [userInfo, setUserInfo] = useState<NewUserInfo>({
    UserAccount: "",
    Password: "",
    UserName: "",
    DepartmentId: "",
    EmployeeId: "",
    EMailAddress: "",
    PermissionData: [],
  });

  const [permissionList, setPermissionList] = useState<PermissionMenuItem[]>(
    []
  );
  const [focusInput, setFocusInput] = useState<boolean>(false);

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
      return;
    }
    try {
      const data = await ApiGetUserInfoList();
      const res = data as UserInfoList;
      const reqInt = res?.data?.Values?.ReqInt;
      console.log(res);

      if (reqInt === 0) {
        setUserInfoList(res.data.Values.UserAccountList);
      } else {
        console.log(`ReqInt = ${reqInt}`);
      }
    } catch (error) {
      console.error("Error", error);
      getUserInfoList(count + 1);
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

  const getPermissionList = async () => {
    const data = await apiGetPermissionsInfoList();
    const res = data as PermissionInfoList;
    const reqInt = res?.data?.Values?.ReqInt;
    console.log("permission", res);

    if (reqInt === 0) {
      setPermissionList(res.data.Values.PermissionMenus);
    }
  };
  const postUserInfo = async (e: FormEvent) => {
    e.preventDefault();
    const data = await ApiPostUserInfo(userInfo);
    const res = data as NewUserResponse;
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      getUserInfoList();
      setUserInfo({
        UserAccount: "",
        Password: "",
        UserName: "",
        DepartmentId: "",
        EmployeeId: "",
        EMailAddress: "",
        PermissionData: [],
      });
      setFocusInput(false);
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
    console.log(data);
  };

  const handleSetUserInfo = (key: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckPermission = (checked: boolean, permissionId: string) => {
    if (checked) {
      setUserInfo((prev) => ({
        ...prev,
        PermissionData: [...prev.PermissionData, permissionId],
      }));
    } else {
      setUserInfo((prev) => ({
        ...prev,
        PermissionData: prev.PermissionData.filter((id) => id !== permissionId),
      }));
    }
  };

  const patchUserInfo = async () => {
    const data = await ApiPatchUserInfo(editUserInfo);
    const res = data as EditUserResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    if (reqInt === 0) {
      getUserInfoList();
      setEditUserMode(false);
      setEditUserIndex(-1);
      setEditUserinfo({} as EditUserInfo);
      handleNotice("success", true, "更新成功");
    } else {
      handleNotice("error", true, `更新失敗，errorCode = ${reqInt}`);
    }
  };

  const deleteUserInfo = async () => {
    const confirm = window.confirm("確定要刪除嗎?");
    if (!confirm) return;
    const data = await ApiDeleteUserInfo(editUserInfo.AccountId);
    const res = data as DeleteUserResponse;
    const reqInt = res?.data?.Values?.ReqInt;

    if (reqInt === 0) {
      getUserInfoList();
      setEditUserMode(false);
      setEditUserIndex(-1);
      setEditUserinfo({} as EditUserInfo);
      handleNotice("success", true, "刪除成功");
    } else {
      handleNotice("error", true, `刪除失敗，errorCode = ${reqInt}`);
    }
  };

  const handleEditUser = (item: UserAccountItem, index: number) => {
    setNewUserMode(false);
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

  const handelNewUserMode = () => {
    setNewUserMode(!newUserMode);
    setEditUserMode(false);
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  // const confirmPassword = async () => {
  //   const { value: password } = await Swal.fire({
  //     title: "輸入密碼",
  //     input: "password",
  //     inputLabel: "Password",
  //     inputPlaceholder: "請輸入該使用者的密碼",
  //   });
  //   if (password) {
  //     patchUserInfo(password);
  //   }
  // };

  useEffect(() => {
    getUserInfoList();
    getDepartmentList();
    getPermissionList();
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
          onClick={() => handelNewUserMode()}
        >
          新增
        </button>
      </div>
      <div
        className={`my-4 transition-all overflow-hidden duration-300 ease-in-out ${
          newUserMode ? "h-60" : "h-0"
        }`}
      >
        <div
          className={`h-60 p-1 overflow-auto absolute right-0  bottom-3 border rounded-md bg-white  ${focusInput ? "block" : "hidden"}`}
        >
          {permissionList.map((item) => (
            <div key={item.Id} className="flex items-center hover:bg-gray-300">
              <input
                type="checkbox"
                value={item.Id}
                id={item.Id}
                className="mr-2"
                onChange={(e) =>
                  handleCheckPermission(e.target.checked, item.Id)
                }
              />
              <label htmlFor={item.Id} className="text-black">
                {item.Name}
              </label>
            </div>
          ))}
        </div>
        <UserInfoNew
          setNewUserMode={setNewUserMode}
          departmentList={departmentList}
          postUserInfo={postUserInfo}
          handleSetUserInfo={handleSetUserInfo}
          userInfo={userInfo}
          setFocusInput={setFocusInput}
          focusInput={focusInput}
          permissionList={permissionList}
          handleCheckPermission={handleCheckPermission}
        />
      </div>
      <div className="w-full overflow-auto bg-gray-900 rounded-md ">
        <UserInfoIndex
          userInfoList={userInfoList}
          editUserMode={editUserMode}
          editUserIndex={editUserIndex}
          editUserInfo={editUserInfo}
          setEditUserinfo={setEditUserinfo}
          departmentList={departmentList}
          patchUserInfo={patchUserInfo}
          handleEditUser={handleEditUser}
          deleteUserInfo={deleteUserInfo}
        />
      </div>
    </div>
  );
}
