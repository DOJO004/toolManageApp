"use client";

import { LangContext } from "@/app/[lang]/layout";
import { getPermission } from "@/scripts/Apis/mainApi";
import { ApiUserLogout } from "@/scripts/Apis/userInfo/userInfoApis";
import { AlertColor } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNotice } from "../context/NoticeContext";
import DefaultSkeleton from "../skeletons/default";
import MachineInfoMenu from "./machineInfoMenu/menu";
import ToolStatusMenu from "./toolInfoMenu/menu";
import UserInfoMenu from "./userInfoMenu/menu";

const Navbar = () => {
  const dict = useContext(LangContext);

  const { setShowNotice } = useNotice();
  const [openMenu, setOpenMenu] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [clickItemName, setClickItemName] = useState("");
  const [userName, setUserName] = useState("");

  const navbarItem = [
    {
      src: "/images/icons/redo.svg",
      alt: "receive tool image",
      width: 30,
      height: 30,
      name: dict?.navbar.receive_tool.title,
      path: "/tool-manager/receive-tool",
    },
    {
      src: "/images/icons/undo.svg",
      alt: "receive tool image",
      width: 30,
      height: 30,
      name: dict?.navbar.return_tool.title,
      path: "/tool-manager/return-tool",
    },
    {
      src: "/images/icons/repair.svg",
      alt: "repair svg ",
      width: 30,
      height: 30,
      name: dict?.navbar.repair_and_scrap.title,
      path: "/tool-manager/repair-and-scrap",
    },
    {
      src: "/images/icons/tool.svg",
      alt: "tool svg",
      width: 30,
      height: 30,
      name: dict?.navbar.tool_info.title,
      path: "/tool-manager/tool-info",
    },
    {
      src: "/images/icons/machine.svg",
      alt: "machine svg",
      width: 30,
      height: 30,
      name: dict?.navbar.machine_info.title,
      path: "/tool-manager/machine-info",
    },
    {
      src: "/images/icons/label.svg",
      alt: "label svg",
      width: 30,
      height: 30,
      name: dict?.navbar.label_info.title,
      path: "/tool-manager/elabel-info",
    },
    {
      src: "/images/icons/user.svg",
      alt: "user info image",
      width: 30,
      height: 30,
      name: dict?.navbar.user_info.title,
      path: "/tool-manager/user-info",
    },
    {
      src: "/images/icons/setting.svg",
      alt: "notification icon",
      width: 30,
      height: 30,
      name: dict?.navbar.setting.title,
      path: "/tool-manager/setting",
    },
  ];

  const handleNavbarMenu = (name: string) => {
    console.log("name = ", name);
    const hasSubMenuName = [
      dict?.navbar.tool_info.title,
      dict?.navbar.machine_info.title,
      dict?.navbar.user_info.title,
    ];
    setClickItemName(name);

    if (!hasSubMenuName.includes(name)) {
      setOpenMenu(false);
      return;
    }

    if (clickItemName != name) {
      setOpenMenu(true);
    } else {
      setOpenMenu(!openMenu);
    }
  };

  const handleCheckAdmin = () => {
    const admin = getPermission();
    console.log("admin", admin);

    if (admin && admin === "SuperAdmin") {
      setCheckAdmin(true);
    }
  };

  // 登出
  const logout = async () => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: dict?.navbar.logout.title,
      text: dict?.navbar.logout.description,
      showCancelButton: true,
      confirmButtonText: dict?.navbar.logout.confirm,
      cancelButtonText: dict?.navbar.logout.cancel,
    });

    if (confirm.isConfirmed) {
      const res: any = await ApiUserLogout();
      const reqInt = res?.data?.Values?.ReqInt;
      if (reqInt === 0) {
        window.location.href = "/";
        deleteCookies(["userToken", "loginTime", "permission"]);
        handleNotice("success", true, "登出成功");
      } else {
        handleNotice("error", true, `登出失敗，errorCode = ${reqInt}`);
      }
    }
  };

  // 清除 cookie
  const deleteCookies = (names: string[]) => {
    names.map((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  const handleNotice = (type: AlertColor, show: boolean, messages: string) => {
    setShowNotice({
      type: type,
      show: show,
      messages: messages,
    });
  };

  // get user name
  const getUserName = () => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const userNameCookie = cookies.find((cookie) =>
      cookie.startsWith("userName=")
    );
    const userName = userNameCookie?.split("=")[1];
    if (!userName) {
      return;
    }
    setUserName(userName);
  };

  useEffect(() => {
    handleCheckAdmin();
    getUserName();
  }, []);

  if (!dict) return <DefaultSkeleton />;

  return (
    <div className="sticky h-full bg-gray-900 rounded-md top-2 md:flex">
      <div className="overflow-auto md:flex md:justify-center">
        <ul className="flex items-center m-2 md:flex-col">
          <li
            onClick={() => handleNavbarMenu("dashboard")}
            className={`flex items-center justify-center w-full bg-gray-300 rounded-md hover:bg-gray-50 ${clickItemName === "dashboard" ? "bg-gray-50" : ""}`}
          >
            <Link href="/tool-manager/dashboard" className="w-full">
              <Image
                src="/images/logo.png"
                alt="logo image"
                loader={({ src, width }) => `${src}?w=${width}`}
                width={100}
                height={100}
                className="mx-auto"
              />
            </Link>
          </li>
          {navbarItem.map((item, index) => (
            <li
              className={`w-auto p-1 my-2 rounded-md cursor-pointer hover:bg-indigo-500 ${item.name === "使用者資訊" && !checkAdmin ? "hidden" : ""} ${item.name === clickItemName ? "bg-indigo-600" : ""}`}
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
          <li
            className="flex flex-col items-center justify-center w-full rounded-md cursor-pointer hover:bg-indigo-500"
            onClick={() => logout()}
          >
            <Image
              src="/images/icons/logout.svg"
              alt="logout image"
              width={30}
              height={30}
              className="mx-auto"
            />
            <p>{dict.navbar.logout.title}</p>
          </li>
          <li className="p-2 mt-4 border rounded-md">{userName}</li>
        </ul>
      </div>
      <div
        className={` transition-all ease-in-out relative duration-300 overflow-hidden ${
          openMenu ? "w-full md:w-32 " : "w-0"
        }`}
      >
        {clickItemName === dict.navbar.tool_info.title && openMenu && (
          <ToolStatusMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === dict.navbar.machine_info.title && openMenu && (
          <MachineInfoMenu setOpenMenu={setOpenMenu} />
        )}
        {clickItemName === dict.navbar.user_info.title && openMenu && (
          <UserInfoMenu setOpenMenu={setOpenMenu} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
