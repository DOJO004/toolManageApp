import { apiInstance } from "@/scripts/toolInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";

export async function apiGetToolTypeList() {
  try {
    const res = await apiInstance.get("tool_get/GetToolTypeInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewToolType(toolType) {
  const body = {
    ToolTypeInfos: [
      {
        Id: toolType.Id,
        Name: toolType.Name,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("new tool type body =", body);
  try {
    const res = await apiInstance.post("user_operate/AddToolTypeInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditToolType(toolType) {
  const body = {
    Id: toolType.Id,
    ModifyData: {
      Name: toolType.Name,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post("user_operate/ModifyToolTypeInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteToolType(Id) {
  const body = {
    DisabledToolTypeIds: [Id],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledToolTypeInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
