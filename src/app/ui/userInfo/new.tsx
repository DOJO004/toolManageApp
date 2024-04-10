import React, { FormEvent } from "react";
import { CloseBtn } from "../buttons";
interface UserInfoItem {
  DepartmentID: string;
  UserAccount: string;
  EmployeeID: string;
  UserName: string;
  Password: string;
  EMailAddress: string;
  Permissions: string[];
}

interface DepartmentInfoItem {
  DepartmentID: string;
  Name: string;
}

interface UserInfoNewProps {
  departmentInfoList: DepartmentInfoItem[];
  userInfo: UserInfoItem;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoItem>>;
  changeNewMode: () => void;
  fetchAddNewUser: (e: FormEvent) => void;
  notice: boolean;
  isError: boolean;
}
const UserInfoNew = ({
  departmentInfoList,
  changeNewMode,
  fetchAddNewUser,
  userInfo,
  setUserInfo,
  notice,
  isError,
}: UserInfoNewProps) => {
  return (
    <div className="relative w-fit">
      <form
        className="flex flex-col justify-center w-full max-w-sm p-4 mx-auto mb-2 bg-gray-900 border rounded-xl"
        onSubmit={(e) => fetchAddNewUser(e)}
      >
        <p className="text-xl text-center">新增使用者</p>
        <label htmlFor="DepartmentID">部門</label>
        <select
          defaultValue={""}
          id="DepartmentID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
          onChange={(e) =>
            setUserInfo({ ...userInfo, DepartmentID: e.target.value })
          }
        >
          <option value="" className="text-black " disabled>
            請選擇部門
          </option>
          {departmentInfoList?.map((item, index) => (
            <option
              value={item.DepartmentID}
              key={item.DepartmentID}
              className="text-black"
            >
              {item.Name}
            </option>
          ))}
        </select>
        <label htmlFor="UserAccount">使用者帳號</label>
        <input
          id="UserAccount"
          type="text"
          placeholder="使用者帳號"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={userInfo.UserAccount}
          onChange={(e) =>
            setUserInfo({ ...userInfo, UserAccount: e.target.value })
          }
        />
        <label htmlFor="EmployeeID">員工ID</label>
        <input
          id="EmployeeID"
          type="text"
          placeholder="員工ID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={userInfo.EmployeeID}
          onChange={(e) =>
            setUserInfo({ ...userInfo, EmployeeID: e.target.value })
          }
        />
        <label htmlFor="EMailAddress">Email</label>
        <input
          id="EMailAddress"
          type="email"
          placeholder="Email"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={userInfo.EMailAddress}
          onChange={(e) =>
            setUserInfo({ ...userInfo, EMailAddress: e.target.value })
          }
        />
        <label htmlFor="UserName">使用者名稱</label>
        <input
          id="UserName"
          type="text"
          placeholder="使用者名稱"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={userInfo.UserName}
          onChange={(e) =>
            setUserInfo({ ...userInfo, UserName: e.target.value })
          }
        />
        <label htmlFor="Password">密碼</label>
        <input
          id="Password"
          type="password"
          placeholder="密碼"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={userInfo.Password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, Password: e.target.value })
          }
        />
        <button className="p-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default UserInfoNew;
