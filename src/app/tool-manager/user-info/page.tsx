"use client";

import UserInfoIndex from "@/components/userInfo";
import UserInfoNew from "@/components/userInfo/new";
import EditPermissionForm from "@/components/userInfo/permissions/editPermissionForm";
import ResetPasswordForm from "@/components/userInfo/resetPasswordForm";
import {
  DepartmentItem,
  EditUserInfo,
  NewUserInfo,
  PermissionMenuItem,
  ResetUserPasswordInfo,
  UserAccountItem,
} from "@/scripts/Apis/userInfo/types";

import {
  ApiDeleteUserInfo,
  ApiGetDepartmentList,
  ApiGetUserInfoList,
  ApiPatchUserInfo,
  ApiPostUserInfo,
  ApiResetPassword,
  apiGetPermissionsInfoList,
} from "@/scripts/Apis/userInfo/userInfoApis";
import { useHandleNotice } from "@/scripts/notice";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const handleNotice = useHandleNotice();
  const [userInfoList, setUserInfoList] = useState<UserAccountItem[]>([]);
  const [newUserInfo, setNewUserInfo] = useState<NewUserInfo>({
    UserAccount: "",
    Password: "",
    UserName: "",
    DepartmentId: "",
    EmployeeId: "",
    EMailAddress: "",
    PermissionIds: [],
  });
  const [newPasswordData, setNewPasswordData] = useState<ResetUserPasswordInfo>(
    {} as ResetUserPasswordInfo
  );
  const [resetPasswordMode, setResetPasswordMode] = useState<boolean>(false);

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
  const [editPermission, setEditPermission] = useState(false);

  const getUserInfoList = async () => {
    setUserInfoList(await ApiGetUserInfoList());
  };

  const getDepartmentList = async () => {
    setDepartmentList(await ApiGetDepartmentList());
  };

  const getPermissionList = async () => {
    setPermissionList(await apiGetPermissionsInfoList());
  };

  const postUserInfo = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await ApiPostUserInfo(newUserInfo);
    if (reqInt === 0) {
      getUserInfoList();
      cleanNewUserInfo();
      setFocusInput(false);
      handleNotice("success", true, "新增成功");
    } else {
      handleNotice("error", true, `新增失敗，errorCode = ${reqInt}`);
    }
  };

  const cleanNewUserInfo = () => {
    setNewUserInfo({
      UserAccount: "",
      Password: "",
      UserName: "",
      DepartmentId: "",
      EmployeeId: "",
      EMailAddress: "",
      PermissionIds: [],
    });
  };

  // 重設密碼
  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const reqInt = await ApiResetPassword(newPasswordData);
    if (reqInt === 0) {
      handleNotice("success", true, "重設密碼成功");
      setResetPasswordMode(false);
      setEditUserMode(false);
    } else {
      handleNotice("error", true, `重設密碼失敗，errorCode = ${reqInt}`);
    }
  };

  const handleSetUserInfo = (key: string, value: string) => {
    if (key === "PermissionIds") {
      setNewUserInfo((prev) => ({
        ...prev,
        [key]: [...prev.PermissionIds, value],
      }));
      return;
    } else {
    }
    setNewUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckPermission = (checked: boolean, permissionId: string) => {
    if (checked) {
      setNewUserInfo((prev) => ({
        ...prev,
        PermissionData: [...prev.PermissionIds, permissionId],
      }));
    } else {
      setNewUserInfo((prev) => ({
        ...prev,
        PermissionData: prev.PermissionIds.filter((id) => id !== permissionId),
      }));
    }
  };

  const patchUserInfo = async (e?: FormEvent) => {
    e?.preventDefault();
    const reqInt = await ApiPatchUserInfo(editUserInfo);
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
    const reqInt = await ApiDeleteUserInfo(editUserInfo);
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
    console.log("handle eidt user", item);

    setNewUserMode(false);
    setEditUserMode(true);
    setEditUserIndex(index);
    setEditUserinfo({
      AccountId: item.AccountId,
      ModifyPassword: "",
      UserName: item.UserName,
      DepartmentId: item.Department.Id,
      EmployeeId: item.EmployeeId,
      EMailAddress: item.EMail,
      PermissionIds: item.PermissionList.map((item) => item.Id),
    });
  };

  const handelNewUserMode = () => {
    setNewUserMode(!newUserMode);
    setEditUserMode(false);
  };

  const handleResetPassword = () => {
    setResetPasswordMode(!resetPasswordMode);
    setNewPasswordData((prev) => ({
      ...prev,
      AccountId: editUserInfo.AccountId,
    }));
  };

  const handleCheckboxChange = (
    permission: PermissionMenuItem,
    checked: boolean
  ) => {
    if (checked) {
      setEditUserinfo((prev) => ({
        ...prev,
        PermissionIds: [...prev.PermissionIds, permission.Id],
      }));
    } else {
      setEditUserinfo((prev) => ({
        ...prev,
        PermissionIds: prev.PermissionIds.filter((id) => id !== permission.Id),
      }));
    }
  };

  useEffect(() => {
    getUserInfoList();
    getDepartmentList();
    getPermissionList();
  }, []);

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
        className={`my-4 relative transition-all overflow-hidden duration-300 ease-in-out ${
          newUserMode ? "h-72" : "h-0"
        }`}
      >
        <UserInfoNew
          setNewUserMode={setNewUserMode}
          departmentList={departmentList}
          postUserInfo={postUserInfo}
          handleSetUserInfo={handleSetUserInfo}
          newUserInfo={newUserInfo}
          setFocusInput={setFocusInput}
          focusInput={focusInput}
          permissionList={permissionList}
          handleCheckPermission={handleCheckPermission}
        />
      </div>
      <div className="relative w-full overflow-auto bg-gray-900 rounded-md ">
        <ResetPasswordForm
          resetPassword={resetPassword}
          setResetPasswordMode={setResetPasswordMode}
          newPasswordData={newPasswordData}
          setNewPasswordData={setNewPasswordData}
          resetPasswordMode={resetPasswordMode}
        />
        {editPermission && (
          <EditPermissionForm
            setEditPermission={setEditPermission}
            permissionList={permissionList}
            editUserInfo={editUserInfo}
            setEditUserinfo={setEditUserinfo}
          />
        )}
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
          handleResetPassword={handleResetPassword}
          setEditPermission={setEditPermission}
        />
      </div>
    </div>
  );
}
