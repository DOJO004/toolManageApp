import { getLoginTime, getUserToken } from "@/scripts/Apis/mainApi";
import { apiInstance } from "@/scripts/toolInfoApi";

// 送修刀具
export async function apiRepairTool(data) {
  const body = {
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
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
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
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
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
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
