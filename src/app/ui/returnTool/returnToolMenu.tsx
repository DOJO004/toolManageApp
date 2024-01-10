import Image from "next/image";
import Link from "next/link";

interface ReturnToolMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReturnToolMenu = ({ setOpenMenu }: ReturnToolMenuProps) => {
  return (
    <div className="flex items-center justify-center">
      <Link
        href="/tool-manager/return-tool"
        className="flex m-2"
        onClick={() => setOpenMenu(false)}
      >
        <Image
          src="/go-back-arrow.png"
          alt="go-back-arrow"
          width={25}
          height={25}
          className="mr-2 "
        />
        <p className="hidden md:block">歸還道具</p>
      </Link>
    </div>
  );
};

export default ReturnToolMenu;
