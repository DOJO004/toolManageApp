import { apiInstance } from "@/scripts/machineInfoApi.js";

export async function apiGetProductLineTypeList() {
  try {
    const res = await apiInstance.get("/machine_get/GetProductLineInfoList");
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiNewProductLineType(productLineType) {
  const body = {
    ProductLineList: [
      {
        Id: productLineType.Id,
        Name: productLineType.Name,
        Department: {
          Id: productLineType.DepartmentId,
        },
      },
    ],
  };
  console.log("new product line body", body);
  try {
    const res = await apiInstance.post(
      "/sync_operate/SyncAddProductLineInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiEditProductLineType(productLineType) {
  const body = {
    Id: productLineType.Id,
    ModifyData: {
      Name: productLineType.Name,
      DepartmentId: productLineType.DepartmentId,
    },
  };
  console.log("edit product line body", body);
  try {
    const res = await apiInstance.post(
      "/sync_operate/SyncModifyProductLineInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}

export async function apiDeleteProductLineType(productLineType) {
  const body = {
    DisabledProductLineIds: [productLineType.Id],
  };
  try {
    const res = await apiInstance.post(
      "/sync_operate/SyncDisabledProductLineInfo",
      body
    );
    return res;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
}
