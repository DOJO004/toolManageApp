"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface UserInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserInfoMenu = ({ setOpenMenu }: UserInfoMenuProps) => {
  const [showMenuIndex, setShowMenuIndex] = useState(0);

  const menuItem = [
    {
      href: "/tool-manager/user-info",
      src: "/images/icons/list.svg",
      alt: "user info overview",
      name: "總覽",
    },
    {
      href: "/tool-manager/user-info/department",
      src: "/images/icons/department.svg",
      alt: "department icon",
      name: "部門資訊",
    },
    {
      href: "/tool-manager/user-info/permissions",
      src: "/images/icons/permissions.svg",
      alt: "permissions svg",
      name: "權限資訊",
    },
  ];
  const handleShowMenuIndex = (index: number) => {
    setShowMenuIndex(index);
  };
  return (
    <div className="flex justify-center md:flex-col">
      <div className="flex md:block">
        <button
          className="block ml-auto w-fit"
          onClick={() => setOpenMenu(false)}
        >
          <Image src="/icons/back.svg" alt="back icon" width={20} height={20} />
        </button>
        {menuItem.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`m-2 cursor-pointer p-1 rounded-md items-center  md:flex hover:bg-indigo-500 ${showMenuIndex === index ? "bg-indigo-600" : ""}`}
            onClick={() => handleShowMenuIndex(index)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={30}
              height={30}
              className="mr-2"
            />
            <div className="hidden truncate md:block">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default UserInfoMenu;
