import Image from "next/image";
import Link from "next/link";
import React from "react";
import menuItem from "./items";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  return (
    <div className="flex justify-center w-full md:block">
      <button
        className="block ml-auto w-fit"
        onClick={() => setOpenMenu(false)}
      >
        <Image
          src="/arrow_back_icon.png"
          alt="back icon"
          width={20}
          height={20}
        />
      </button>
      {menuItem.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={30}
            height={30}
            className="mr-2"
          />
          <div className="hidden md:block whitespace-nowrap">{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default ToolStatusMenu;
