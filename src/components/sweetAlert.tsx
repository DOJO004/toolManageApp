import Swal from "sweetalert2";
import { LabelBindItem } from "./returnTool/types";

export default function SweetAlert(reqInt: number, title: string) {
  return Swal.fire({
    icon: reqInt === 0 ? "success" : "error",
    title: title,
    text: `Error Code: ${reqInt}`,
    timer: 1500,
    timerProgressBar: true,
  });
}

export function SweetAlertReturnTool(
  title: string,
  option: { [key: string]: string },
  item: LabelBindItem
) {
  return Swal.fire({
    title: title,
    input: "select",
    inputOptions: option,
    showCancelButton: true,
    confirmButtonText: "確認",
    preConfirm: async (value) => {
      try {
        const res = await fetch(
          "http://10.45.34.126:8082/sync_operate/SyncRestorageToolStockInfo",
          {
            method: "POST",
            body: JSON.stringify({
              RevertorId: value,
              ToolSn: item.ToolSn,
              StorageId: 1,
              ServerId: "string",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error", error);
      }
    },
  });
}

export function SweetAlertReceiveTool(
  title: string,
  select: string,
  option: { [key: string]: string },
  toolSN: string,
  serverId: string
) {
  return Swal.fire({
    title: title,
    input: select,
    inputOptions: option,
    showCancelButton: true,
    confirmButtonText: "確認",
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      try {
        const response = await fetch(
          "http://10.45.34.126:8082/user_operate/RepairToolStockInfo",
          {
            method: "POST",
            body: JSON.stringify({
              ToolSn: toolSN,
              ServerId: serverId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          return Swal.showValidationMessage(`
            ${JSON.stringify(data)}
          `);
        }

        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url,
      });
    }
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
