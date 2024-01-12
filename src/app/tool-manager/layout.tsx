"use client";
import { usePathname } from "next/navigation";
import Navbar from "../ui/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="m-2 md:flex md:justify-center md:h-[1080px]">
      {pathname !== "/tool-manager/login" ? (
        <div className="h-full m-2">
          <Navbar />
        </div>
      ) : (
        ""
      )}

      <div className="w-full h-full m-2">{children}</div>
    </div>
  );
};

export default Layout;
