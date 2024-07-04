"use client";
import { LangContext } from "@/app/[lang]/layout";
import { useContext, useState } from "react";
import MenuLinkBtn from "./menuLinkBtn";
interface MachineInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const MachineInfoMenu = ({ setOpenMenu }: MachineInfoMenuProps) => {
  const dict = useContext(LangContext);
  const [showMenuIndex, setShowMenuIndex] = useState(0);

  const handleShowMenuIndex = (index: number) => {
    setShowMenuIndex(index);
  };
  const menuItem = [
    {
      src: "/images/icons/list.svg",
      alt: "overView",
      name: dict?.navbar.machine_info.submenu.overview,
      path: "/tool-manager/machine-info/",
    },
    {
      src: "/images/icons/productLIne.svg",
      alt: "productLineTypes",
      name: dict?.navbar.machine_info.submenu.product_line,
      path: "/tool-manager/machine-info/product-line/",
    },
    {
      src: "/images/icons/machineType.svg",
      alt: "machineTypes",
      name: dict?.navbar.machine_info.submenu.machine_type,
      path: "/tool-manager/machine-info/machine-type/",
    },
    {
      src: "/images/icons/machineSpec.svg",
      alt: "machineSpec",
      name: dict?.navbar.machine_info.submenu.machine_spec,
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
