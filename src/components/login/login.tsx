"use client";

import { setCookie } from "@/scripts/Apis/mainApi";
import { UserLoginInfo } from "@/scripts/Apis/userInfo/types";
import { ApiUserLogin } from "@/scripts/Apis/userInfo/userInfoApis";
import CircularProgress from "@mui/joy/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SweetAlert from "../sweetAlert";
import { LoginResponse } from "./types";

export default function Login() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState<UserLoginInfo>({
    UserAccount: "",
    UserPwd: "",
  });
  const [waitLogin, setWaitLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const postLoginInfo = async (e: FormEvent) => {
    e.preventDefault();
    setWaitLogin(true);
    const data = await ApiUserLogin(loginInfo);
    const res = data as LoginResponse;
    const reqInt = res?.data?.Values?.ReqInt;
    console.log("login", res);

    if (reqInt === 0) {
      setCookie("userToken", res.data.Values.Token, 30);
      setCookie("loginTime", res.data.Values.LoginTime, 30);
      setCookie("permission", res.data.Values.PermissionList, 30);
      setCookie("userName", res.data.Values.UserInfo.UserName, 30);
      SweetAlert(reqInt, "登入成功");
      router.push("/tool-manager/tool-info");
    } else {
      SweetAlert(reqInt, "登入失敗");
    }
    setWaitLogin(false);
  };

  const handleLoginInfo = (key: string, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div className="p-2 bg-gray-500 rounded-md">
      <h1>登入</h1>
      <form onSubmit={(e) => postLoginInfo(e)}>
        <div className="my-4">
          <label htmlFor="UserAccount">帳號</label>
          <input
            type="text"
            id="UserAccount"
            className="w-full p-2 text-black rounded-md "
            placeholder="請輸入帳號"
            value={loginInfo.UserAccount}
            onChange={(e) => handleLoginInfo("UserAccount", e.target.value)}
          />
        </div>
        <div className="relative my-4">
          <label htmlFor="Password">密碼</label>
          <input
            type={showPassword ? "text" : "password"}
            id="Password"
            placeholder="請輸入密碼"
            className="w-full p-2 text-black rounded-md "
            value={loginInfo.UserPwd}
            onChange={(e) => handleLoginInfo("UserPwd", e.target.value)}
          />
          <Image
            src={showPassword ? "/visible.png" : "/hide.png"}
            width={20}
            height={20}
            alt="show password icon"
            className="absolute cursor-pointer right-3 top-10 hover:scale-110"
            onClick={() => setShowPassword((prev) => !prev)}
            unoptimized
          />
        </div>
        <button className="w-full p-2 my-4 bg-indigo-500 rounded-md">
          {waitLogin ? <CircularProgress variant="solid" size="sm" /> : "登入"}
        </button>
      </form>
    </div>
  );
}
