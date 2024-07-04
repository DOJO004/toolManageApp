import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import { apiInstance } from "../userInfoApi";
import {
  BaseResponse,
  EditDepartmentItem,
  EditPermissionItemInfo,
  EditUserInfo,
  GetDepartmentListResponse,
  GetPermissionInfoListResponse,
  GetUserInfoListResponse,
  NewDepartmentItem,
  NewPermissionItemInfo,
  NewUserInfo,
  ResetUserPasswordInfo,
  UserLoginInfo,
} from "./types";

// userLogin
export const ApiUserLogin = async (data: UserLoginInfo) => {
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
export const apiGetUserInfoList = async () => {
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

export const apiPostUserInfo = async (data: NewUserInfo) => {
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

export const apiPatchUserInfo = async (data: EditUserInfo) => {
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

export const apiDeleteUserInfo = async (userInfo: EditUserInfo) => {
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

export const apiResetPassword = async (data: ResetUserPasswordInfo) => {
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
export const apiGetDepartmentList = async () => {
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

export const apiPostDepartment = async (data: NewDepartmentItem) => {
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

export const apiPatchDepartment = async (data: EditDepartmentItem) => {
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

export const apiDeleteDepartment = async (data: EditDepartmentItem) => {
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

export const apiNewPermissionsInfo = async (data: NewPermissionItemInfo) => {
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
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/AddPermissionInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const apiEditPermissionsInfo = async (data: EditPermissionItemInfo) => {
  const body = {
    PermissionId: data.PermissionId,
    ModifyInfo: {
      Name: data.Name,
      PermissionType: data.PermissionType,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyPermissionInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const apiDeletePermissionsInfo = async (
  data: EditPermissionItemInfo
) => {
  const body = {
    PermissionId: data.PermissionId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledPermissionInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
