import Link from "next/link";
import Image from "next/image";
interface ELabelLinkItem {
  id: string;
  href: string;
  src: string;
  alt: string;
  text: string;
}
interface MenuItemProps {
  eLabelLinkItems: ELabelLinkItem[];
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItem = ({ eLabelLinkItems, setOpenMenu }: MenuItemProps) => {
  return (
    <>
      {eLabelLinkItems.map((item, index) => (
        <Link
          key={item.id}
          href={item.href}
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
          <div className="hidden truncate md:block">{item.text}</div>
        </Link>
      ))}
    </>
  );
};
export default MenuItem;
