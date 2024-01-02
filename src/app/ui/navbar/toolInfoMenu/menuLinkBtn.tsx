import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  src: string;
  alt: string;
  name: string;
  path: string;
}

interface MenuItemProps {
  menuItem: MenuItem[];
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuLinkBtn = ({ menuItem, setOpenMenu }: MenuItemProps) => {
  return (
    <>
      <div className="flex md:block">
        {menuItem.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="m-2 cursor-pointer md:flex hover:bg-indigo-500"
            onClick={() => setOpenMenu(false)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={30}
              height={30}
              className="mr-2"
            />
            <p className="hidden truncate md:block">{item.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuLinkBtn;
