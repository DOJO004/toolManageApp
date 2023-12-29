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
      <div className="flex md:block">
        {menuItem.map((item, index) => (
          <div
            key={index}
            className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={30}
              height={30}
              className="mr-2"
            />
            <p className="hidden truncate md:block">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuLinkBtn;
