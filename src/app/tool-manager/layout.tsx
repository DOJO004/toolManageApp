"use client";
import Navbar from "../../components/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full p-2 md:flex">
      <Navbar />
      <div className="flex justify-center w-full h-full p-2 bg-gray-700 rounded-md ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
