"use client";
import { usePathname } from "next/navigation";
import Navbar from "../ui/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="w-full m-2 md:flex">
      {pathname !== "/tool-manager/login" ? (
        <div className="h-full m-2">
          <Navbar />
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-center w-full mt-2">{children}</div>
    </div>
  );
};

export default Layout;
