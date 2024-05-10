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
    RevertorId: data.RevertorId,
    LToolCode: data.LToolCode,
    StorageId: data.StorageId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
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
