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
