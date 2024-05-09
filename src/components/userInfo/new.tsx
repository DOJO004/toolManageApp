import { apiGetPermissionsInfoList } from "@/scripts/Apis/userInfo/policeApi";
import { ApiPostUserInfo } from "@/scripts/Apis/userInfo/userInfoApi";
import { FormEvent, useEffect, useState } from "react";
import SweetAlert from "../sweetAlert";
import { DepartmentItem } from "./department/type";
import { PermissionInfoList, PermissionMenuItem } from "./policeInfo/type";
import type { NewUserInfo, NewUserResponse } from "./types";
interface NewUserInfoProps {
  setNewUserMode: (value: boolean) => void;
  departmentList: DepartmentItem[];
  getUserInfoList: () => void;
}
export default function NewUserInfo({
  setNewUserMode,
  departmentList,
  getUserInfoList,
}: NewUserInfoProps) {
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
    } else {
      SweetAlert(reqInt, "新增失敗。");
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

  useEffect(() => {
    getPermissionList();
  }, []);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className="p-4 bg-gray-500 rounded-md">
      <div className="relative ">
        <h2 className="text-left ">新增使用者</h2>
        <button
          className="absolute top-0 right-0 p-2 rounded-full hover:bg-gray-900"
          onClick={() => setNewUserMode(false)}
        >
          X
        </button>
      </div>
      <form onSubmit={(e) => postUserInfo(e)}>
        <div className="flex gap-2 ">
          <div>
            <label htmlFor="UserAccount">帳號</label>
            <input
              type="text"
              id="UserAccount"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.UserAccount}
              onChange={(e) => handleSetUserInfo("UserAccount", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Password">密碼</label>
            <input
              type="password"
              id="Password"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.Password}
              onChange={(e) => handleSetUserInfo("Password", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="EmployeeId">員工 ID</label>
            <input
              type="text"
              id="EmployeeId"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.EmployeeId}
              onChange={(e) => handleSetUserInfo("EmployeeId", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="UserName">使用者名稱</label>
            <input
              type="text"
              id="UserName"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.UserName}
              onChange={(e) => handleSetUserInfo("UserName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="DepartmentId">部門</label>
            <select
              id="DepartmentId"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.DepartmentId}
              onChange={(e) =>
                handleSetUserInfo("DepartmentId", e.target.value)
              }
            >
              <option value="" className="text-black ">
                選擇部門
              </option>
              {departmentList.map((item) => (
                <option key={item.Id} value={item.Id} className="text-black ">
                  {item.Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="EMailAddress">Email</label>
            <input
              type="email"
              id="EMailAddress"
              className="w-full p-2 text-black rounded-md "
              value={userInfo.EMailAddress}
              onChange={(e) =>
                handleSetUserInfo("EMailAddress", e.target.value)
              }
            />
          </div>
          <div className="relative">
            <div className="relative rounded-md ">
              <label htmlFor="">選擇權限</label>
              <select className="p-2 text-black rounded-md min-w-40">
                <option value="">
                  {userInfo.PermissionData.length
                    ? `已選擇 ${userInfo.PermissionData.length}`
                    : "選擇權限"}
                </option>
              </select>
              <div
                className="absolute top-0 bottom-0 left-0 right-0"
                onClick={() => setFocusInput(!focusInput)}
              ></div>
            </div>
            <div
              className={`h-40 p-1 overflow-auto border rounded-md bg-white  ${focusInput ? "block" : "hidden"}`}
            >
              {permissionList.map((item) => (
                <div
                  key={item.Id}
                  className="flex items-center hover:bg-gray-300"
                >
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
          </div>
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
