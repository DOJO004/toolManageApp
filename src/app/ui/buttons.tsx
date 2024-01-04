import Link from "next/link";

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
      className="p-2 text-white bg-gray-500 rounded-md w-fit"
      onClick={() => deleteFunction && deleteFunction()}
    >
      刪除
    </p>
  );
}

interface AddBtnProps {
  link: string;
}
export function AddBtn({ link }: AddBtnProps) {
  return (
    <Link href={link} className="p-1 text-sm bg-indigo-500 rounded-md">
      新增
    </Link>
  );
}
