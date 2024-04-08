import { apiInstance } from "@/scripts/toolInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetToolStockList() {
  try {
    const res = await apiInstance.get("tool_get/GetToolStockInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewToolStock(toolStock) {
  const body = {
    ToolStockInfos: [
      {
        ToolSpecId: toolStock.ToolSpecId,
        Qty: toolStock.Qty,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/AddToolStockInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteToolStock(toolStock) {
  const body = {
    ToolStockId: toolStock.Id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledToolStockInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
