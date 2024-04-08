import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetELabelList() {
  try {
    const res = await apiInstance.get("tool_get/GetELabelInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewELabel(eLabel) {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/AddELabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditELabel(eLabel) {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/UpdateELabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteELabel(eLabel) {
  const body = {
    ELabelId: eLabel.Id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/DisabledELabelInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
