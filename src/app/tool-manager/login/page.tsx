"use client";
import Login from "@/app/ui/login/login";
import { apiUserLogin } from "@/scripts/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [waitLogin, setWaitLogin] = useState(false);
  const router = useRouter();

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitLogin(true);
    const res = await apiUserLogin(userAccount, userPassword);
    if (res?.data?.Values?.ReqInt === 0) {
      const token = res.data.Values.Token;
      const loginTime = res.data.Values.LoginTime;

      document.cookie = "userToken=" + token;
      document.cookie = "loginTime=" + loginTime;

      router.push("/tool-manager/tool-status");
    } else {
      setErrorMessage("登入失敗，請重新嘗試。");
    }
    setWaitLogin(false);
  };

  return (
    <Login
      userLogin={userLogin}
      userAccount={userAccount}
      setUserAccount={setUserAccount}
      userPassword={userPassword}
      setUserPassword={setUserPassword}
      errorMessage={errorMessage}
      waitLogin={waitLogin}
    />
  );
}
