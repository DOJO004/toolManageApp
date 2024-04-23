import { apiInstance } from "../../userInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export const ApiGetDepartmentList = async () => {
  try {
    const res = await apiInstance.get("/account_get/GetDepartmentInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPostDepartment = async (data) => {
  const body = {
    DepartmentInfos: [
      {
        DepartmentId: data.DepartmentId,
        Name: data.Name,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("post department body", body);
  try {
    const res = await apiInstance.post("/user_operate/AddDepartmentInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiPatchDepartment = async (data) => {
  const body = {
    DepartmentId: data.DepartmentId,
    ModifyInfo: {
      Name: data.Name,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("patch department body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyDepartmentInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};

export const ApiDeleteDepartment = async (id) => {
  const body = {
    DepartmentId: id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("delete department body", body);
  try {
    const res = await apiInstance.post(
      "/user_operate/DisabledDepartmentInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
