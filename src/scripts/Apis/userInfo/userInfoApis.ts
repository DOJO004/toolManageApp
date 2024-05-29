import { apiInstance } from "../../userInfoApi";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  EditDepartmentItem,
  EditUserInfo,
  GetDepartmentListResponse,
  GetPermissionInfoListResponse,
  GetUserInfoListResponse,
  NewDepartmentItem,
  NewUserInfo,
  ResetUserPasswordInfo,
} from "./types";

// userLogin
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

// userLogout
export const ApiUserLogout = async () => {
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

// userInfo
export const ApiGetUserInfoList = async () => {
  try {
    const res = await apiInstance.get<GetUserInfoListResponse>(
      "/account_get/GetUserAccountInfoList?Activated=1"
    );
    if (res.data.Values.ReqInt === 0) {
      return res.data.Values.UserAccountList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export const ApiPostUserInfo = async (data: NewUserInfo) => {
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
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/AddUserAccountInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPatchUserInfo = async (data: EditUserInfo) => {
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
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyUserAccountInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiDeleteUserInfo = async (userInfo: EditUserInfo) => {
  const body = {
    AccountId: userInfo.AccountId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("body = ", body);

  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledUserAccountInfo",
      body
    );
    console.log("delete user info", res);

    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiResetPassword = async (data: ResetUserPasswordInfo) => {
  const body = {
    AccountId: data.AccountId,
    NewPwd: data.NewPwd,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("resetPassword", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/SetNewUserPassword",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

// department
export const ApiGetDepartmentList = async () => {
  try {
    const res = await apiInstance.get<GetDepartmentListResponse>(
      "/account_get/GetDepartmentInfoList"
    );
    if (res.data.Values.ReqInt === 0) {
      return res.data.Values.DepartmentMenus;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export const ApiPostDepartment = async (data: NewDepartmentItem) => {
  const body = {
    DepartmentInfos: [
      {
        DepartmentId: data.DepartmentId,
        Name: data.Name,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("post department body", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/AddDepartmentInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPatchDepartment = async (data: EditDepartmentItem) => {
  const body = {
    DepartmentId: data.DepartmentId,
    ModifyInfo: {
      Name: data.Name,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyDepartmentInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiDeleteDepartment = async (data: EditDepartmentItem) => {
  const body = {
    DepartmentId: data.DepartmentId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledDepartmentInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

// permissions
export const apiGetPermissionsInfoList = async () => {
  try {
    const res = await apiInstance.get<GetPermissionInfoListResponse>(
      "/account_get/GetPermissionInfoList"
    );
    if (res.data.Values.ReqInt === 0) {
      return res.data.Values.PermissionMenus;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
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
