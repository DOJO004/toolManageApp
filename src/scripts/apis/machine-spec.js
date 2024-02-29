import { apiInstance2, getLoginTime, getUserToken } from "./base";

export const apiGetMachineSpecList = async ()=>{
    try{
    const res = await apiInstance2.get("machine_get/GetMachineSpecInfoList")
    return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }
}

export const apiNewMachineSpec = async (item)=>{
    const body ={
        "MachineSpecData": {
          "ProductLineId": item.ProductLineId,
          "MachineTypeId": item.MachineTypeId,
          "SerialNumber": item.SerialNumber,
          "Name": item.Name,
          "MachineIP": item.MachineIP,
          "ReaderId": item.ReaderId,
          "SystemInfo": {
            "Brand": item.Brand,
            "Series": item.Series,
            "MT": item.MT
          },
          "AxisSettingList": [
            {
              "AxisIndex": item.AxisIndex,
              "AxisName": item.AxisName,
              "IsSpindle":item.IsSpindle
            }
          ]
        },
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
    }
    console.log(body);
    try{
        const res = await apiInstance2.post("user_operate/AddMachineSpecInfo", body)
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }
}

export const apiEditMachineSpec = async(item)=>{
    const body ={
        "MachineId": item.MachineId,
        "ModifyData": {
          "ProductLineId": item.ProductLineId,
          "MachineTypeId": item.MachineTypeId,
          "SerialNumber": item.SerialNumber,
          "Name": item.Name,
          "MachineIP": item.MachineIP,
          "ReaderId": item.ReaderId,
          "SystemInfo": {
            "Brand": item.Brand,
            "Series": item.Series,
            "MT": item.MT
          },
          "AxisSettingList": [
            {
              "AxisIndex": item.AxisIndex,
              "AxisName": item.AxisName,
              "IsSpindle": item.IsSpindle
            }
          ]
        },
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
      console.log(body);
    try{
        const res = await apiInstance2.post("user_operate/ModifyMachineSpecInfo", body)
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }     
}

export const apiDisabledMachineSpec = async (id)=>{
    const body={
        "MachineId": id,
        "UserToken": getUserToken(),
        "LoginTime": getLoginTime(),
        "NeedPermissions": [
          "Tag2Tool_R",
          "Tag2Tool_W"
        ]
      }
    try{
        const res = await apiInstance2.post("user_operate/DisabledMachineSpecInfo", body)
        return res
    }
    catch(error){
        console.error("Error", error);
        return error
    }    
}