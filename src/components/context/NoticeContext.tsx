import { AlertColor } from "@mui/material/Alert";
import React, { ReactNode, createContext, useContext, useState } from "react";

type NoticeContextType = {
  showNotice: {
    type: AlertColor;
    show: boolean;
    messages: string;
  };
  setShowNotice: React.Dispatch<
    React.SetStateAction<{
      type: AlertColor;
      show: boolean;
      messages: string;
    }>
  >;
};

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) {
    throw new Error("useNotice must be used within a NoticeProvider");
  }
  return context;
};

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const [showNotice, setShowNotice] = useState<{
    type: AlertColor;
    show: boolean;
    messages: string;
  }>({
    type: "info",
    show: false,
    messages: "",
  });

  return (
    <NoticeContext.Provider value={{ showNotice, setShowNotice }}>
      {children}
    </NoticeContext.Provider>
  );
};
