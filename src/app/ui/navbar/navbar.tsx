"use client";

import Image from "next/image";
import LinkBtn from "./linkBtn";
import Menu from "./menu/menu";
import { useState } from "react";
import User from "./user";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navbarToggle = () => {
    setOpenMenu(!openMenu);
  };

  const linkItem = [
    {
      src: "/returnTool.png",
      alt: "returnTool",
      width: 30,
      height: 30,
      name: "歸還刀具",
    },
    {
      src: "/receiveTool.png",
      alt: "receiveTool",
      width: 30,
      height: 30,
      name: "領取刀具",
    },
    {
      src: "/repairAndScrap.png",
      alt: "repairAndScrap",
      width: 30,
      height: 30,
      name: "修整/報廢",
    },
    {
      src: "/toolInfo.png",
      alt: "toolInfo",
      width: 30,
      height: 30,
      name: "刀具資訊",
    },
    {
      src: "/machineInfo.png",
      alt: "machineInfo",
      width: 30,
      height: 30,
      name: "設備資訊",
    },
    {
      src: "/elabelInfo.png",
      alt: "elabelInfo",
      width: 30,
      height: 30,
      name: "電子標籤資訊",
    },
    {
      src: "/userInfo.png",
      alt: "userInfo",
      width: 30,
      height: 30,
      name: "使用者資訊",
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
          <LinkBtn linkItem={linkItem} navbarToggle={navbarToggle} />
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
        <Menu />
      </div>
      {/* mask */}
      <div
        className={` w-screen h-screen bg-green-500 opacity-30 absolute top-48 md:left-64 md:top-0 ${
          openMenu ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Navbar;
