"use client";
import { NoticeProvider, useNotice } from "@/components/context/NoticeContext";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import Navbar from "../../../components/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { showNotice, setShowNotice } = useNotice();

  useEffect(() => {
    if (showNotice.show) {
      const timer = setTimeout(() => {
        setShowNotice((prev) => ({ ...prev, show: false }));
      }, 3000);
    }
  }, [showNotice, setShowNotice]);
  return (
    <div className="w-full md:flex">
      <Navbar />
      <div className="relative flex justify-center w-full h-full px-2 overflow-auto bg-gray-700 rounded-md ">
        <div className="fixed z-10 top-5 right-5 ">
          <div
            className={`transition-all overflow-hidden duration-300 ease-in-out ${showNotice.show ? "h-12" : "h-0"}`}
          >
            <Alert
              variant="filled"
              onClose={() => {
                setShowNotice({ ...showNotice, show: false });
              }}
              severity={showNotice.type}
            >
              {showNotice.messages}
            </Alert>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NoticeProvider>
      <Layout>{children}</Layout>
    </NoticeProvider>
  );
};

export default LayoutWithProvider;
