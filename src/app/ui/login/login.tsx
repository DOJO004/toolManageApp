"use client";

import { setCookie } from "@/scripts/Apis/mainApi";
import { ApiUserLogin } from "@/scripts/Apis/userInfo/userInfoApi";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { LoginResponse } from "./types";

export default function Login() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({
    UserAccount: "",
    UserPwd: "",
  });

  const postLoginInfo = async (e: FormEvent) => {
    e.preventDefault();
    const data = await ApiUserLogin(loginInfo);
    const res = data as LoginResponse;
    console.log(res);

    if (res?.data?.Values?.ReqInt === 0) {
      setCookie("userToken", res.data.Values.Token, 30);
      setCookie("loginTime", res.data.Values.LoginTime, 30);
      Swal.fire({
        icon: "success",
        title: "登入成功",
        timer: 2000,
        timerProgressBar: true,
      });
      router.push("/tool-manager/tool-info");
    } else {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: `error code : ${res?.data?.Values?.ReqInt}`,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleLoginInfo = (key: string, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="p-2 bg-gray-500 rounded-md">
      <h1>登入</h1>
      <form onSubmit={(e) => postLoginInfo(e)}>
        <div className="my-4">
          <label htmlFor="UserAccount">使用者名稱</label>
          <input
            type="text"
            id="UserAccount"
            className="w-full p-2 text-black rounded-md "
            value={loginInfo.UserAccount}
            onChange={(e) => handleLoginInfo("UserAccount", e.target.value)}
          />
        </div>
        <div className="my-4">
          <label htmlFor="Password">密碼</label>
          <input
            type="password"
            id="Password"
            className="w-full p-2 text-black rounded-md "
            value={loginInfo.UserPwd}
            onChange={(e) => handleLoginInfo("UserPwd", e.target.value)}
          />
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md">
          登入
        </button>
      </form>
    </div>
  );
}
