import {
  getLoginTime,
  getPermission,
  getUserToken,
} from "@/scripts/Apis/mainApi";
import { apiInstance } from "@/scripts/toolInfoApi";

// 送修刀具
export async function apiRepairTool(data) {
  const body = {
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("repair tool body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/RepairToolStockInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

//報廢刀具
export async function apiScrapTool(data) {
  const body = {
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("scrap tool body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/ScrapToolStockInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 送修完畢重新入庫
export async function apiRestockTool(data) {
  const body = {
    RevertorId: data.RevertorId,
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/RestorageToolStockInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
