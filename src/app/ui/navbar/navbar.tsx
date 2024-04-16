"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import navbarItem from "./items";
import MachineInfoMenu from "./machineInfoMenu/menu";
import ToolStatusMenu from "./toolInfoMenu/menu";
import UserInfoMenu from "./userInfoMenu/menu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [clickItemName, setClickItemName] = useState("");

  const handleNavbarMenu = (name: string) => {
    if (
      name === "dashboard" ||
      name === "領取刀具" ||
      name === "歸還刀具" ||
      name === "修整/報廢" ||
      name === "電子標籤資訊"
    ) {
      setOpenMenu(false);
      return;
    }

    if (clickItemName != name) {
      setOpenMenu(true);
    } else {
      setOpenMenu(!openMenu);
    }
    setClickItemName(name);
  };

  return (
    <div className=" md:flex">
      <div className="overflow-auto bg-gray-900 rounded-md md:flex md:justify-center md:h-screen">
        <ul className="flex items-center m-2 md:flex-col">
          <li
            className="p-1 mx-2 my-2 bg-white rounded-full cursor-pointer min-w-fit "
            onClick={() => handleNavbarMenu("dashboard")}
          >
            <Link href="/tool-manager/dashboard">
              <Image
                src="/logo.png"
                alt="logo image"
                loader={({ src, width }) => `${src}?w=${width}`}
                width={30}
                height={30}
                className=" min-w-fit"
              />
            </Link>
          </li>
          {navbarItem.map((item, index) => (
            <li
              className="w-auto p-1 my-2 rounded-md cursor-pointer hover:bg-indigo-500"
              onClick={() => handleNavbarMenu(item.name)}
              key={index}
            >
              {item.path ? (
                <Link href={item.path}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    loader={({ src, width }) => `${src}?w=${width}`}
                    width={item.width}
                    height={item.height}
                    className="mx-auto"
                  />
                  <div className="text-center whitespace-nowrap">
                    {item.name}
                  </div>
                </Link>
              ) : (
                <div
                  className="p-1 my-2 rounded-md cursor-pointer hover:bg-indigo-500"
                  key={index}
                  onClick={() => handleNavbarMenu(item.name)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    loader={({ src, width }) => `${src}?w=${width}`}
                    width={item.width}
                    height={item.height}
                    className="mx-auto"
                  />
                  <div className="text-sm text-center whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={` transition-all ease-in-out relative duration-300 overflow-hidden ${
          openMenu ? "w-full md:w-32 " : "w-0"
        }`}
      >
        {clickItemName === "刀具資訊" && openMenu && (
          <ToolStatusMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === "設備資訊" && openMenu && (
          <MachineInfoMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === "使用者資訊" && openMenu && (
          <UserInfoMenu setOpenMenu={setOpenMenu} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
