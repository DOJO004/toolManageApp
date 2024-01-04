"use client";

import Image from "next/image";
import LinkBtn from "./linkBtn";
import ToolStatusMenu from "./toolInfoMenu/menu";
import MachineInfoMenu from "./machineInfoMenu/menu";
import { useState } from "react";
import User from "./user";
import ElabelInfoMenu from "./elabelInfoMenu/menu";
import UserInfoMenu from "./userInfoMenu/menu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [clickItemName, setClickItemName] = useState("");

  const navbarToggle = (name: string) => {
    if (clickItemName != name) {
      setOpenMenu(true);
    } else {
      setOpenMenu(!openMenu);
    }
    setClickItemName(name);
  };
  const linkItem = [
    {
      src: "/returnTool.png",
      alt: "returnTool",
      width: 30,
      height: 30,
      name: "歸還刀具",
      path: "/tool-manager/return-tool",
    },
    {
      src: "/receiveTool.png",
      alt: "receiveTool",
      width: 30,
      height: 30,
      name: "領取刀具",
      path: "/tool-manager/receive-tool",
    },
    {
      src: "/repairAndScrap.png",
      alt: "repairAndScrap",
      width: 30,
      height: 30,
      name: "修整/報廢",
      path: "repair-and-scrap",
    },
    {
      src: "/toolInfo.png",
      alt: "toolInfo",
      width: 30,
      height: 30,
      name: "刀具資訊",
      path: "/tool-manager/tool-info",
    },
    {
      src: "/machineInfo.png",
      alt: "machineInfo",
      width: 30,
      height: 30,
      name: "設備資訊",
      path: "/tool-manager/machine-info",
    },
    {
      src: "/elabelInfo.png",
      alt: "elabelInfo",
      width: 30,
      height: 30,
      name: "電子標籤資訊",
      path: "/tool-manager/elabel-info",
    },
    {
      src: "/userInfo.png",
      alt: "userInfo",
      width: 30,
      height: 30,
      name: "使用者資訊",
      path: "/tool-manager/user-info",
    },
  ];

  return (
    <div className="md:flex">
      <div className="relative text-center bg-gray-900 rounded-xl md:max-w-28 md:h-screen">
        <div className="flex justify-center mb-4 md:justify-start">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mt-2 bg-white rounded-full"
          />
        </div>
        <div className="flex justify-center md:flex-col ">
          <LinkBtn
            linkItem={linkItem}
            navbarToggle={navbarToggle}
            clickItemName={clickItemName}
            openMenu={openMenu}
          />
        </div>
        <div className="hidden md:flex md:flex-col md:mt-4">
          <User />
        </div>
      </div>
      <div
        className={`${
          openMenu ? "block" : "hidden"
        } bg-gray-900 rounded-xl min-w-32`}
      >
        {clickItemName === "刀具資訊" && (
          <ToolStatusMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === "設備資訊" && (
          <MachineInfoMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === "電子標籤資訊" && (
          <ElabelInfoMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === "使用者資訊" && (
          <UserInfoMenu setOpenMenu={setOpenMenu} />
        )}
      </div>
      {/* mask */}
      <div
        className={` w-screen h-screen bg-black opacity-30 rounded-xl z-10 absolute top-44 md:left-64 md:top-0 ${
          openMenu ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Navbar;
