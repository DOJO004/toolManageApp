import { apiInstance } from "@/scripts/eLabelInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";

export async function apiGetBindLabelList() {
  try {
    const res = await apiInstance.get("/label_get/GetLabelToolBindInfoList?ActivateStatus=1");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteBindLabel(data) {
  const body = {
    RevertorId: data.RevertorId,
    LToolCode: data.LToolCode,
    StorageId: Number(data.StorageId),
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("delete bind label body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/DisableLabelBindInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
