import { FormEvent } from "react";

interface Props {
  resetPassword: (e: FormEvent) => void;
  setResetPasswordMode: React.Dispatch<React.SetStateAction<boolean>>;
  newPasswordData: {
    AccountId: string;
    NewPwd: string;
  };
  setNewPasswordData: React.Dispatch<
    React.SetStateAction<{
      AccountId: string;
      NewPwd: string;
    }>
  >;
  resetPasswordMode: boolean;
}
export default function ResetPasswordForm({
  resetPassword,
  setResetPasswordMode,
  newPasswordData,
  setNewPasswordData,
  resetPasswordMode,
}: Props) {
  return (
    <form
      className={` max-w-md p-4 m-4 mx-auto -translate-x-1/2 -translate-y-1/2 bg-gray-900 border rounded-md top-1/2 left-1/2 ${resetPasswordMode ? "absolute" : "hidden"}`}
      onSubmit={(e) => resetPassword(e)}
    >
      <div className="relative">
        <h3>重設密碼</h3>
        <p
          className="absolute top-0 right-0 p-1 rounded-full cursor-pointer hover:bg-gray-700"
          onClick={() => setResetPasswordMode(false)}
        >
          X
        </p>
      </div>
      <div className="mt-4">
        <input
          type="password"
          placeholder="請輸入新密碼"
          className="block p-2 text-center text-black rounded-md w-96 "
          value={newPasswordData.NewPwd}
          onChange={(e) => {
            setNewPasswordData((prev) => ({
              ...prev,
              NewPwd: e.target.value,
            }));
          }}
        />
        <button className="w-full p-2 mt-4 bg-indigo-500 rounded-md">
          重設密碼
        </button>
      </div>
    </form>
  );
}
