import MenuLinkBtn from "./menuLinkBtn";
const Menu = () => {
  const menuItem = [
    {
      src: "/edit.png",
      alt: "edit",
      name: "新增/修改",
    },
    {
      src: "/table.png",
      alt: "table",
      name: "庫存",
    },
    {
      src: "/overView.png",
      alt: "overView",
      name: "總覽",
    },
    {
      src: "/messageSearch.png",
      alt: "messageSearch",
      name: "條件過濾",
    },
  ];
  return (
    <div className="flex justify-center md:flex-col">
      <MenuLinkBtn menuItem={menuItem} />
    </div>
  );
};

export default Menu;
