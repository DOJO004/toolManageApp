import { apiInstance } from "../../userInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";

export const ApiUserLogin = async (data) => {
  const body = {
    UserAccount: data.UserAccount,
    UserPwd: data.UserPwd,
  };
  try {
    const res = await apiInstance.post("/user_operate/UserLogin", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiGetUserInfoList = async () => {
  try {
    const res = await apiInstance.get(
      "/account_get/GetUserAccountInfoList?Activated=1"
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPostUserLogout = async () => {
  const body = {
    Token: getUserToken(),
    LoginTime: getLoginTime(),
  };
  try {
    const res = await apiInstance.post("/user_operate/UserLogout", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPostUserInfo = async (data) => {
  console.log("api post user info ", data);
  const body = {
    AccountInfo: {
      UserAccount: data.UserAccount,
      Password: data.Password,
      UserName: data.UserName,
      DepartmentId: data.DepartmentId,
      EmployeeId: data.EmployeeId,
      EMailAddress: data.EMailAddress,
      PermissionIds: data.PermissionIds,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("postUserInfo", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/AddUserAccountInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPatchUserInfo = async (data) => {
  const body = {
    AccountId: data.AccountId,
    ModifyInfo: {
      ModifyPassword: data.ModifyPassword,
      UserName: data.UserName,
      DepartmentId: data.DepartmentId,
      EmployeeId: data.EmployeeId,
      EMailAddress: data.EMailAddress,
      PermissionIds: data.PermissionIds,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("patchUserInfo", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyUserAccountInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiDeleteUserInfo = async (id) => {
  const body = {
    AccountId: id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("deleteUserInfo", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/DisabledUserAccountInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiResetPassword = async (data) => {
  const body = {
    AccountId: data.AccountId,
    NewPwd: data.NewPwd,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("resetPassword", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/SetNewUserPassword",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
