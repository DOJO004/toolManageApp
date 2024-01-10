import MenuItem from "./menuItem";
interface ELabelInfoMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ELabelInfoMenu = ({ setOpenMenu }: ELabelInfoMenuProps) => {
  const eLabelLinkItem = [
    {
      id: "1",
      href: "/tool-manager/elabel-info",
      src: "/barcode.png",
      alt: "overView",
      text: "電子標籤列表",
    },
    {
      id: "2",
      href: "/tool-manager/elabel-info/bind-tool",
      src: "/binding.png",
      alt: "binding",
      text: "綁定刀具",
    },
  ];
  return (
    <div className="flex justify-center md:flex-col">
      <div className="flex md:block">
        <MenuItem eLabelLinkItems={eLabelLinkItem} setOpenMenu={setOpenMenu} />
      </div>
    </div>
  );
};

export default ELabelInfoMenu;
