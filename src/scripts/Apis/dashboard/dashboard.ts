import { MachineStatusItem } from "@/components/machineInfo/types";
import { apiInstance } from "@/scripts/Apis/machineInfoApi";

interface MachineStatusInfo {
  MachineStatusList: MachineStatusItem[];
  ReqInt: number;
}

interface ApiResponse {
  RC: string;
  Values: MachineStatusInfo;
}

export async function apiGetMachineStatusList(): Promise<MachineStatusItem[]> {
  try {
    const res = await apiInstance.get<ApiResponse>(
      `/machine_get/GetMachineStatusInfoList`
    );
    console.log("apiGetMachineStatusList", res);

    const { Values } = res.data;

    if (!Values || Values.ReqInt !== 0) {
      console.log(`ReqInt = ${Values?.ReqInt}`);
      return [];
    }

    return Values.MachineStatusList;
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}
