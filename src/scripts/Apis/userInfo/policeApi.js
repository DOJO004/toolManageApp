import { apiInstance } from "../../userInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export const apiGetPermissionsInfoList = async () => {
  try {
    const res = await apiInstance.get("/account_get/GetPermissionInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const apiNewPermissionsInfo = async (data) => {
  const body = {
    PermissionInfos: [
      {
        PermissionId: data.PermissionId,
        Name: data.Name,
        PermissionType: data.PermissionType,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("new police body", body);
  try {
    const res = await apiInstance.post("/user_operate/AddPermissionInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const apiEditPermissionsInfo = async (data) => {
  const body = {
    PermissionId: data.PermissionId,
    ModifyInfo: {
      Name: data.Name,
      PermissionType: data.PermissionType,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyPermissionInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const apiDeletePermissionsInfo = async (data) => {
  const body = {
    PermissionId: data.PermissionId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/DisabledPermissionInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
