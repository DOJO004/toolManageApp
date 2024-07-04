"use client";
import { LangContext } from "@/app/[lang]/layout";
import DefaultSkeleton from "@/components/skeletons/default";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  const dict = useContext(LangContext);
  const [showSubMenuIndex, setShowSubMenuIndex] = useState(0);
  const menuItem = [
    {
      src: "/images/icons/list.svg",
      alt: "overView",
      name: dict?.navbar.tool_info.submenu.overview,
      path: "/tool-manager/tool-info/",
    },
    {
      src: "/images/icons/storageList.svg",
      alt: "storage_icon",
      name: dict?.navbar.tool_info.submenu.storage_list,
      path: "/tool-manager/tool-info/storage",
    },
    {
      src: "/images/icons/toolType.svg",
      alt: "toolTypes",
      name: dict?.navbar.tool_info.submenu.tool_type,
      path: "/tool-manager/tool-info/tool-type/",
    },
    {
      src: "/images/icons/toolSpec.svg",
      alt: "toolSpec",
      name: dict?.navbar.tool_info.submenu.tool_spec,
      path: "/tool-manager/tool-info/tool-spec/",
    },
    {
      src: "/images/icons/toolStock.svg",
      alt: "toolStocks",
      name: dict?.navbar.tool_info.submenu.tool_stock,
      path: "/tool-manager/tool-info/tool-stock/",
    },
  ];

  const handleShowSubMenu = (index: number) => {
    setShowSubMenuIndex(index);
  };

  if (!dict) return <DefaultSkeleton />;
  return (
    <div className="flex justify-center w-full md:block">
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
