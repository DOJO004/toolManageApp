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
          <div className="hidden truncate md:block">總覽</div>
        </Link>
        <Link
          href={"/tool-manager/user-info/department"}
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src="/department_icon.png"
            alt="department_icon"
            width={30}
            height={30}
            className="mr-2"
          />
          <div className="hidden truncate md:block">部門資訊</div>
        </Link>
        <Link
          href={"/tool-manager/user-info/police-info"}
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src="/police_icon.png"
            alt="police_icon"
            width={30}
            height={30}
            className="mr-2"
          />
          <div className="hidden truncate md:block">權限資訊</div>
        </Link>
      </div>
    </div>
  );
};
export default UserInfoMenu;
