"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import menuItem from "./items";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  const [showSubMenuIndex, setShowSubMenuIndex] = useState(0);

  const handleShowSubMenu = (index: number) => {
    setShowSubMenuIndex(index);
  };
  return (
    <div className="flex justify-center w-full md:block">
      <button
        className="block ml-auto w-fit"
        onClick={() => setOpenMenu(false)}
      >
        <Image src="/icons/back.svg" alt="back icon" width={20} height={20} />
      </button>
      {menuItem.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`m-2 cursor-pointer md:flex items-center hover:bg-indigo-500 rounded-md p-1 ${index === showSubMenuIndex ? "bg-indigo-600" : ""}`}
          onClick={() => handleShowSubMenu(index)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={25}
            height={25}
            className="mr-2"
          />
          <div className="hidden md:block whitespace-nowrap">{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default ToolStatusMenu;
