import { apiInstance } from "@/scripts/machineInfoApi.js";
import {
  BaseResponse,
  EditMachineTypeItem,
  EditProductLineItem,
  GetMachineTypeListResponse,
  GetProductLineListResponse,
  NewMachineTypeItem,
  NewProductLineItem,
  ProductLineItem,
} from "./types";

// productLine
export async function apiGetProductLineTypeList(): Promise<ProductLineItem[]> {
  try {
    const res = await apiInstance.get<GetProductLineListResponse>(
      "/machine_get/GetProductLineInfoList"
    );
    const { Values } = res.data;
    console.log("apiGetProductLineTypeList", res);

    if (Values.ReqInt === 0) {
      return Values.ProductLineList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewProductLineType(
  productLineType: NewProductLineItem
) {
  const body = {
    ProductLineList: [
      {
        Id: productLineType.Id,
        Name: productLineType.Name,
        DepartmentId: productLineType.DepartmentId,
      },
    ],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncAddProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditProductLineType(
  productLineType: EditProductLineItem
) {
  const body = {
    Id: productLineType.Id,
    ModifyData: {
      Name: productLineType.Name,
      DepartmentId: productLineType.DepartmentId,
    },
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncModifyProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteProductLineType(
  productLineType: EditProductLineItem
) {
  const body = {
    DisabledProductLineIds: [productLineType.Id],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncDisabledProductLineInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// machineType
export async function apiGetMachineTypeList() {
  try {
    const res = await apiInstance.get<GetMachineTypeListResponse>(
      "/machine_get/GetMachineTypeInfoList"
    );
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.MachineTypeList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewMachineType(machineType: NewMachineTypeItem) {
  const body = {
    MachineTypeList: [
      {
        Id: machineType.Id,
        Name: machineType.Name,
      },
    ],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/sync_operate/SyncAddMachineTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditMachineType(machineType: EditMachineTypeItem) {
  const body = {
    Id: machineType.Id,
    ModifyData: {
      Name: machineType.Name,
    },
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyMachineTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteMachineType(machineType: EditMachineTypeItem) {
  const body = {
    DisabledMachineTypeIds: [machineType.Id],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledMachineTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
