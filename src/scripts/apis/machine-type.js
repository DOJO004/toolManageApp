import { apiInstance2 } from "./base";

export const apiGetMachineTypeList = async ()=>{
    try{
        const res = await apiInstance2.get("machine_get/GetMachineTypeInfoList")
        return res
    }catch(error){
        console.error("Error",error);
        return error
    }
}

export const apiNewMachineType = async (item)=>{
    const body ={
        "MachineTypeList": [
          {
            "Id": item.Id,
            "Name": item.Name
          }
        ]
      }
    try{
        const res = await apiInstance2.post("user_operate/AddMachineTypeInfo", body)
        return res
    }catch(error){
        console.error("Error",error);
        return error
    }
}

export const apiEditMachineType = async (item)=>{
    const body ={
        "Id": item.Id,
        "ModifyData": {
          "Name": item.Name
        }
      }
    try{
        const res = await apiInstance2.post("user_operate/ModifyMachineTypeInfo", body)
        return res
    }catch(error){
        console.error("Error",error);
        return error
    }
}

export const apiDisabledMachineType = async (id)=>{
    const body ={
        "DisabledMachineTypeIds": [
            id
        ]
      }
    try{
        const res = await apiInstance2.post("user_operate/DisabledMachineTypeInfo", body)
        return res
    }catch(error){
        console.error("Error",error);
        return error
    }
}