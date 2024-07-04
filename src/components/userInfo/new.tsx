import {
  DepartmentItem,
  NewUserInfo,
  PermissionMenuItem,
} from "@/scripts/Apis/userInfo/types";
import { FormEvent } from "react";
import SubmitButton from "../buttons";
interface NewUserInfoProps {
  setNewUserMode: (value: boolean) => void;
  departmentList: DepartmentItem[];
  postUserInfo: (e: FormEvent) => void;
  handleSetUserInfo: (key: string, value: string) => void;
  newUserInfo: NewUserInfo;
  setFocusInput: (value: boolean) => void;
  focusInput: boolean;
  permissionList: PermissionMenuItem[];
  handleCheckPermission: (checked: boolean, permissionId: string) => void;
  isPending: boolean;
}
export default function UserInfoNew({
  setNewUserMode,
  departmentList,
  postUserInfo,
  handleSetUserInfo,
  newUserInfo,
  setFocusInput,
  focusInput,
  permissionList,
  isPending,
}: NewUserInfoProps) {
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
        <div className="grid grid-cols-7 gap-2 ">
          <div>
            <label htmlFor="UserAccount">帳號</label>
            <input
              type="text"
              id="UserAccount"
              className="w-full p-2 text-black rounded-md "
              value={newUserInfo.UserAccount}
              onChange={(e) => handleSetUserInfo("UserAccount", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Password">密碼</label>
            <input
              type="password"
              id="Password"
              className="w-full p-2 text-black rounded-md "
              value={newUserInfo.Password}
              onChange={(e) => handleSetUserInfo("Password", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="EmployeeId">員工 ID</label>
            <input
              type="text"
              id="EmployeeId"
              className="w-full p-2 text-black rounded-md "
              value={newUserInfo.EmployeeId}
              onChange={(e) => handleSetUserInfo("EmployeeId", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="UserName">使用者名稱</label>
            <input
              type="text"
              id="UserName"
              className="w-full p-2 text-black rounded-md "
              value={newUserInfo.UserName}
              onChange={(e) => handleSetUserInfo("UserName", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="DepartmentId">部門</label>
            <select
              id="DepartmentId"
              className="w-full p-2 text-black rounded-md "
              value={newUserInfo.DepartmentId}
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
              value={newUserInfo.EMailAddress}
              onChange={(e) =>
                handleSetUserInfo("EMailAddress", e.target.value)
              }
            />
          </div>
          <div className="relative">
            <div className="relative rounded-md ">
              <label htmlFor="">選擇權限</label>
              <select
                className="w-full p-2 text-black rounded-md min-w-40"
                onClick={() => setFocusInput(!focusInput)}
              >
                <option value="">
                  {newUserInfo.PermissionIds?.length
                    ? `已選擇 ${newUserInfo.PermissionIds?.length}`
                    : "選擇權限"}
                </option>
              </select>
              <ul
                className={`absolute z-10 w-full p-4 h-40 overflow-auto bg-gray-200 border rounded-md top-16 right-0 ${focusInput ? "block" : "hidden"}`}
              >
                {permissionList.map((item) => (
                  <li key={item.Id} className="mr-auto w-fit hover:bg-gray-300">
                    <input
                      type="checkbox"
                      id={item.Name}
                      onChange={() =>
                        handleSetUserInfo("PermissionIds", item.Id)
                      }
                    />
                    <label
                      htmlFor={item.Name}
                      className="text-sm text-black cursor-pointer lg:text-base"
                    >
                      {item.Name}
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
        <SubmitButton
          name="新增"
          classNames="w-full p-2 my-4 bg-indigo-500 rounded-md hover:bg-indigo-600"
          onclick={() => {}}
          isPending={isPending}
        />
      </form>
    </div>
  );
}
