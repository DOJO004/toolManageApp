interface DeleteBtnProps {
  disableFunction?: () => void;
}
const DeleteBtn = ({ disableFunction }: DeleteBtnProps) => {
  return (
    <button
      className="p-2 text-white bg-gray-500 rounded-md "
      onClick={() => disableFunction()}
    >
      刪除
    </button>
  );
};

export default DeleteBtn;
