import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetUserInfoList() {
  try {
    const res = await apiInstance.get("user_get/GetUserInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewUserInfo(userInfo) {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2User_R", "Tag2User_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/AddUserInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditUserInfo(userInfo) {
  const body = {
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2User_R", "Tag2User_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/UpdateUserInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteUserInfo(userInfo) {
  const body = {
    UserId: userInfo.Id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2User_R", "Tag2User_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/DisabledUserInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
