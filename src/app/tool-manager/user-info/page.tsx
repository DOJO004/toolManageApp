"use client";
import UserInfoIndex from "@/app/ui/userInfo";
import UserInfoNew from "@/app/ui/userInfo/new";
import { apiGetUserAccountInfoList } from "@/scripts/api";
import { useEffect, useState } from "react";

export default function Page() {
  // index
  const [newMode, setNewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userInfoList, setUserInfoList] = useState([
    {
      AccountID: "",
      Department: "",
      UserID: "",
      EmployeeID: "",
      UserName: "",
      CreateTime: "",
      LastModify: "",
    },
  ]);

  const fetchGetUserInfoList = async () => {
    const res = await apiGetUserAccountInfoList();
    console.log(res);
    if (res?.data?.Values?.ReqInt === 0) {
      setUserInfoList(res.data.Values.AccountList);
    } else {
      console.log("get user info list false.");
    }
  };

  const changeNewMode = () => setNewMode(!newMode);

  useEffect(() => {
    fetchGetUserInfoList();
  }, []);

  // new
  const [userInfo, setUserInfo] = useState({
    OperatorID: "",
    DepartmentID: "",
    UserAccount: "",
    EmployeeID: "",
    UserName: " ",
    Password: "",
    EMailAddress: "",
    Permissions: ["ToolStatus_W", "ToolStatus_R"],
  });
  return (
    <div className="flex flex-col md:flex-row">
      <div className="mx-2 ">
        {newMode && <UserInfoNew changeNewMode={changeNewMode} />}
      </div>
      <UserInfoIndex
        userInfoList={userInfoList}
        changeNewMode={changeNewMode}
      />
    </div>
  );
}
