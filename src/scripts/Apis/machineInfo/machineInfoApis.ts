import { apiInstance } from "@/scripts/Apis/machineInfoApi.js";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  EditMachineSpecItem,
  EditMachineTypeItem,
  EditProductLineItem,
  GetMachineSpecListResponse,
  GetMachineStatusInfoListResponse,
  GetMachineTypeListResponse,
  GetProductLineListResponse,
  NewMachineSpecItem,
  NewMachineTypeItem,
  NewProductLineItem,
  ProductLineItem,
} from "./types";

// machineInfo
export async function apiGetMachineStatusList() {
  try {
    const res = await apiInstance.get<GetMachineStatusInfoListResponse>(
      `/machine_get/GetMachineStatusInfoList`
    );
    console.log("apiGetMachineStatusList", res);
    if (res.data.Values.ReqInt === 0) {
      return res.data.Values;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

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

// machineSpec
export async function apiGetMachineSpecList() {
  try {
    const res = await apiInstance.get<GetMachineSpecListResponse>(
      "/machine_get/GetMachineSpecInfoList"
    );
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.MachineeSpecList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewMachineSpec(machineSpec: NewMachineSpecItem) {
  const body = {
    MachineSpecData: {
      ProductLineId: machineSpec.ProductLineId,
      MachineTypeId: machineSpec.MachineTypeId,
      SerialNumber: machineSpec.SerialNumber,
      Name: machineSpec.Name,
      MachineIP: machineSpec.MachineIP,
      ReaderId: machineSpec.ReaderId,
      SystemInfo: {
        Brand: machineSpec.Brand,
        Series: machineSpec.Series,
        MT: machineSpec.MT,
      },
      AxisSettingList: [
        {
          AxisIndex: machineSpec.AxisIndex,
          AxisName: machineSpec.AxisName,
          IsSpindle: machineSpec.IsSpindle,
        },
      ],
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("new machine spec body = ", body);

  try {
    const res = await apiInstance.post(
      "/user_operate/AddMachineSpecInfo",
      body
    );
    console.log("add machine spec res = ", res);

    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditMachineSpec(machineSpec: EditMachineSpecItem) {
  const body = {
    MachineId: machineSpec.MachineId,
    ModifyData: {
      ProductLineId: machineSpec.ProductLineId,
      MachineTypeId: machineSpec.MachineTypeId,
      SerialNumber: machineSpec.SerialNumber,
      Name: machineSpec.Name,
      MachineIP: machineSpec.MachineIP,
      ReaderId: machineSpec.ReaderId,
      SystemInfo: {
        Brand: machineSpec.Brand,
        Series: machineSpec.Series,
        MT: machineSpec.MT,
      },
      AxisSettingList: [
        {
          AxisIndex: machineSpec.AxisIndex,
          AxisName: machineSpec.AxisName,
          IsSpindle: machineSpec.IsSpindle,
        },
      ],
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post(
      "/user_operate/ModifyMachineSpecInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteMachineSpec(machineSpec: EditMachineSpecItem) {
  const body = {
    MachineId: machineSpec.MachineId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledMachineSpecInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
