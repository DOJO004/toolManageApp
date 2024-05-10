import { apiInstance } from "@/scripts/eLabelInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

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
    LToolCode: data.LToolCode,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
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
