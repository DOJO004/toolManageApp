"use client";

import { setCookie } from "@/scripts/Apis/mainApi";
import { UserLoginInfo } from "@/scripts/Apis/userInfo/types";
import { ApiUserLogin } from "@/scripts/Apis/userInfo/userInfoApis";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import SubmitButton from "../buttons";
import { LangContext } from "../context/langContext";
import SweetAlert from "../sweetAlert";
import { LoginResponse } from "./types";

export default function Login() {
  const dict = useContext(LangContext);

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
      SweetAlert(reqInt, dict.login.login_success);
      router.push("/tool-manager/dashboard");
    } else {
      SweetAlert(reqInt, dict.login.login_fail);
    }
    setWaitLogin(false);
  };

  const handleLoginInfo = (key: string, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }));
  };

  if (!dict) return <div>Loading...</div>;

  return (
    <div className="p-2 bg-gray-500 rounded-md">
      <h1>{dict.login.tittle}</h1>
      <form onSubmit={(e) => postLoginInfo(e)}>
        <div className="my-4">
          <label htmlFor="UserAccount">{dict.login.account}</label>
          <input
            type="text"
            id="UserAccount"
            className="w-full p-2 text-black rounded-md "
            placeholder={dict.login.account_placeholder}
            value={loginInfo.UserAccount}
            onChange={(e) => handleLoginInfo("UserAccount", e.target.value)}
          />
        </div>
        <div className="relative my-4">
          <label htmlFor="Password">{dict.login.password}</label>
          <input
            type={showPassword ? "text" : "password"}
            id="Password"
            placeholder={dict.login.password_placeholder}
            className="w-full p-2 text-black rounded-md "
            value={loginInfo.UserPwd}
            onChange={(e) => handleLoginInfo("UserPwd", e.target.value)}
          />
          <Image
            src={
              showPassword
                ? "images/icons/visibility.svg"
                : "images/icons/visibility_off.svg"
            }
            width={20}
            height={20}
            alt="show password icon"
            className="absolute cursor-pointer right-3 top-9 hover:scale-110"
            onClick={() => setShowPassword((prev) => !prev)}
            unoptimized
          />
        </div>
        <SubmitButton
          name={dict.login.login}
          classNames="w-full p-2 my-4 bg-indigo-500 rounded-md"
          onclick={() => {}}
          isPending={waitLogin}
        />
      </form>
    </div>
  );
}
