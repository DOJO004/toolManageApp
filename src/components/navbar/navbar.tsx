"use client";

import { getPermission } from "@/scripts/Apis/mainApi";
import { ApiPostUserLogout } from "@/scripts/Apis/userInfo/userInfoApi";
import { AlertColor } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNotice } from "../context/NoticeContext";
import navbarItem from "./items";
import MachineInfoMenu from "./machineInfoMenu/menu";
import ToolStatusMenu from "./toolInfoMenu/menu";
import UserInfoMenu from "./userInfoMenu/menu";

const Navbar = () => {
  const { setShowNotice } = useNotice();
  const [openMenu, setOpenMenu] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [clickItemName, setClickItemName] = useState("");
  const [userName, setUserName] = useState("");

  const handleNavbarMenu = (name: string) => {
    console.log("name = ", name);
    setClickItemName(name);

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
      title: "登出",
      text: "確定要登出嗎?",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    });

    if (confirm.isConfirmed) {
      const res: any = await ApiPostUserLogout();
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
                src="/logo.png"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#FFFFFF"
              className="mx-auto"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <p>登出</p>
          </li>
          <li className="p-2 mt-4 border rounded-md">{userName}</li>
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
