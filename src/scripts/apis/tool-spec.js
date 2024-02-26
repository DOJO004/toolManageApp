import { apiInstance, getLoginTime, getUserToken } from "./base";

export const apiGetToolSpecList = async () =>{
   try {
    const res = await apiInstance.get("tool_get/GetToolSpecInfoList")
    return res
   } catch{
    console.error("Error", error);
    return error
   }
}

export const apiAddToolSpecInfo = async (toolSpec) =>{
    const body = {
        "ToolsInfo": {
          "ToolSpecId": toolSpec.ToolSpecId,
          "Name": toolSpec.Name,
          "ToolTypeId": toolSpec.ToolTypeId,
          "SafetyStock": toolSpec.SafetyStock,
          "SpecData": {
            "BladeDiameter": toolSpec.BladeDiameter,
            "BladeHeight": toolSpec.BladeHeight,
            "TotalLength": toolSpec.TotalLength,
            "HandleDiameter": toolSpec.HandleDiameter
          },
          "MaxLife": {
            "ProcessCnt": toolSpec.ProcessCnt,
            "ProcessTime": toolSpec.ProcessTime,
            "ProcessLength": toolSpec.ProcessLength,
            "RepairCnt": toolSpec.RepairCnt
          }
        },
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
    try{
        const res =  await apiInstance.post("user_operate/AddToolSpecInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
    
}
export const apiEditToolSpecInfo = async (item) =>{
    const body = {
      "ToolSpecId": item.ToolSpecId,
      "ModifyDatas": {
        "Name": item.Name,
        "ToolTypeId": item.ToolTypeId,
        "SafetyStock": item.SafetyStock,
        "SpecData": {
          "BladeDiameter": item.BladeDiameter,
          "BladeHeight": item.BladeHeight,
          "TotalLength": item.TotalLength,
          "HandleDiameter": item.HandleDiameter
        },
        "MaxLife": {
          "ProcessCnt": item.ProcessCnt,
          "ProcessTime": item.ProcessTime,
          "ProcessLength": item.ProcessLength,
          "RepairCnt": item.RepairCnt
        }
      },
      "UserToken": getUserToken(),
      "LoginTime": getLoginTime(),
      "NeedPermissions": [
        "Tag2Tool_R",
        "Tag2Tool_W"
      ]
    }
    try{
        const res =  await apiInstance.post("user_operate/ModifyToolSpecInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
    return
}
export const  apiDisableToolSpecInfo = async (id) =>{
  const body={
    "ToolSpecId": id,
    "UserToken": getUserToken(),
    "LoginTime": getLoginTime(),
    "NeedPermissions": [
      "Tag2Tool_R",
      "Tag2Tool_W"
    ]
  }
  try{
    const res = await apiInstance.post("user_operate/DisabledToolSpecInfo", body)
    return res
  }
    
    catch(error){
      console.error(("Error", error));
      return error
    }
  
}
