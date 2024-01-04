import React from "react";

interface LoginProps {
  userLogin: (e: React.FormEvent) => void;
  userAccount: string;
  setUserAccount: React.Dispatch<React.SetStateAction<string>>;
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  waitLogin: boolean;
}

const Login = ({
  userLogin,
  userAccount,
  setUserAccount,
  userPassword,
  setUserPassword,
  errorMessage,
  waitLogin,
}: LoginProps) => {
  return (
    <div className="flex items-center justify-center md:mt-48">
      <form onSubmit={(e) => userLogin(e)}>
        <p className="my-2 text-4xl font-bold">Login</p>
        <p className="text-red-500">{errorMessage ? errorMessage : ""}</p>
        <input
          type="text"
          placeholder="使用者名稱"
          className="block pl-2 my-2 text-black rounded-xl min-h-12"
          onChange={(e) => setUserAccount(e.target.value)}
          value={userAccount}
        />
        <input
          type="password"
          placeholder="密碼"
          className="block pl-2 my-2 text-black rounded-xl min-h-12"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />
        <button
          className={`flex p-2 ml-auto bg-blue-500 rounded-xl min-w-24 ${
            waitLogin ? "bg-gray-500" : ""
          }`}
        >
          <p className="mx-auto">{waitLogin ? "登入中..." : "登入"}</p>
        </button>
      </form>
    </div>
  );
};

export default Login;
