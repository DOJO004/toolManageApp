import Image from "next/image";
import Link from "next/link";
interface ReceiveToolMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ReceiveToolMenu({ setOpenMenu }: ReceiveToolMenuProps) {
  return (
    <div className="flex justify-center">
      <Link
        href="/tool-manager/receive-tool"
        onClick={() => setOpenMenu(false)}
        className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
      >
        <Image
          src="/giving.png"
          alt="receive"
          className="mr-2"
          width={30}
          height={30}
        />
        <p className="hidden truncate md:block">領取刀具</p>
      </Link>
    </div>
  );
}
