import Link from "next/link";
import Image from "next/image";
interface ElabelInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ElabelInfoMenu = ({ setOpenMenu }: ElabelInfoMenuProps) => {
  return (
    <div className="flex justify-center md:flex-col">
      <div className="flex md:block">
        <Link
          href="/tool-manager/elabel-info"
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src={"/overView.png"}
            alt="elabel info"
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="hidden truncate md:block">總覽</p>
        </Link>
      </div>
    </div>
  );
};

export default ElabelInfoMenu;
