interface DeleteBtnProps {
  disableFunction: () => void;
}
const DeleteBtn = ({ disableFunction }: DeleteBtnProps) => {
  return (
    <p
      className="p-2 text-white bg-gray-500 rounded-md w-fit"
      onClick={() => disableFunction && disableFunction()}
    >
      刪除
    </p>
  );
};

export default DeleteBtn;
