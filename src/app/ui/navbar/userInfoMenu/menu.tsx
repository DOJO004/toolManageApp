import Image from "next/image";
import Link from "next/link";

interface UserInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserInfoMenu = ({ setOpenMenu }: UserInfoMenuProps) => {
  return (
    <div className="flex justify-center md:flex-col">
      <div className="flex md:block">
        <Link
          href={"/tool-manager/user-info"}
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src="/overView.png"
            alt="user info overview"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="hidden truncate md:block">總覽</p>
        </Link>
      </div>{" "}
    </div>
  );
};
export default UserInfoMenu;
