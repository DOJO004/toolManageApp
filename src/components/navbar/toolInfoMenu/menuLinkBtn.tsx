import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  src: string;
  alt: string;
  name: string;
  path: string;
}

interface MenuItemProps {
  menuItem: MenuItem[];
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuLinkBtn = ({ menuItem, setOpenMenu }: MenuItemProps) => {
  return <></>;
};

export default MenuLinkBtn;
