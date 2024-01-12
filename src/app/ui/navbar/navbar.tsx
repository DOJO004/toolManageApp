"use client";

import Image from "next/image";
import Link from "next/link";
import ToolStatusMenu from "./toolInfoMenu/menu";
import MachineInfoMenu from "./machineInfoMenu/menu";
import React, { useState } from "react";
import ELabelInfoMenu from "./eLabelInfoMenu/menu";
import UserInfoMenu from "./userInfoMenu/menu";
import navbarItem from "./items";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [clickItemName, setClickItemName] = useState("");

  const handleNavbarMenu = (name: string) => {
    console.log("name", name);
    if (
      name === "dashboard" ||
      name === "領取刀具" ||
      name === "歸還刀具" ||
      name === "修整/報廢"
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
    <div className="md:flex">
      <div className="bg-gray-900 rounded-md md:flex md:justify-center md:h-screen">
        <ul className="flex items-center m-2 md:flex-col">
          <li
            className="flex items-center justify-center w-12 h-12 mx-auto bg-white rounded-full"
            onClick={() => handleNavbarMenu("dashboard")}
          >
            <Link href="/tool-manager/dashboard">
              <Image src="/logo.png" alt="logo image" width={30} height={30} />
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
                    width={item.width}
                    height={item.height}
                    className="mx-auto"
                  />
                  <p className="text-center whitespace-nowrap">{item.name}</p>
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
                    width={item.width}
                    height={item.height}
                    className="mx-auto"
                  />
                  <p className="text-sm text-center whitespace-nowrap">
                    {item.name}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div
          className={` transition-all  ease-in-out overflow-hidden ${
            openMenu ? "w-32" : "w-0"
          }`}
        >
          {clickItemName === "刀具資訊" && openMenu && (
            <ToolStatusMenu setOpenMenu={setOpenMenu} />
          )}
          {clickItemName === "設備資訊" && openMenu && (
            <MachineInfoMenu setOpenMenu={setOpenMenu} />
          )}
          {clickItemName === "電子標籤資訊" && openMenu && (
            <ELabelInfoMenu setOpenMenu={setOpenMenu} />
          )}
          {clickItemName === "使用者資訊" && openMenu && (
            <UserInfoMenu setOpenMenu={setOpenMenu} />
          )}
        </div>
      </div>

      {/* mask */}
      <div
        className={` w-screen h-screen bg-black opacity-30 rounded-xl z-10 absolute top-44 md:left-[16.5rem] md:top-0 ${
          openMenu ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Navbar;
