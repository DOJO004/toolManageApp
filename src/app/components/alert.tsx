import Alert from "@mui/material/Alert";

export default function MuiAlert(reqInt: number, msg: string) {
  return (
    <Alert severity={reqInt === 0 ? "success" : "error"} onClose={() => {}}>
      {msg}
    </Alert>
  );
}
