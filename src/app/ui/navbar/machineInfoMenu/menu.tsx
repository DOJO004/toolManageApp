import Image from "next/image";
import Link from "next/link";

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
    <div className="grid items-center grid-cols-4 gap-2 md:block">
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
            className="mx-auto md:mx-2"
          />
          <p className="mt-1 text-xs text-center">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
export default MachineInfoMenu;
