import { ApiPostUserInfo } from "@/scripts/Apis/userInfo/userInfoApi";
import { FormEvent, useState } from "react";
import { DepartmentItem } from "./types";

interface NewUserInfoProps {
  setNewUserMode: (value: boolean) => void;
  departmentList: DepartmentItem[];
}
export default function NewUserInfo({
  setNewUserMode,
  departmentList,
}: NewUserInfoProps) {
  const [userInfo, setUserInfo] = useState({
    UserAccount: "",
    Password: "",
    UserName: "",
    DepartmentId: "",
    EmployeeId: "",
    EMailAddress: "",
  });

  const postUserInfo = async (e: FormEvent) => {
    e.preventDefault();
    const data = await ApiPostUserInfo(userInfo);
    console.log(data);
  };

  const handleSetUserInfo = (key: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

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
        <div className="flex gap-2">
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
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600">
          新增
        </button>
      </form>
    </div>
  );
}
