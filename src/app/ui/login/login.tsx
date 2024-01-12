import React, { useContext } from "react";

interface LoginProps {
  userLogin: (e: React.FormEvent) => void;
  userAccount: string;
  setUserAccount: React.Dispatch<React.SetStateAction<string>>;
  userPassword: string;
  setUserPassword: React.Dispatch<React.SetStateAction<string>>;
  waitLogin: boolean;
}

const Login = ({
  userLogin,
  userAccount,
  setUserAccount,
  userPassword,
  setUserPassword,
  waitLogin,
}: LoginProps) => {
  return (
    <div className="flex items-center justify-center w-full md:mt-48">
      <form
        onSubmit={(e) => userLogin(e)}
        className="w-full p-4 bg-gray-900 rounded-lg md:max-w-96"
      >
        <p className="mb-4 text-4xl font-bold text-center">Login</p>
        <div className="relative">
          <label htmlFor="userAccount">使用者名稱</label>
          <input
            id="userAccount"
            type="text"
            placeholder="使用者名稱"
            className="block w-full pl-2 mb-4 text-black border border-black rounded-xl min-h-12"
            onChange={(e) => setUserAccount(e.target.value)}
            value={userAccount}
          />
        </div>
        <label htmlFor="password">密碼</label>
        <input
          id="password"
          type="password"
          placeholder="密碼"
          className="block w-full pl-2 mb-4 text-black rounded-xl min-h-12"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />
        <button
          className={`flex p-2 ml-auto bg-indigo-500 rounded-xl min-w-32 h-12 items-center ${
            waitLogin ? "bg-gray-500" : ""
          }`}
        >
          <p className="mx-auto text-xl">{waitLogin ? "登入中..." : "登入"}</p>
        </button>
      </form>
    </div>
  );
};

export default Login;
