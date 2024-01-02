import MenuLinkBtn from "./menuLinkBtn";
const MachineInfoMenu = () => {
  const menuItem = [
    {
      src: "/types.png",
      alt: "toolTypes",
      name: "產線類型",
      path: "/tool-manager/machine-info/product-line/",
    },
    {
      src: "/types.png",
      alt: "toolSpec",
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
      <MenuLinkBtn menuItem={menuItem} />
    </div>
  );
};
export default MachineInfoMenu;
