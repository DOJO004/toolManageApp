import Image from "next/image";
import Link from "next/link";
interface ReceiveToolMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ReceiveToolMenu({ setOpenMenu }: ReceiveToolMenuProps) {
  return (
    <Link href="/tool-manager/receive-tool" onClick={() => setOpenMenu(false)}>
      link
    </Link>
  );
}
