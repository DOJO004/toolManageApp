import React from "react";
import MenuLinkBtn from "./menuLinkBtn";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  const menuItem = [
    {
      src: "/types.png",
      alt: "toolTypes",
      name: "刀具類型",
      path: "/tool-manager/tool-info/tool-type/",
    },
    {
      src: "/spec.png",
      alt: "toolSpec",
      name: "刀具規格",
      path: "/tool-manager/tool-info/tool-spec/",
    },
    {
      src: "/stock.png",
      alt: "toolStocks",
      name: "刀具庫存",
      path: "/tool-manager/tool-info/tool-stock/",
    },
    {
      src: "/overView.png",
      alt: "overView",
      name: "總覽",
      path: "/tool-manager/tool-info/",
    },
  ];
  return (
    <div className="flex justify-center md:flex-col">
      <MenuLinkBtn menuItem={menuItem} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default ToolStatusMenu;
