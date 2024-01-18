import React from "react";
import menuItem from "./items";
import Image from "next/image";
import Link from "next/link";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  return (
    <div className="flex justify-center w-full md:block">
      {menuItem.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          onClick={() => setOpenMenu(false)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={30}
            height={30}
            className="mr-2"
          />
          <p className="hidden md:block whitespace-nowrap">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ToolStatusMenu;
