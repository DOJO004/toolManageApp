import Swal from "sweetalert2";

export function SweetAlert(reqInt: number, title: string) {
  return Swal.fire({
    icon: reqInt === 0 ? "success" : "error",
    title: title,
    text: `code : ${reqInt}`,
    timer: 2000,
    timerProgressBar: true,
  });
}
