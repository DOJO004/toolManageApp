import { apiInstance } from "@/scripts/Apis/toolInfoApi";
import { ReturnDataItem } from "../eLabelInfo/types";
import { getLoginTime, getPermission, getUserToken } from "../mainApi";
import {
  BaseResponse,
  EditStorageItem,
  GetLoadingLogListResponse,
  GetStorageListResponse,
  GetToolSpecListResponse,
  GetToolStockCountListResponse,
  GetToolStockListResponse,
  GetToolTypeListResponse,
  NewStorageItem,
  NewToolSpecItem,
  NewToolStockItem,
  ToolTypeItem,
  editToolSpecItem,
} from "./types";

export async function apiGetToolLoadingLogList(toolSn: string) {
  if (!toolSn) {
    return;
  }
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // 格式化為 YYYY-MM-DD

    const res = await apiInstance.get<GetLoadingLogListResponse>(
      `http://10.45.34.126:8082/tool_get/GetStockToolTrackOpLogList?ToolSn=${toolSn}&StartTime=2023-08-23&EndTime=${formattedDate}&DescendOrder=true`
    );
    console.log("apiGetToolLoadingLogList", res);

    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.ToolMacLoadingOpsList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

// toolType
export async function apiGetToolTypeList() {
  try {
    const res = await apiInstance.get<GetToolTypeListResponse>(
      "tool_get/GetToolTypeInfoList"
    );
    console.log("apiGetToolTypeList", res);
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.ToolTypeMenus;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewToolType(toolType: ToolTypeItem) {
  const body = {
    ToolTypeInfos: [
      {
        Id: toolType.Id,
        Name: toolType.Name,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("new tool type body =", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/AddToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditToolType(toolType: ToolTypeItem) {
  const body = {
    Id: toolType.Id,
    ModifyData: {
      Name: toolType.Name,
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/ModifyToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteToolType(toolType: ToolTypeItem) {
  const body = {
    DisabledToolTypeIds: [toolType.Id],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/DisabledToolTypeInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// toolSpec
export async function apiGetToolSpecList() {
  try {
    const res = await apiInstance.get<GetToolSpecListResponse>(
      "tool_get/GetToolSpecInfoList"
    );
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.ToolSpecList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiNewToolSpec(toolSpec: NewToolSpecItem) {
  const body = {
    ToolsInfo: {
      ToolSpecId: toolSpec.ToolSpecId,
      Name: toolSpec.Name,
      ToolTypeId: toolSpec.ToolTypeId,
      SafetyStock: toolSpec.SafetyStock,
      SpecData: {
        BladeDiameter: toolSpec.BladeDiameter,
        BladeHeight: toolSpec.BladeHeight,
        TotalLength: toolSpec.TotalLength,
        HandleDiameter: toolSpec.HandleDiameter,
      },
      MaxLife: {
        ProcessCnt: toolSpec.ProcessCnt,
        ProcessTime: toolSpec.ProcessTime,
        ProcessLength: toolSpec.ProcessLength,
        RepairCnt: toolSpec.RepairCnt,
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: ["Tag2Tool_R", "Tag2Tool_W"],
  };
  console.log("new tool spec body = ", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/AddToolSpecInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
export async function apiEditToolSpec(toolSpec: editToolSpecItem) {
  const body = {
    ToolSpecId: toolSpec.ToolSpecId,
    ModifyDatas: {
      Name: toolSpec.Name,
      ToolTypeId: toolSpec.ToolTypeId,
      SafetyStock: toolSpec.SafetyStock,
      SpecData: {
        BladeDiameter: toolSpec.BladeDiameter,
        BladeHeight: toolSpec.BladeHeight,
        TotalLength: toolSpec.TotalLength,
        HandleDiameter: toolSpec.HandleDiameter,
      },
      MaxLife: {
        ProcessCnt: toolSpec.ProcessCnt,
        ProcessTime: toolSpec.ProcessTime,
        ProcessLength: toolSpec.ProcessLength,
        RepairCnt: toolSpec.RepairCnt,
      },
    },
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("edit tool spec body = ", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/ModifyToolSpecInfo",
      body
    );
    console.log("edit tool spec res = ", res);
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
export async function apiDeleteToolSpec(editToolSpec: editToolSpecItem) {
  const body = {
    ToolSpecId: editToolSpec.ToolSpecId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  try {
    const res = await apiInstance.post(
      "user_operate/DisabledToolSpecInfo",
      body
    );
    console.log("delete tool spec res = ", res);
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// toolStock
export async function apiGetToolStockList(status: number | null) {
  const url = status
    ? `tool_get/GetToolStockInfoList?RecordsPerPage=9999&Status=${status}`
    : "tool_get/GetToolStockInfoList?RecordsPerPage=9999";
  console.log("get tool stock list url = ", url);

  try {
    const res = await apiInstance.get<GetToolStockListResponse>(url);
    console.log(`apiGetToolStockList`, res);
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.StockToolList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiGetToolStockCountList() {
  try {
    const res = await apiInstance.get<GetToolStockCountListResponse>(
      "/tool_get/GetToolStockCountList"
    );
    const { Values } = res.data;
    console.log(`apiGetToolStockCountList`, res);

    if (Values.ReqInt === 0) {
      return Values.StockToolCountList;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiPostToolStock(toolStock: NewToolStockItem) {
  const body = {
    StorageId: toolStock.StorageId,
    ToolStockInfos: [
      {
        ToolSpecId: toolStock.ToolSpecId,
        Qty: toolStock.Qty,
      },
    ],
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("new tool stock body = ", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "user_operate/AddToolStockInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// storage
export async function apiGetStorageList() {
  try {
    const res = await apiInstance.get<GetStorageListResponse>(
      "/tool_get/GetStockStorageInfoList"
    );
    const { Values } = res.data;
    if (Values.ReqInt === 0) {
      return Values.StorageMenus;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error", error);
    return [];
  }
}

export async function apiPostStorageInfo(storage: NewStorageItem) {
  const body = {
    StockStorageInfos: [
      {
        StorageId: storage.StorageId,
        Name: storage.Name,
      },
    ],
  };
  console.log("new storage body = ", body);

  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/AddStockStorageInfo",
      body
    );
    console.log("add storage res = ", res);
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditSTorageInfo(storage: EditStorageItem) {
  const body = {
    StorageId: storage.StorageId,
    Name: storage.Name,
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ModifyStockSotrageInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteStorageInfo(storage: EditStorageItem) {
  const body = {
    StorageId: storage.StorageId,
  };
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/DisabledStockSotrageInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 送修刀具
export async function apiRepairTool(data: ReturnDataItem) {
  const body = {
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("repair tool body", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/RepairToolStockInfo",
      body
    );
    console.log("repair tool res = ", res);
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

//報廢刀具
export async function apiScrapTool(data: any) {
  const body = {
    ToolSn: data.ToolSn,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("scrap tool body", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/ScrapToolStockInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

// 送修完畢重新入庫
export async function apiRestockTool(data: ReturnDataItem) {
  const body = {
    RevertorId: data.RevertorId,
    ToolSn: data.ToolSn,
    StorageId: data.StorageId,
    UserToken: getUserToken(),
    LoginTime: getLoginTime(),
    NeedPermissions: [getPermission()],
  };
  console.log("restock tool body", body);
  try {
    const res = await apiInstance.post<BaseResponse>(
      "/user_operate/RestorageToolStockInfo",
      body
    );
    return res.data.Values.ReqInt;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
