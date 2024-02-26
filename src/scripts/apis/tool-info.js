import { apiInstance, getLoginTime, getUserToken } from "./base.js";

// addToolTypeInfo
export const apiAddToolTypeInfo = async (id, name) => {
    const body =
        {
            "UserToken": getUserToken(),
            "LoginTime": getLoginTime(),
            "NeedPermissions": [
                "Tag2Tool_R",
                "Tag2Tool_W"
            ],
            "ToolTypeInfos": [
                {
                    "Id": id,
                    "Name": name
                }
            ]
        }
    try {
      const res = await apiInstance.post("user_operate/AddToolTypeInfo",body);
      return res
    }    
    catch (error) {
        console.error("Error", error);
    }
};

// modifyToolTypeInfo
export const apiModifyToolTypeInfo = async (id, name) =>{
    const body = {
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
            "Tag2Tool_R",
            "Tag2Tool_W"
        ],
        "Id": id,
        "ModifyData": {
            "Name": name
        }
    }
    console.log(body);
    try{
        const res = await apiInstance.post("user_operate/ModifyToolTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// disabledToolTypeInfo
export const apiDisabledToolTypeInfo = async (id)=>{
    const body={
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ],
        "DisabledToolTypeIDs": [
          id
        ]
      }
    try{
        const res = await apiInstance.post("user_operate/DisabledToolTypeInfo",body)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

// getToolTypeList 
export const apiGetToolTypeInFoList = async () => {
    try{
         const res = await apiInstance.get("/tool_get/GetToolTypeInfoList")
         return (res)
     }catch(error){
     console.error("Error", error);
     return false
     }
 }