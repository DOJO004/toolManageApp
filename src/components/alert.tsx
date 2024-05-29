"use client"
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";

export default function MuiAlert(reqInt: number, msg: string) {
  const [alertMsg, setAlertMsg] = useState<string>(msg)
  useEffect(() => {
    setTimeout(() => {
      setAlertMsg("")
    }, 3000);
  },[msg])
  return (
    <div className={`transition-all duration-300 ease-in-out ${msg ? "h-12" : "h-0"}`}>
      <Alert severity={reqInt === 0 ? "success" : "error"} onClose={() => { }}>
        {msg}
      </Alert>
    </div>

  );
}
