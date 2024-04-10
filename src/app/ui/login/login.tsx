const Login = () => {
  return (
    <div className="flex justify-center ">
      <form className="p-4 bg-gray-900 rounded-lg h-fit">
        <p className="mb-4 text-4xl font-bold text-center">Login</p>
        <div>
          <label htmlFor="userAccount">使用者名稱</label>
          <input
            id="userAccount"
            type="text"
            placeholder="使用者名稱"
            className="w-full pl-2 mb-4 text-black border border-black rounded-xl min-h-12"
          />
        </div>
        <div>
          <label htmlFor="password">密碼</label>
          <input
            id="password"
            type="password"
            placeholder="密碼"
            className="w-full pl-2 mb-4 text-black rounded-xl min-h-12"
          />
        </div>
        <button
          className={`flex p-2 ml-auto  rounded-xl min-w-32 h-12 items-center `}
        >
          <p className="mx-auto text-xl"></p>
        </button>
      </form>
    </div>
  );
};

export default Login;
