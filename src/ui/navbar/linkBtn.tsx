import Image from "next/image";

interface LinkBtnProps {
  linkItem: LinkItem[];
}

interface LinkItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  name: string;
}

const LinkBtn = ({ linkItem }: LinkBtnProps) => {
  return (
    <>
      {linkItem.map((item, index) => (
        <div
          className="m-2 cursor-pointer rounded-md hover:bg-indigo-500"
          key={index}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="mx-auto"
          />
          <p className="hidden md:block ">{item.name}</p>
        </div>
      ))}
    </>
  );
};

export default LinkBtn;
