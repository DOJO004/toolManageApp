import Link from "next/link";
interface LinkBtn {
  link: string;
}
const LinkBtn = ({ link }: LinkBtn) => {
  return (
    <Link href={link} className="p-1 text-sm bg-indigo-500 rounded-md">
      新增
    </Link>
  );
};

export default LinkBtn;
