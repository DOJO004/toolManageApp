import { apiInstance2 } from "./base";

export const apiGetProductLineList = async () =>{
    try{
        const res = await apiInstance2.get("machine_get/GetProductLineInfoList")
        return res
    }catch(error){
        console.error("Error",error);
        return error
    }
}

export const apiAddProductLine = async (item)=>{
    const body={
        "ProductLineList": [
          {
            "Id": item.Id,
            "Name": item.Name
          }
        ]
      }
      try{
        const res = await apiInstance2.post("user_operate/AddProductLineInfo",body)
        return res
      }catch(error){
        console.error("Error", error);
        return error
      }
}

export const apiEditProductLine = async (item) =>{
    const body={
        "Id": item.Id,
        "ModifyData": {
          "Name": item.Name
        }
      }
      try{
        const res = await apiInstance2.post("user_operate/ModifyProductLineInfo", body)
        return res
      }catch(error){
        console.error("Error", error);
        return error
      }
}

export const apiDisabledProductLine = async (id) =>{
    const body = {
        "DisabledProductLineIds": [
        id
        ]
      }
      try{
        const res = await apiInstance2.post("user_operate/DisabledProductLineInfo", body)
        return res
      }catch(error){
        console.error("Error", error);
        return error
      }
      
}