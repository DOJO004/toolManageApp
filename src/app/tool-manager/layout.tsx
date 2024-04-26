"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="w-full p-2 md:flex">
      {pathname !== "/tool-manager/login" ? (
        <div className="h-full mx-2">
          <Navbar />
        </div>
      ) : (
        ""
      )}

      <div className="flex justify-center w-full ">{children}</div>
    </div>
  );
};

export default Layout;
