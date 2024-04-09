import { apiInstance } from "@/scripts/machineInfoApi";
// 取得設備狀態列表

export async function apiGetMachineStatusList() {
  try {
    const res = await apiInstance.get("/machine_get/GetMachineStatusInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
