"use client";
import { useState } from "react";
import MenuLinkBtn from "./menuLinkBtn";
interface MachineInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const MachineInfoMenu = ({ setOpenMenu }: MachineInfoMenuProps) => {
  const [showMenuIndex, setShowMenuIndex] = useState(0);

  const handleShowMenuIndex = (index: number) => {
    setShowMenuIndex(index);
  };
  const menuItem = [
    {
      src: "/icons/list.svg",
      alt: "overView",
      name: "總覽",
      path: "/tool-manager/machine-info/",
    },
    {
      src: "/icons/productLIne.svg",
      alt: "productLineTypes",
      name: "產線類型",
      path: "/tool-manager/machine-info/product-line/",
    },
    {
      src: "/icons/machineType.svg",
      alt: "machineTypes",
      name: "設備類型",
      path: "/tool-manager/machine-info/machine-type/",
    },
    {
      src: "/icons/machineSpec.svg",
      alt: "toolStocks",
      name: "設備規格",
      path: "/tool-manager/machine-info/machine-spec/",
    },
  ];
  return (
    <div className="flex items-center justify-center md:flex-col">
      <MenuLinkBtn
        menuItem={menuItem}
        setOpenMenu={setOpenMenu}
        showMenuIndex={showMenuIndex}
        handleShowMenuIndex={handleShowMenuIndex}
      />
    </div>
  );
};
export default MachineInfoMenu;
