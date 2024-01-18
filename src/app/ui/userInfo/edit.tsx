import React, { FormEvent } from "react";
import { CloseBtn } from "../buttons";
import Notice from "../notice";
interface EditUserInfoItem {
  AccountID: string;
  Department: string;
  UserID: string;
  EmployeeID: string;
  UserName: string;
  Activated: string;
  CreateTime: string;
  LastModify: string;
}

interface DepartmentInfoItem {
  DepartmentID: string;
  Name: string;
}

interface EditUserAccountAndPasswordItem {
  Email: string;
  Password: string;
}

interface UserInfoEditProps {
  departmentInfoList: DepartmentInfoItem[];
  editUserInfo: EditUserInfoItem;
  setEditUserInfo: React.Dispatch<React.SetStateAction<EditUserInfoItem>>;
  editUserAccountAndPassword: EditUserAccountAndPasswordItem;
  setEditUserAccountAndPassword: React.Dispatch<
    React.SetStateAction<EditUserAccountAndPasswordItem>
  >;
  fetchEditUserInfo: (e: FormEvent) => void;
  changeEditMode: () => void;
  notice: boolean;
  isError: boolean;
}

const UserInfoEdit = ({
  departmentInfoList,
  editUserInfo,
  setEditUserInfo,
  editUserAccountAndPassword,
  setEditUserAccountAndPassword,
  fetchEditUserInfo,
  changeEditMode,
  notice,
  isError,
}: UserInfoEditProps) => {
  return (
    <div className="relative w-fit ">
      <form
        className="flex flex-col justify-center w-full max-w-sm p-4 mx-auto mb-2 bg-gray-900 border rounded-xl"
        onSubmit={(e) => fetchEditUserInfo(e)}
      >
        <p className="text-xl text-center">編輯使用者</p>
        {notice && <Notice isError={isError} />}
        <label htmlFor="DepartmentID">部門</label>
        <select
          defaultValue={editUserInfo.Department}
          id="DepartmentID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72 "
          onChange={(e) =>
            setEditUserInfo({ ...editUserInfo, Department: e.target.value })
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
        <label htmlFor="EmployeeID">員工ID</label>
        <input
          id="EmployeeID"
          type="text"
          placeholder="員工ID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={editUserInfo.EmployeeID}
          onChange={(e) =>
            setEditUserInfo({ ...editUserInfo, EmployeeID: e.target.value })
          }
        />
        <label htmlFor="UserName">使用者名稱</label>
        <input
          id="UserName"
          type="text"
          placeholder="使用者名稱"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={editUserInfo.UserName}
          onChange={(e) =>
            setEditUserInfo({ ...editUserInfo, UserName: e.target.value })
          }
        />
        <label htmlFor="EMailAddress">Email</label>
        <input
          id="EMailAddress"
          type="email"
          placeholder="Email"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={editUserAccountAndPassword.Email}
          onChange={(e) =>
            setEditUserAccountAndPassword({
              ...editUserAccountAndPassword,
              Email: e.target.value,
            })
          }
        />

        <label htmlFor="Password">密碼</label>
        <input
          id="Password"
          type="password"
          placeholder="請輸入新密碼"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
          value={editUserAccountAndPassword.Password}
          onChange={(e) =>
            setEditUserAccountAndPassword({
              ...editUserAccountAndPassword,
              Password: e.target.value,
            })
          }
        />
        <button className="p-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeEditMode} />
      </div>
    </div>
  );
};

export default UserInfoEdit;
