import Swal from "sweetalert2";

export default function SweetAlert(reqInt: number, title: string) {
  return Swal.fire({
    icon: reqInt === 0 ? "success" : "error",
    title: title,
    text: `Error Code: ${reqInt}`,
    timer: 1500,
    timerProgressBar: true,
  });
}

export function SweetAlertSelect(
  title: string,
  option: { [key: string]: string }
) {
  return Swal.fire({
    title: title,
    input: "select",
    inputOptions: option,
    showCancelButton: true,
    confirmButtonText: "確認",
    preConfirm: async (value) => {
      try {
        const url = console.log("select", value);
      } catch (error) {
        console.error("Error", error);
      }
    },
  });
}
