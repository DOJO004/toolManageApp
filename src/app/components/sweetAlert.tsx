import Swal from "sweetalert2";

export default function SweetAlert(reqInt: number, title: string) {
  return Swal.fire({
    icon: reqInt === 0 ? "success" : "error",
    title: title,
    timer: 1500,
    timerProgressBar: true,
  });
}
