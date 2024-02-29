import { apiInstance, getLoginTime, getUserToken } from "./base.js";

export const apiGetToolStockList = async (page) => {
    try {
        const res = await apiInstance.get(`tool_get/GetToolStockInfoList?PageNo=${page}`)
        return res
    }
    catch(error){
        console.error("Error",error);
        return error
    }
}

export const apiAddToolStock = async (item)=>{
    const body = {
        "ToolStockInfos": [
          {
            "ToolSpecId": item.ToolSpecId,
            "Qty": item.Qty
          }
        ],
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
    try{
        const res = await apiInstance.post("user_operate/AddToolStockInfo", body)
        return res
    }catch(error){
        console.error("Error", error);
        return error
    }
}
