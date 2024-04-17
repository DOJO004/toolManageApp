import { apiInstance } from "@/scripts/toolInfoApi";
import { getLoginTime, getUserToken } from "../mainApi";

export async function apiGetToolSpecList() {
  try {
    const res = await apiInstance.get("tool_get/GetToolSpecInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiGetToolSpec(toolSpecId) {
  try {
    const res = await apiInstance.get(
      `tool_get/GetToolSpecInfoList?ToolSpecId=${toolSpecId}`
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
export async function apiNewToolSpec(toolSpec) {
  const body = {
    ToolsInfo: {
      ToolSpecId: toolSpec.ToolSpecId,
      Name: toolSpec.Name,
      ToolTypeId: toolSpec.ToolTypeData.Id,
      SafetyStock: toolSpec.SafetyStock,
      SpecData: {
        BladeDiameter: toolSpec.SpecData.BladeDiameter,
        BladeHeight: toolSpec.SpecData.BladeHeight,
        TotalLength: toolSpec.SpecData.TotalLength,
        HandleDiameter: toolSpec.SpecData.HandleDiameter,
      },
      MaxLife: {
        ProcessCnt: toolSpec.MaxLife.ProcessCnt,
        ProcessTime: toolSpec.MaxLife.ProcessTime,
        ProcessLength: toolSpec.MaxLife.ProcessLength,
        RepairCnt: toolSpec.MaxLife.RepairCnt,
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("body", body);
  try {
    const res = await apiInstance.post("user_operate/AddToolSpecInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
export async function apiEditToolSpec(toolSpec) {
  const body = {
    ToolSpecId: toolSpec.ToolSpecId,
    ModifyDatas: {
      Name: toolSpec.ModifyDatas.Name,
      ToolTypeId: toolSpec.ModifyDatas.ToolTypeId,
      SafetyStock: toolSpec.ModifyDatas.SafetyStock,
      SpecData: {
        BladeDiameter: toolSpec.ModifyDatas.SpecData.BladeDiameter,
        BladeHeight: toolSpec.ModifyDatas.SpecData.BladeHeight,
        TotalLength: toolSpec.ModifyDatas.SpecData.TotalLength,
        HandleDiameter: toolSpec.ModifyDatas.SpecData.HandleDiameter,
      },
      MaxLife: {
        ProcessCnt: toolSpec.ModifyDatas.MaxLife.ProcessCnt,
        ProcessTime: toolSpec.ModifyDatas.MaxLife.ProcessTime,
        ProcessLength: toolSpec.ModifyDatas.MaxLife.ProcessLength,
        RepairCnt: toolSpec.ModifyDatas.MaxLife.RepairCnt,
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post("user_operate/ModifyToolSpecInfo", body);
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
export async function apiDeleteToolSpec(id) {
  const body = {
    ToolSpecId: id,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledToolSpecInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
