"use client";

import { LangContext } from "@/components/context/langContext";
import DefaultSkeleton from "@/components/skeletons/default";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

interface UserInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserInfoMenu = ({ setOpenMenu }: UserInfoMenuProps) => {
  const dict = useContext(LangContext);
  const [showMenuIndex, setShowMenuIndex] = useState(0);

  const menuItem = [
    {
      href: "/tool-manager/user-info",
      src: "/images/icons/list.svg",
      alt: "user info overview",
      name: dict?.navbar.user_info.submenu.overview,
    },
    {
      href: "/tool-manager/user-info/department",
      src: "/images/icons/department.svg",
      alt: "department icon",
      name: dict?.navbar.user_info.submenu.department,
    },
    {
      href: "/tool-manager/user-info/permissions",
      src: "/images/icons/permissions.svg",
      alt: "permissions svg",
      name: dict?.navbar.user_info.submenu.permissions,
    },
  ];

  const handleShowMenuIndex = (index: number) => {
    setShowMenuIndex(index);
  };

  if (!dict) return <DefaultSkeleton />;

  return (
    <div className="flex justify-center md:flex-col">
      <div className="flex md:block">
        <button
          className="block ml-auto w-fit"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src="/images/icons/back.svg"
            alt="back icon"
            width={20}
            height={20}
          />
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
              width={25}
              height={25}
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
