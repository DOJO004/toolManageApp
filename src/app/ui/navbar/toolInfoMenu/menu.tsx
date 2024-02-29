import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ToolStatusMenuProps {
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolStatusMenu = ({ setOpenMenu }: ToolStatusMenuProps) => {
  const Item = [
    {
      src: "/types.png",
      alt: "toolTypes",
      name: "刀具類型",
      path: "/tool-manager/tool-info/tool-type/",
    },
    {
      src: "/spec.png",
      alt: "toolSpec",
      name: "刀具規格",
      path: "/tool-manager/tool-info/tool-spec/",
    },
    {
      src: "/stock.png",
      alt: "toolStocks",
      name: "刀具庫存",
      path: "/tool-manager/tool-info/tool-stock/",
    },
    {
      src: "/overView.png",
      alt: "overView",
      name: "總覽",
      path: "/tool-manager/tool-info/",
    },
  ];
  return (
    <div className="grid items-center grid-cols-4 gap-2 md:block">
      {Item.map((item, index) => (
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
            className="mx-auto md:mx-2"
          />
          <p className="mt-1 text-xs text-center">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default ToolStatusMenu;
