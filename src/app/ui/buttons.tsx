interface BackBtnProps {
  backFunction?: () => void;
}
export function BackBtn({ backFunction }: BackBtnProps) {
  return (
    <p
      className="text-xl font-bold text-white cursor-pointer "
      onClick={() => backFunction && backFunction()}
    >
      ←
    </p>
  );
}

interface DeleteBtnProps {
  deleteFunction: () => void;
}
export function DeleteBtn({ deleteFunction }: DeleteBtnProps) {
  return (
    <p
      className="p-2 text-white bg-gray-500 rounded-md cursor-pointer w-fit hover:bg-gray-600"
      onClick={() => deleteFunction && deleteFunction()}
    >
      刪除
    </p>
  );
}

interface AddBtnProps {
  changeNewMode: () => void;
}
export function AddBtn({ changeNewMode }: AddBtnProps) {
  return (
    <button
      className="p-1 text-sm bg-indigo-500 rounded-md hover:bg-indigo-600"
      onClick={() => changeNewMode()}
    >
      新增
    </button>
  );
}

interface closeBtnProps {
  changeMode: () => void;
}
export function CloseBtn({ changeMode }: closeBtnProps) {
  return (
    <button className="text-xl" onClick={() => changeMode()}>
      X
    </button>
  );
}

interface ToggleBtnProps {
  toggleBtn: boolean;
  setToggleBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToggleBtn({ toggleBtn, setToggleBtn }: ToggleBtnProps) {
  return (
    <label
      htmlFor="toggleBtn"
      title="開啟後不關閉視窗"
      className={`relative  inline-block w-12 duration-300 cursor-pointer rounded-xl h-fit shadow-inner transition-all ${
        toggleBtn ? "bg-blue-500" : "bg-gray-500"
      }`}
    >
      <input
        type="checkbox"
        id="toggleBtn"
        className="opacity-0 "
        onChange={() => setToggleBtn(!toggleBtn)}
      />
      <span
        className={`absolute top-0 left-0 right-0 bottom-0 duration-300  w-6 h-6 transition-all bg-gray-200 rounded-full ${
          toggleBtn ? " translate-x-full" : ""
        }`}
      ></span>
    </label>
  );
}
