"use client";
import { usePathname } from "next/navigation";
import Navbar from "../components/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="w-full p-2 md:flex">
      <Navbar />
      <div className="flex justify-center w-full max-h-screen overflow-auto mx2 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
