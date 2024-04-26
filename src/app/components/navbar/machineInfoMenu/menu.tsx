import MenuLinkBtn from "./menuLinkBtn";
interface MachineInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const MachineInfoMenu = ({ setOpenMenu }: MachineInfoMenuProps) => {
  const menuItem = [
    {
      src: "/productLine.png",
      alt: "productLineTypes",
      name: "產線類型",
      path: "/tool-manager/machine-info/product-line/",
    },
    {
      src: "/machineType.png",
      alt: "machineTypes",
      name: "設備類型",
      path: "/tool-manager/machine-info/machine-type/",
    },
    {
      src: "/spec.png",
      alt: "toolStocks",
      name: "設備規格",
      path: "/tool-manager/machine-info/machine-spec/",
    },
    {
      src: "/overView.png",
      alt: "overView",
      name: "總覽",
      path: "/tool-manager/machine-info/",
    },
  ];
  return (
    <div className="flex justify-center md:flex-col">
      <MenuLinkBtn menuItem={menuItem} setOpenMenu={setOpenMenu} />
    </div>
  );
};
export default MachineInfoMenu;
