import Image from "next/image";

interface LinkItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  name: string;
}

interface LinkBtnProps {
  linkItem: LinkItem[];
  navbarToggle: (name: string) => void;
  clickItemName: string;
  openMenu: boolean;
}

const LinkBtn = ({
  linkItem,
  navbarToggle,
  clickItemName,
  openMenu,
}: LinkBtnProps) => {
  return (
    <>
      {linkItem.map((item, index) => (
        <div
          className={`m-2 cursor-pointer rounded-xl hover:bg-indigo-500 ${
            clickItemName === item.name && openMenu ? "bg-indigo-500" : ""
          }`}
          key={item.name}
          onClick={() => navbarToggle(item.name)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="mx-auto"
          />
          <p className="hidden text-sm truncate md:block">{item.name}</p>
        </div>
      ))}
    </>
  );
};

export default LinkBtn;
