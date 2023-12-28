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
      width: 40,
      height: 40,
      name: "歸還刀具",
    },
    {
      src: "/receiveTool.png",
      alt: "receiveTool",
      width: 40,
      height: 40,
      name: "領取刀具",
    },
    {
      src: "/repairAndScrap.png",
      alt: "repairAndScrap",
      width: 40,
      height: 40,
      name: "修整/報廢",
    },
    {
      src: "/toolInfo.png",
      alt: "toolInfo",
      width: 40,
      height: 40,
      name: "刀具資訊",
    },
    {
      src: "/machineInfo.png",
      alt: "machineInfo",
      width: 40,
      height: 40,
      name: "設備資訊",
    },
    {
      src: "/elabelInfo.png",
      alt: "elabelInfo",
      width: 40,
      height: 40,
      name: "電子標籤資訊",
    },
    {
      src: "/userInfo.png",
      alt: "userInfo",
      width: 40,
      height: 40,
      name: "使用者資訊",
    },
  ];

  return (
    <div className="md:max-w-28 bg-gray-500 text-center relative h-screen">
      <div className="mb-4 flex justify-center md:justify-start">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={50}
          height={50}
          className="bg-white rounded-full mx-auto mt-2"
        />
      </div>
      <div className="flex justify-center md:flex-col ">
        <LinkBtn linkItem={linkItem} navbarToggle={navbarToggle} />
      </div>
      <div className="hidden md:flex md:flex-col md:mt-64">
        <User />
      </div>
      <div
        className={`${
          openMenu ? "block" : "hidden"
        } md:absolute md:top-0 md:-right-32`}
      >
        <Menu />
      </div>
      {/* mask */}
      <div
        className={` w-screen h-screen bg-green-500 opacity-30 absolute top-44 md:left-72 md:top-0 ${
          openMenu ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Navbar;
