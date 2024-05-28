import { apiInstance } from "@/scripts/toolInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  GetLoadingLogListResponse,
  GetToolTypeListResponse,
  ToolTypeItem,
} from "./type";

export async function apiGetToolLoadingLogList(toolSn: string) {
  if (!toolSn) {
    return;
  }
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // 格式化為 YYYY-MM-DD

    const res = await apiInstance.get<GetLoadingLogListResponse>(
      `http://10.45.34.126:8082/tool_get/GetStockToolTrackOpLogList?ToolSn=${toolSn}&StartTime=2023-08-23&EndTime=${formattedDate}`
    );
    console.log("apiGetToolLoadingLogList", res);

    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.ToolMacLoadingOpsList;
    } else {
      return {};
    }
  } catch (error) {
    console.error("Error", error);
    return {};
  }
}

// toolType
export async function apiGetToolTypeList() {
  try {
    const res = await apiInstance.get<GetToolTypeListResponse>(
      "tool_get/GetToolTypeInfoList"
    );
    console.log("apiGetToolTypeList", res);
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.ToolTypeMenus;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewToolType(toolType: ToolTypeItem) {
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
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/AddToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditToolType(toolType: ToolTypeItem) {
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
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/ModifyToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteToolType(toolType: ToolTypeItem) {
  const body = {
    DisabledToolTypeIds: [toolType.Id],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/DisabledToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
