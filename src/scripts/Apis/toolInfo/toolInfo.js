import { apiInstance } from "@/scripts/toolInfoApi";

export async function apiGetToolLoadingLogList(toolSn) {
  if (!toolSn) {
    return;
  }
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // 格式化為 YYYY-MM-DD

    const res = await apiInstance.get(
      `tool_get/GetToolMacLoadingOpLogList?ToolSn=${toolSn}&OpActions=1&StartTime=2023-08-23&EndTime=${formattedDate}`
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
