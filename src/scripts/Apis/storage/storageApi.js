import { apiInstance } from "@/scripts/toolInfoApi";

export async function apiGetStorageList() {
    try {
        const res = await apiInstance.get("/tool_get/GetStockStorageInfoList")
        return res
    }catch (error) {
        console.error("Error", error);
        return error;
    }
}

export async function apiPostStorageInfo(data) {
    const body={
        "StockStorageInfos": [
          {
            "StorageId": data.StorageId,
            "Name": data.Name
          }
        ]
      }
    try {
        const res = apiInstance.post("/user_operate/AddStockStorageInfo",body)
        return res
    }catch (error) {
        console.error("Error", error);
        return error;
    }
}

export async function apiEditSTorageInfo(data) {
    const body={
        "StorageId": data.StorageId,
        "Name": data.Name
    }
    try {
        const res = apiInstance.post("/user_operate/ModifyStockSotrageInfo",body)
        return res
    }catch (error) {
        console.error("Error", error);
        return error;
    }
}

export async function apiDeleteStorageInfo(data) {
    const body={
        "StorageId": data.StorageId
    }
    try {
        const res = apiInstance.post("/user_operate/DisabledStockSotrageInfo",body)
        return res
    }catch (error) {
        console.error("Error", error);
        return error;
    }
}