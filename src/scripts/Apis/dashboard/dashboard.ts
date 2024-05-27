import { MachineStatusItem } from "@/components/machineInfo/types";
import { apiInstance } from "@/scripts/machineInfoApi";

// 定义接口来描述响应的数据结构
interface MachineStatusInfo {
  MachineStatusList: MachineStatusItem[];
  ReqInt: number;
}

// 定义完整的响应数据结构
interface ApiResponse {
  RC: string;
  Values: MachineStatusInfo;
}

// 异步函数来获取设备状态列表
export async function apiGetMachineStatusList(): Promise<MachineStatusItem[]> {
  try {
    // 发起 GET 请求并指定响应的数据类型
    const res = await apiInstance.get<ApiResponse>(
      `/machine_get/GetMachineStatusInfoList`
    );

    // 解构响应数据中的 Values 属性
    const { Values } = res.data;

    // 检查 Values 是否存在以及 ReqInt 的值是否为 0
    if (!Values || Values.ReqInt !== 0) {
      console.log(`ReqInt = ${Values?.ReqInt}`);
      return [];
    }

    // 返回 MachineStatusList 数组
    return Values.MachineStatusList;
  } catch (error) {
    // 捕获并记录错误
    console.error("Error", error);
    return [];
  }
}
