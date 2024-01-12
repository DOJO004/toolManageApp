"use client";
import Login from "@/app/ui/login/login";
import Notice from "@/app/ui/notice";
import { apiUserLogin } from "@/scripts/api";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [waitLogin, setWaitLogin] = useState(false);
  const router = useRouter();
  const [notice, setNotice] = useState(false);
  const [isError, setIsError] = useState(false);

  const userLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitLogin(true);

    const res = await apiUserLogin(userAccount, userPassword);
    setNotice(true);
    if (res?.data?.Values?.ReqInt === 0) {
      const token = res.data.Values.Token;
      const loginTime = res.data.Values.LoginTime;

      document.cookie = "userToken=" + token;
      document.cookie = "loginTime=" + loginTime;
      setIsError(false);
      router.push("/tool-manager/tool-info");
    } else {
      setIsError(true);
    }
    setWaitLogin(false);
  };

  return (
    <>
      <Notice notice={notice} setNotice={setNotice} isError={isError} />
      <Login
        userLogin={userLogin}
        userAccount={userAccount}
        setUserAccount={setUserAccount}
        userPassword={userPassword}
        setUserPassword={setUserPassword}
        waitLogin={waitLogin}
      />
    </>
  );
}
