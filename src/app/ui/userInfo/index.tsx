import React from "react";
import { AddBtn } from "../buttons";

interface UserInfoItem {
  AccountID: string;
  Department: string;
  UserID: string;
  EmployeeID: string;
  UserName: string;
  CreateTime: string;
  LastModify: string;
}

interface UserInfoIndexProps {
  userInfoList: UserInfoItem[];
  changeNewMode: () => void;
}

const UserInfoIndex = ({ userInfoList, changeNewMode }: UserInfoIndexProps) => {
  return (
    <div className="relative w-full max-w-5xl p-2 text-center bg-gray-900 rounded-xl">
      <p className="text-xl text-center ">使用者列表</p>
      <div className="grid grid-cols-7 gap-2 p-1 bg-gray-800 rounded-xl">
        <div className="truncate ">部門</div>
        <div className="truncate ">帳號ID</div>
        <div className="truncate ">員工ID</div>
        <div className="truncate ">使用者ID</div>
        <div className="truncate ">使用者名稱</div>
        <div className="truncate ">建立時間</div>
        <div className="truncate ">修改時間</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {userInfoList.map((item, index) => (
          <React.Fragment key={item.AccountID}>
            <div className="truncate ">{item.Department}</div>
            <div className="truncate ">{item.AccountID}</div>
            <div className="truncate ">{item.EmployeeID}</div>
            <div className="truncate ">{item.UserID}</div>
            <div className="truncate ">{item.UserName}</div>
            <div className="truncate ">{item.CreateTime}</div>
            <div className="truncate ">{item.LastModify}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="absolute top-2 right-3">
        <AddBtn changeNewMode={changeNewMode} />
      </div>
    </div>
  );
};

export default UserInfoIndex;
