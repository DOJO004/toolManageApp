import { useNotice } from "@/components/context/NoticeContext";
import { AlertColor } from "@mui/material";

export function useHandleNotice() {
  const { setShowNotice } = useNotice();

  const handleNotice = (
    typeColor: AlertColor,
    show: boolean,
    messages: string
  ) => {
    setShowNotice({
      type: typeColor,
      show: show,
      messages: messages,
    });
  };

  return handleNotice;
}
