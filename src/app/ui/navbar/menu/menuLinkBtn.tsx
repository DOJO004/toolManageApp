import Image from "next/image";

interface MenuItem {
  src: string;
  alt: string;
  name: string;
}

interface MenuItemProps {
  menuItem: MenuItem[];
}

const MenuLinkBtn = ({ menuItem }: MenuItemProps) => {
  return (
    <>
      <div className=" flex md:block">
        {menuItem.map((item, index) => (
          <div key={index} className="m-2 md:flex">
            <Image
              src={item.src}
              alt={item.alt}
              width={30}
              height={30}
              className="mx-2"
            />
            <p className="hidden md:block">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuLinkBtn;
