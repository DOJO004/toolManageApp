import { FormEvent } from "react";
import { DepartmentItem } from "./department/type";
import { PermissionMenuItem } from "./policeInfo/type";
import type { NewUserInfo } from "./types";
interface NewUserInfoProps {
  setNewUserMode: (value: boolean) => void;
  departmentList: DepartmentItem[];
  postUserInfo: (e: FormEvent) => void;
  handleSetUserInfo: (key: string, value: string) => void;
  userInfo: NewUserInfo;
  setFocusInput: (value: boolean) => void;
  focusInput: boolean;
  permissionList: PermissionMenuItem[];
  handleCheckPermission: (checked: boolean, permissionId: string) => void;
}
export default function UserInfoNew({
  setNewUserMode,
  departmentList,
  postUserInfo,
  handleSetUserInfo,
  userInfo,
  setFocusInput,
  focusInput,
}: NewUserInfoProps) {
  // test
  const permissions = [
    {
      id: "1",
      name: "管理員",
    },
    {
      id: "2",
      name: "主管",
    },
    {
      id: "3",
      name: "員工",
    },
  ];
  return (
    <div className="p-4 bg-gray-900 rounded-md">
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
              <ul className="absolute z-10 w-40 p-4 bg-gray-200 border rounded-md top-16 right-2">
                {permissions.map((item) => (
                  <li key={item.id} className="mr-auto w-fit">
                    <input type="checkbox" id={item.name} />
                    <label htmlFor={item.name} className="text-black">
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
              <div
                className="absolute top-0 bottom-0 left-0 right-0"
                onClick={() => setFocusInput(!focusInput)}
              ></div>
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
