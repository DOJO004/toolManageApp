"use client";
import PageController from "@/app/ui/pageController/pageController";
import UserInfoIndex from "@/app/ui/userInfo";
import UserInfoEdit from "@/app/ui/userInfo/edit";
import UserInfoNew from "@/app/ui/userInfo/new";
import {
  apiAddUserAccountInfo,
  apiEditUserAccountInfo,
  apiGetDepartmentInfoList,
  apiGetUserAccountInfoByAccountID,
  apiGetUserAccountInfoList,
} from "@/scripts/api";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  // index
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfoList, setUserInfoList] = useState([
    {
      AccountID: "",
      Department: "",
      UserID: "",
      EmployeeID: "",
      UserName: "",
      Activated: "",
      CreateTime: "",
      LastModify: "",
    },
  ]);

  const fetchGetUserInfoList = async () => {
    const res = await apiGetUserAccountInfoList();
    console.log("get user info list ", res);

    if (res?.data?.Values?.ReqInt === 0) {
      setUserInfoList(res.data.Values.AccountList);
    } else {
      console.log("get user info list false.");
    }
  };

  const changeNewMode = () => {
    setNewMode(!newMode);
    setEditMode(false);
    setNotice(false);
  };
  const changeEditMode = () => {
    setEditMode(!editMode);
    setNewMode(false);
    setNotice(false);
  };

  useEffect(() => {
    fetchGetUserInfoList();
  }, []);

  // new
  const [departmentInfoList, setDepartmentInfoList] = useState([
    {
      DepartmentID: "",
      Name: "",
    },
  ]);

  const [userInfo, setUserInfo] = useState({
    DepartmentID: "",
    UserAccount: "",
    EmployeeID: "",
    UserName: "",
    Password: "",
    EMailAddress: "",
    Permissions: ["ToolStatus_W", "ToolStatus_R"],
  });

  const fetchAddNewUser = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiAddUserAccountInfo(userInfo);
    console.log(res);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      fetchGetUserInfoList();
      setIsError(false);
    } else {
      setIsError(true);
      console.log("add new user info false.");
    }
  };

  const fetchGetDepartmentInfoList = async () => {
    const res = await apiGetDepartmentInfoList();

    if (res?.data?.Values?.ReqInt === 0) {
      setDepartmentInfoList(res.data.Values.DepartmentList);
    } else {
      console.log("get department info list false.");
    }
  };

  useEffect(() => {
    fetchGetDepartmentInfoList();
  }, []);

  // edit
  const [editUserInfo, setEditUserInfo] = useState({
    AccountID: "",
    Department: "",
    UserID: "",
    EmployeeID: "",
    UserName: "",
    Activated: "",
    CreateTime: "",
    LastModify: "",
  });

  const [editUserAccountAndPassword, setEditUserAccountAndPassword] = useState({
    Email: "",
    Password: "",
  });

  const fetchEditUserInfo = async (e: FormEvent) => {
    e.preventDefault();
    const res = await apiEditUserAccountInfo(
      editUserInfo,
      editUserAccountAndPassword
    );
    setNotice(true);
    console.log("redit user info", res);
    if (res?.data?.Values?.ReqInt === 0) {
      setIsError(false);
    } else {
      setIsError(true);
      console.log("edit user info false.");
    }
  };

  const fetchGetUserInfoByUserAccount = async (accountID: string) => {
    const res = await apiGetUserAccountInfoByAccountID(accountID);
    if (!editMode) {
      console.log("get user info by user account ", res);
      if (res?.data?.Values?.ReqInt === 0) {
        setEditUserInfo(res.data.Values.AccountData);
      } else {
        console.log("get user info by account id false.");
      }
    }
  };

  useEffect(() => {
    console.log(editUserInfo);
  }, [editUserInfo]);

  return (
    <div className="flex flex-col justify-center w-full md:flex-row">
      <div className="w-full bg-gray-900 rounded-md max-w-screen-2xl h-fit">
        <UserInfoIndex
          userInfoList={userInfoList}
          changeNewMode={changeNewMode}
          changeEditMode={changeEditMode}
          fetchGetUserInfoByUserAccount={fetchGetUserInfoByUserAccount}
        />
        <div className="my-4">
          <PageController />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen transition-all duration-300 bg-black/70 ${
          newMode ? " translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="flex justify-center mt-48 ">
          <UserInfoNew
            departmentInfoList={departmentInfoList}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            changeNewMode={changeNewMode}
            fetchAddNewUser={fetchAddNewUser}
            notice={notice}
            isError={isError}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 w-screen h-screen transition-all duration-300 bg-black/70 ${
          editMode ? " translate-y-0" : " -translate-y-full"
        }`}
      >
        <div className="flex justify-center mt-48">
          <UserInfoEdit
            departmentInfoList={departmentInfoList}
            editUserInfo={editUserInfo}
            setEditUserInfo={setEditUserInfo}
            editUserAccountAndPassword={editUserAccountAndPassword}
            setEditUserAccountAndPassword={setEditUserAccountAndPassword}
            fetchEditUserInfo={fetchEditUserInfo}
            changeEditMode={changeEditMode}
            notice={notice}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
}
