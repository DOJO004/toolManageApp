import { CloseBtn } from "../buttons";

interface UserInfoNewProps {
  changeNewMode: () => void;
}
const UserInfoNew = ({ changeNewMode }: UserInfoNewProps) => {
  return (
    <div className="relative ">
      <form className="flex flex-col justify-center w-full max-w-sm p-4 mx-auto mb-2 bg-gray-900 rounded-xl">
        <p className="text-xl text-center">新增使用者</p>
        <input
          type="text"
          placeholder="OperatorID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="部門"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="帳號ID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="員工ID"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="Email"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="使用者名稱"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <input
          type="text"
          placeholder="密碼"
          className="block pl-2 my-2 text-black rounded-md min-h-10 min-w-72"
        />
        <button className="p-2 bg-indigo-500 rounded-md min-w-72 hover:bg-indigo-600">
          完成
        </button>
      </form>
      <div className="absolute top-3 right-3">
        <CloseBtn changeMode={changeNewMode} />
      </div>
    </div>
  );
};

export default UserInfoNew;
